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
        <div className="rs-panel" style={{ maxWidth: '600px', width: '95%', margin: '0 auto', padding: '15px' }}>
            <h1 style={{ fontSize: '24px' }}>Session Complete</h1>
            <div className="rs-panel-inner" style={{ textAlign: 'left', padding: '15px', overflowY: 'auto', maxHeight: '60vh' }}>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Agility Level:</strong> <span style={{ color: 'var(--rs-yellow)' }}>99</span></p>

                <p style={{ marginTop: '10px' }}><strong>Locations Conquered:</strong></p>
                <ul style={{ paddingLeft: '20px', margin: '5px 0' }}>
                    {userData.completedLocations.map((loc, i) => <li key={i}>{loc}</li>)}
                </ul>

                <p style={{ marginTop: '10px' }}><strong>Favorite Exercise:</strong></p>
                <p style={{ fontSize: '24px', color: 'var(--rs-green)', textAlign: 'center', margin: '5px 0' }}>{favoriteExercise}</p>

                <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <p><strong>Companion:</strong> {userData.pet?.name}</p>
                    <img src={userData.pet?.img} alt="Pet" style={{ maxWidth: '120px', marginTop: '5px', maxHeight: '150px', objectFit: 'contain' }} />
                </div>
            </div>

            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={onPlayAgain} style={{ flex: '1 1 auto', minWidth: '120px' }}>Play Again</button>
                <button onClick={onStop} style={{ color: 'var(--rs-red)', flex: '1 1 auto', minWidth: '120px' }}>Stop Workout</button>
            </div>
        </div>
    );
};


export default Leaderboard;
