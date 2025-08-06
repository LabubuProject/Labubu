import React from "react";

// defining functional component for scoreboard
const Scoreboard = ({ users }) => {
    return (
        <div className="mt-4 p-4 bg-white rounded shadow">
            <h2 className="text-lg font-bold mb-2">⭐️ Scoreboard ⭐️</h2>
            <ul>
                {users.map((user, index) => (
                    <li key={index} className="mb-1">
                        {user.username} - Best Time: {user.bestTime || 'N/A'}, 
                        Highest Level: {user.highestLevel ?? 'N/A'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Scoreboard;