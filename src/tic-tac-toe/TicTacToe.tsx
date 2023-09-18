import { useState } from 'react';
import './TicTacToe.css';

const TicTacToe = () => {
    const [marks, setMarks] = useState<{ id: number, isAssigned: boolean, isCircle: boolean }[]>([
        { id: 1, isAssigned: false, isCircle: false },
        { id: 2, isAssigned: false, isCircle: false },
        { id: 3, isAssigned: false, isCircle: false },
        { id: 4, isAssigned: false, isCircle: false },
        { id: 5, isAssigned: false, isCircle: false },
        { id: 6, isAssigned: false, isCircle: false },
        { id: 7, isAssigned: false, isCircle: false },
        { id: 8, isAssigned: false, isCircle: false },
        { id: 9, isAssigned: false, isCircle: false },
    ])

    const [nextIsCircle, setNextIsCircle] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>('');
    const [gameOver, setGameOver] = useState<boolean>(false);

    const restartGame = () => {
        setMarks(marks.map((m) => {
            m.isAssigned = false;
            m.isCircle = false;

            return m;
        }))
        setWinner('');
        setGameOver(false)
        setNextIsCircle(false)
    }

    const onSquareClick = (mark: { id: number, isAssigned: boolean, isCircle: boolean }) => {
        setMarks(marks.map((m) => {
            if (m.id == mark.id && !m.isAssigned) {
                m.isAssigned = true;
                m.isCircle = nextIsCircle;
                setNextIsCircle(!nextIsCircle);
            }
            return m;
        }))
        
        let result = checkForAWinner(marks);

        if (result !== null) {
            setGameOver(true);
            setWinner(result ? 'Circle' : 'Cross')
            return;
        }

        if(isFull(marks)){
            setGameOver(true);
            setWinner('No one')
        }
    };

    return (

        <div>
            {
                !gameOver ?

                    <div className='wrapper'>
                        {marks.map((mark) =>
                            <Square key={mark.id} id={mark.id} isAssigned={mark.isAssigned} isCircle={mark.isCircle} onClick={() => onSquareClick(mark)} />
                        )}
                    </div>

                    :

                    <>
                        <p>
                            Winner is: {winner}

                        </p>
                        <button className='btn btn-primary' onClick={restartGame}>Restart</button>
                    </>
            }
        </div>
    )
}

const Square = ({ id, isAssigned, isCircle, onClick }: { id: number, isAssigned: boolean, isCircle: boolean, onClick: () => void }) => {
    return (
        <button className="square" id={id.toString()} onClick={onClick}>
            <div>
                {
                    (isAssigned) ? (isCircle ? 'O' : 'X') : ''
                }
            </div>
        </button>
    )
}

const isFull = (marks: { id: number, isAssigned: boolean, isCircle: boolean }[]): boolean => {
    const assignedMarks = marks.filter((m) => (m.isAssigned == true));
    return assignedMarks.length == marks.length;
}

const checkForAWinner = (marks: { id: number, isAssigned: boolean, isCircle: boolean }[]): null | boolean => {

    const circleMarks = marks.filter((m) => (m.isAssigned == true && m.isCircle == true));
    const crossMarks = marks.filter((m) => (m.isAssigned == true && m.isCircle == false));
    console.log("circleMarks", circleMarks)
    console.log("crossMarks", crossMarks)
    let circleWin: null | boolean = null;

    if (check(circleMarks)) {
        circleWin = true
    } else if (check(crossMarks)) {
        circleWin = false
    };

    return circleWin;
}

const check = (marks: { id: number, isAssigned: boolean, isCircle: boolean }[]): boolean => {

    let combinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ]

    for (let i = 0; i < combinations.length; i++) {
        const combination = combinations[i];

        if (marks.find((m) => m.id == combination[0]) && marks.find((m) => m.id == combination[1]) && marks.find((m) => m.id == combination[2])) {
            return true
        }

    }

    return false;
}


export default TicTacToe