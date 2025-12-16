import React from 'react';

const StopScreen = ({ onHome }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: 'var(--rs-red)', fontSize: '48px' }}>"You will not get stronger this way"</h1>
            <button onClick={onHome} style={{ marginTop: '30px' }}>Return to Title</button>
        </div>
    );
};

export default StopScreen;
