import React, { useState } from "react";
import rock from './images/rock.svg';
import paper from './images/paper.svg';
import scissors from './images/scissors.svg';

const GameBoard = ({ player, playerChoices, score }) => {
    let i = 1;
    return (
        <>
            <div className="container text-center">
                <h1 className="display-6"><b>{player}</b></h1>
                <h1 className="display-6">Score: {score}</h1>

                <div className="choices">

                    {playerChoices.map(choice =>
                        <div key={i} className="row">

                            <img width='100' height='100' src={selectPicture(choice)}></img>
                            <p>{i++}. Kolo</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )


}

const selectPicture = (choice) => {
    if (choice === 'rock') {
        return rock
    } else if (choice === 'paper') {
        return paper
    } else {
        return scissors
    }

}

export default GameBoard;