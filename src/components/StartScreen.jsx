import React from 'react';

const StartScreen = ({ onStart, onStop }) => {
    return (
        <div className="rs-panel" style={{ textAlign: 'center' }}>
            <h1>RuneScape Agility Training</h1>
            <div className="rs-panel-inner" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <p style={{ color: 'var(--rs-orange)' }}>Welcome to your daily XP grind.</p>
                <button onClick={onStart} style={{ color: 'var(--rs-green)' }}>Start Agility Training</button>
                <button onClick={onStart}>Play Again</button>
                <button onClick={onStop} style={{ color: 'var(--rs-red)' }}>Stop Workout</button>
            </div>
        </div>
    );
};

export default StartScreen;
