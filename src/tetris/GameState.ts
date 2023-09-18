import { Block } from "./Block";
import { BlockQueue } from "./BlockQueue";
import { GameGrid } from "./GameGrid";
import { Position } from "./Position";
import { IBlock } from "./blocks/IBlock";
import { JBlock } from "./blocks/JBlock";

export class GameState {

    private _gameGrid: GameGrid;
    private _currentBlock: Block;
    private _blockQueue: BlockQueue;

    public gameOver: boolean = false;
    public gameScore: number = 0;

    public constructor() {
        this._gameGrid = new GameGrid(20, 10);
        this._blockQueue = new BlockQueue();
        this._currentBlock = this._blockQueue.getAndUpdate();
    }

    public rotateBlockCW() {
        this.currentBlock.rotateCW()
        if (!this.blockFits()) {
            this.currentBlock.rotateCCW()
        }
    }
    public rotateBlockCCW() {
        this.currentBlock.rotateCCW()
        if (!this.blockFits()) {
            this.currentBlock.rotateCW()
        }
    }
    public moveBlockLeft() {
        this.currentBlock.move(0, -1);
        if (!this.blockFits()) {
            this.currentBlock.move(0, 1);
        }
    }
    public moveBlockRight() {
        this.currentBlock.move(0, 1);
        if (!this.blockFits()) {
            this.currentBlock.move(0, -1);
        }
    }
    public moveBlockDown() {
        this.currentBlock.move(1, 0);
        if (!this.blockFits()) {
            this.currentBlock.move(-1, 0);
            this.placeBlock();
        }
    }

    public blockFits() {
        for (let i = 0; i < this.currentBlock.getTilePositions().length; i++) {
            const p = this.currentBlock.getTilePositions()[i];
            if (!this.gameGrid.isEmpty(p.row, p.column)) {
                return false
            }
        }

        return true;
    }

    public isGameOver(): boolean {
        return !(this.gameGrid.isRowEmpty(0))
        // return !(this.gameGrid.isRowEmpty(0) && this.gameGrid.isRowEmpty(1))
    }

    public placeBlock() {

        this.currentBlock.getTilePositions().forEach((p) => {
            this.gameGrid.setTile(p.row, p.column, this.currentBlock.id)
        })

        this.gameScore += this.gameGrid.clearFullRows();

        if (this.isGameOver()) {
            this.gameOver = true;
        }
        else {
            this._currentBlock = this.blockQueue.getAndUpdate();
        }

    }

    private tileDropDistance(p: Position){
        let drop : number = 0;

        while(this.gameGrid.isEmpty(p.row + drop + 1, p.column)){
            drop++;
        }

        return drop;
    }

    public blockDropDistance(){

        let drop: number = this.gameGrid.rows;

        this.currentBlock.getTilePositions().forEach((p)=>{
            drop = Math.min(drop, this.tileDropDistance(p))
        })

        return drop;
    }

    public dropBlock(){
        this.currentBlock.move(this.blockDropDistance(), 0)
        this.placeBlock()
    }

    get blockQueue() { return this._blockQueue }
    get gameGrid() { return this._gameGrid }
    get currentBlock() { return this._currentBlock }
}