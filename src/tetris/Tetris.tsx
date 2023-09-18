import { useEffect, useState } from "react"
import { GameState } from "./GameState";
import { GameGrid } from "./GameGrid";
import { Block } from "./Block";
import { Key } from 'ts-keycode-enum';
import { BlockQueue } from "./BlockQueue";
import "./Tetris.css";


const Tetris = () => {

    let width = 300;
    let height = 660;
    let cellSize = 30;

    let maxDelay = 1000;
    let minDelay = 50;
    let delayDecrease = 5;

    const tileImages = [
        "black", "#00ffff", "#0000ff", "#ff7f00", "#ffff00", "#00ff00", "#800080", "#ff0000"
    ]

    let ctx: CanvasRenderingContext2D;
    let gameState = new GameState();

    useEffect(() => {
        let c = document.getElementById("canvas") as HTMLCanvasElement;
        c.focus();
        ctx! = c!.getContext("2d")!;
        gameLoop();
    }, [])

    const drawGrid = (grid: GameGrid) => {
        for (let i = 0; i < grid.rows; i++) {
            if(i == 0){
                continue;
            }
            for (let j = 0; j < grid.columns; j++) {
                ctx.fillStyle = tileImages[grid.grid[i][j]];
                ctx.clearRect(j * cellSize, i * cellSize, cellSize, cellSize)
                ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize)
            }
        }
    }
    const drawBlock = (block: Block) => {
        // block.getTilePositions().forEach((position) => {

        //     ctx.fillStyle = tileImages[block.id];
        //     ctx.clearRect(position.column * cellSize, position.row * cellSize, cellSize, cellSize)
        //     ctx.fillRect(position.column * cellSize, position.row * cellSize, cellSize, cellSize)
        // });

        for (let i = 0; i < block.getTilePositions().length; i++) {
            const position = block.getTilePositions()[i]
            if(position.row == 0){
                continue;
            }
            ctx.fillStyle = tileImages[block.id];
            ctx.clearRect(position.column * cellSize, position.row * cellSize, cellSize, cellSize)
            ctx.fillRect(position.column * cellSize, position.row * cellSize, cellSize, cellSize)
        }
    }

    const drawScore = (score: number) => {
        ctx.font = "20px Arial";
        ctx.clearRect(0, height - 60, 150, 60);
        ctx.fillStyle = "#ccc"
        ctx.fillRect(0, height - 60, 150, 60);
        ctx.fillStyle = "black";
        ctx.fillText(`Score: ${score}`, 5, height - 5);
        if (gameState.gameOver) {
            ctx.fillText(`Game Over`, 5, height - 35);
        }
    }

    const drawNextBlock = (blockQueue: BlockQueue) => {
        let previewCellSize = 20;
        ctx.clearRect(width - 150, height - 60, 150, 60)
        ctx.fillStyle = "#ccc"
        ctx.fillRect(width - 150, height - 60, 150, 60)
        blockQueue.nextBlock.getPreviewPosition().forEach((position) => {
            ctx.fillStyle = tileImages[blockQueue.nextBlock.id];
            ctx.fillRect(
                (width - 65) + ((position.column) * previewCellSize),
                (height - 45) + ((position.row) * previewCellSize),
                previewCellSize,
                previewCellSize
                // width - ((position.column + 1) * previewCellSize),
                // height - ((position.row + 1)* previewCellSize),
                // previewCellSize,
                // previewCellSize
            )
        })

        // ctx.font = "20px Arial";
        // ctx.clearRect(0, height - 25, width, 25);
        // ctx.fillText(`Score: ${score}`, 5, height - 5);
    }

    const draw = () => {
        drawGrid(gameState.gameGrid);
        drawBlock(gameState.currentBlock)
        drawScore(gameState.gameScore)
        drawNextBlock(gameState.blockQueue)
    }

    const keyDownHandler = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        console.log(gameState.gameOver)

        if (event.which == Key.R) {
            restartGame();
            return;
        }

        if (gameState.gameOver) {
            return;
        }

        switch (event.which) {
            case Key.UpArrow:
                gameState.rotateBlockCW()
                break;
            case Key.DownArrow:
                gameState.moveBlockDown()
                break;
            case Key.LeftArrow:
                gameState.moveBlockLeft()
                break;
            case Key.RightArrow:
                gameState.moveBlockRight()
                break;
            case Key.Space:
                gameState.dropBlock()
                break;

            default:
                break;
        }

        draw();
    }

    const gameLoop = async () => {
        draw();

        while (!gameState.gameOver) {
            let delay = Math.max(minDelay, maxDelay - (gameState.gameScore * delayDecrease))
            await sleep(delay)
            gameState.moveBlockDown();
            draw();
        }
    }

    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const restartGame = () => {
        gameState = new GameState();
        gameLoop();
    }

    return (
        <>
            <div className="wrapper">
                <div className="gameView">
                    <div className="canvasContainer">
                    <canvas onKeyDown={keyDownHandler} tabIndex={0} id="canvas" width={width} height={height}></canvas>

                    </div>
                    <p>
                        Move: 🡨 🡫 🡪 <br />
                        Rotate: 🡩   <br />
                        Drop: Spacebar  <br />
                        Restart with 'R'. 😁
                    </p>
                </div>
            </div>
        </>
    )

}

export default Tetris