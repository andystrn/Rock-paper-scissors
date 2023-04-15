import React, { useState } from "react";

const Player = ({ users, onPlayerChange, number }) => {

    return (
        <div className="tile container-fluid text-center pb-5 pt-5 mt-5 mb-5 border">
            <h1 className="display-4">
                Hráč {number}
            </h1>
            <div>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="100" height="100" >
                    <path d="M66.403 29.362C68.181 18.711 60.798 10 50 10c-10.794 0-18.177 8.711-16.403 19.362l2.686 16.133c1.068 6.393 7.24 11.621 13.718 11.621 6.481 0 12.649-5.229 13.714-11.621l2.688-16.133zM64.007 58.001c-3.76 3.535-8.736 5.781-14.007 5.781s-10.247-2.246-14.007-5.781l-19.668 6.557C12.845 65.716 10 69.668 10 73.333V90h80V73.333c0-3.665-2.845-7.617-6.325-8.775l-19.668-6.557z" />
                </svg>
            </div>

            <label>
                <select className="form-select" onChange={(e) => onPlayerChange(e.target.value)}>
                    <option value="Vyber hráče">Vyber hráče</option>
                    {users.map(user => <option key={user.id} value={user.username}>{user.username}</option>)}
                </select>
            </label>

        </div>
    )
}

export default Player;