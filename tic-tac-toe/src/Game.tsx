import { useState, useEffect } from "react";
import Square from "./Square";

type Scores = {
    [key: string]: number;
};

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const INITIAL_SCORES: Scores = { X: 0, O: 0 };
//Combinations for winning state
const WINNING_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const Game = () => {
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [scores, setScores] = useState(INITIAL_SCORES);

    useEffect(() => {
        const storedScores = localStorage.getItem("scores");
        if (storedScores) {
            setScores(JSON.parse(storedScores));
        }
    }, []);

    useEffect(() => {
        if (gameState === INITIAL_GAME_STATE) {
            return;
        }
        checkForWinner();
        changePlayer();
    }, [gameState]);

    const resetBoard = () => setGameState(INITIAL_GAME_STATE);

    const handleWin = () => {
        window.alert(`Congrats Player ${currentPlayer}!  You Are The WINNER!`);

        const newPlayerScore = scores[currentPlayer] + 1;
        const newScores = { ...scores };
        newScores[currentPlayer] = newPlayerScore;
        setScores(newScores);

        localStorage.setItem("scores", JSON.stringify(newScores));

        resetBoard();
    };
    const handleDraw = () => {
        window.alert("The Game Ended In A Draw");
        resetBoard();
    };

    const checkForWinner = () => {
        let roundWon = false;

        for (let i = 0; i < WINNING_COMBOS.length; i++) {
            const winCombo = WINNING_COMBOS[i];

            let a = gameState[winCombo[0]];
            let b = gameState[winCombo[1]];
            let c = gameState[winCombo[2]];

            if ([a, b, c].includes("")) {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            //because of congrats alert timing is before than winner players final move
            setTimeout(() => handleWin(), 100);

            // window.alert(
            //     `Congrats Player ${currentPlayer}!  You Are The WINNER!`
            // );
            return;
        }
        if (!gameState.includes("")) {
            setTimeout(() => handleDraw(), 100);
            // window.alert("The Game Ended In A Draw");
            return;
        }

        changePlayer();
    };

    //Player changer
    const changePlayer = () => {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    };

    const handleCellClick = (event: any) => {
        const cellIndex = Number(event.target.getAttribute("data-cell-index"));

        const currentValue = gameState[cellIndex];
        if (currentValue) {
            return;
        }

        // vaule adding to cells
        const newValues = [...gameState];
        newValues[cellIndex] = currentPlayer;
        setGameState(newValues);

        console.log(
            "cell clicked",
            event.target.getAttribute("data-cell-index")
        );
    };
    return (
        <div className='h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500'>
            <h1 className='text-center text-5xl mb-4 font-display text-white'>
                Tic-Tac-Toe Game
            </h1>
            <div>
                <div className='grid grid-cols-3 gap-3 mx-auto w-96'>
                    {gameState.map((player, index) => (
                        <Square
                            key={index}
                            onClick={handleCellClick}
                            {...{ index, player }}
                        />
                    ))}
                </div>
                <div className='mx-auto w-96 text-2xl text-center '>
                    <p className='text-white mt-5'>
                        Next Player:{" "}
                        <span
                            className={` ${
                                currentPlayer === "X"
                                    ? "text-red-500"
                                    : "text-yellow-400"
                            } `}
                        >
                            {currentPlayer}
                        </span>
                    </p>
                    <span className='flex mx-auto mt-[5px] w-[300px] h-[2px] bg-slate-400'></span>
                    <p className='text-white mt-5'>
                        Player X Wins:{" "}
                        <span className='text-red-500'>{scores["X"]}</span>
                    </p>
                    <p className='text-white mt-5'>
                        Player O Wins:{" "}
                        <span className='text-yellow-400'>{scores["O"]}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Game;
