import React, { useEffect, useState } from "react";
import Player from "./Player";
import GameBoard from "./GameBoard";
import ScoreBoard from "../ScoreBoard";

const Game = () => {
    const [players, setPlayers] = useState([]);
    const [player1, setPlayer1] = useState('Hráč 1');
    const [player2, setPlayer2] = useState('Hráč 2');
    const [player1Choice, setPlayer1Choice] = useState([]);
    const [player2Choice, setPlayer2Choice] = useState([]);
    const [boardPlayers, setBoardPlayers] = useState([]);
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
    const [msg, setMsg] = useState('');
    const choices = ['rock', 'paper', 'scissors'];

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => { setPlayers(data); setScoreBoard(data); })
    }, []);

    const setScoreBoard = (data) => {
        if (data !== []) {
            const stats = data.map((player) => ({ 'player': player.username, 'id': player.id, 'enemies': [], 'score': 0 }));
            setBoardPlayers(stats);
        }
    }

    const handlePlayer1Change = (player) => {
        setPlayer1(player);
        setScore1(0);
        setScore2(0);
        setMsg('');
    }

    const handlePlayer2Change = (player) => {
        setPlayer2(player);
        setScore2(0);
        setScore1(0);
        setMsg('');
    }

    const generateChoice = () => {
        const randChoice = choices[Math.floor(Math.random() * 3)];
        return randChoice;
    }

    const handleClick = () => {
        if (player1 === player2) {
            setMsg('Má sice dvě ruce, ale i tak nemůže hrát sám se s sebou.')
            return;
        }

        if (findEnemies(player1, player2)) {
            setMsg('Tito dva hráči už spoli hráli, vyber jiného soupeře.')
            return;
        }

        const choices1 = [generateChoice(), generateChoice(), generateChoice()];
        const choices2 = [generateChoice(), generateChoice(), generateChoice()];
        let scoreA = 0;
        let scoreB = 0;

        setPlayer1Choice(choices1);
        setPlayer2Choice(choices2);

        for (let i = 0; i < 3; i++) {

            const comboMoves = choices1[i] + choices2[i];
            if (comboMoves === 'rockscissors' || comboMoves === 'scissorspaper' || comboMoves === 'paperrock') {
                scoreA += 1;
            }
            if (comboMoves === 'scissorsrock' || comboMoves === 'paperscissors' || comboMoves === 'rockpaper') {
                scoreB += 1;
            }
        }

        setScore1(scoreA);
        setScore2(scoreB);
        updateScoreBoard(scoreA, scoreB);
        updateEnemies(player1, player2);
    }

    const updateEnemies = (player1, player2) => {
        let boardPlayer1 = boardPlayers.find(p => p.player === player1);
        boardPlayer1.enemies.push(player2);
        let boardPlayer2 = boardPlayers.find(p => p.player === player2);
        boardPlayer2.enemies.push(player1);
    }

    const findEnemies = (player1, player2) => {
        let boardPlayer1 = boardPlayers.find(p => p.player === player1);
        let boardPlayer2 = boardPlayers.find(p => p.player === player2);

        return boardPlayer1.enemies.includes(player2) || boardPlayer2.enemies.includes(player1);
    }

    const updateScoreBoard = (scoreA, scoreB) => {
        if (scoreA > scoreB) {
            const winPlayer = boardPlayers.find(player => player.player === player1);
            winPlayer.score = winPlayer.score + 1;
        } else if (scoreA < scoreB) {
            const winPlayer = boardPlayers.find(player => player.player === player2);
            winPlayer.score = winPlayer.score + 1;
        }
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Player users={players} onPlayerChange={handlePlayer1Change} number={1} />
                    </div>
                    <div className="col">
                        <Player users={players} onPlayerChange={handlePlayer2Change} number={2} />
                    </div>
                    <div className={`alert alert-danger ${msg === '' ? 'd-none' : null}`}>{msg}</div>

                </div>
                <div className="row">
                    <div className="col">
                        <GameBoard player={player1} playerChoices={player1Choice} score={score1} />
                    </div>
                    <div className="col">
                        <GameBoard player={player2} playerChoices={player2Choice} score={score2} />
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center p-5">
                        <button disabled={player1 === 'Hráč 1' || player2 === 'Hráč 2' || player1 === 'Vyber hráče' || player2 === 'Vyber hráče'}
                            className="btn btn-dark btn-lg" onClick={handleClick}>Zahájit hru</button>
                    </div>
                </div>
                <ScoreBoard players={boardPlayers} />
            </div>
        </>
    )
}

export default Game;