import React from "react";

// defining functional component for scoreboard
const Scoreboard = ({ users, currentUser }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg p-4 w-[90%] max-w-md text-center border-2 border-gray-200">
            <h2 className="text-lg font-bold mb-2">⭐️ Scoreboard ⭐️</h2>
            <ul className="text-left">
                {users.map((user, index) => (
                    <li 
                    key={index} 
                    className={`mb-1 px-3 py-1 rounded transition ${
                        user.username === currentUser ?
                        'bg-yellow-200 font-semibold text-gray-800 shadow'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    >
                        {user.username} - Best Time: {user.bestTime || 'N/A'}, 
                        Highest Level: {user.highestLevel ?? 'N/A'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Scoreboard;