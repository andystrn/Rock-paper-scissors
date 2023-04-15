import React from 'react';

const ScoreBoard = ({ players }) => {
    let i = 1;

    return (
        <>
            <h1 className='display-4 text-center pb-2'>Výsledky</h1>
            <table className="table">
                <thead className='thead'>
                    <tr>
                        <th>Pořadí</th>
                        <th>Hráči</th>
                        <th>Score</th>
                        <th>Soupeři</th>
                    </tr>
                </thead>
                <tbody>
                    {players.sort((p1, p2) => (p1.score > p2.score ? -1 : 1)).map((player) =>
                        <tr key={player.id}>
                            <th scope="row">{i++}.</th>
                            <td>{player.player}</td>
                            <td>{player.score}</td>
                            <td>{player.enemies.join(', ')}</td>
                        </tr>)}
                </tbody>
            </table>
        </>
    );
}

export default ScoreBoard;