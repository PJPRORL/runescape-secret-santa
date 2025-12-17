import React, { useMemo } from 'react';

const Leaderboard = ({ userData, onPlayAgain, onStop }) => {
    const favoriteExercise = useMemo(() => {
        if (!userData.exerciseHistory.length) return "None";
        const counts = {};
        userData.exerciseHistory.forEach(ex => counts[ex] = (counts[ex] || 0) + 1);
        const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
        return sorted[0][0]; // Most frequent
    }, [userData.exerciseHistory]);

    return (
        <div className="rs-panel" style={{ maxWidth: '600px' }}>
            <h1>Session Complete</h1>
            <div className="rs-panel-inner" style={{ textAlign: 'left', padding: '30px' }}>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Agility Level:</strong> <span style={{ color: 'var(--rs-yellow)' }}>99</span></p>

                <p style={{ marginTop: '15px' }}><strong>Locations Conquered:</strong></p>
                <ul style={{ paddingLeft: '20px' }}>
                    {userData.completedLocations.map((loc, i) => <li key={i}>{loc}</li>)}
                </ul>

                <p style={{ marginTop: '15px' }}><strong>Favorite Exercise:</strong></p>
                <p style={{ fontSize: '28px', color: 'var(--rs-green)', textAlign: 'center' }}>{favoriteExercise}</p>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <p><strong>Companion:</strong> {userData.pet?.name}</p>
                    <img src={userData.pet?.img} alt="Pet" style={{ maxWidth: '150px', marginTop: '10px' }} />
                </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <button onClick={onPlayAgain}>Play Again</button>
                <button onClick={onStop} style={{ color: 'var(--rs-red)' }}>Stop Workout</button>
            </div>
        </div>
    );
};

export default Leaderboard;
