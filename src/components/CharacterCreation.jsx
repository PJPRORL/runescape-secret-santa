import React, { useState } from 'react';

const CharacterCreation = ({ userData, setUserData, onNext }) => {
    const [name, setName] = useState(userData.name || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            setUserData({ ...userData, name: name.trim() });
            onNext();
        }
    };

    return (
        <div className="rs-panel">
            <h2>Character Setup</h2>
            <form onSubmit={handleSubmit} className="rs-panel-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '10px', color: 'var(--rs-orange)' }}>Enter Display Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Zezima"
                        autoFocus
                    />
                </div>
                <div style={{ textAlign: 'left', width: '100%', padding: '0 20px' }}>
                    <p>Current Level: <span style={{ color: 'var(--rs-yellow)' }}>98</span></p>
                    <p>XP until Level 99: <span style={{ color: 'var(--rs-yellow)' }}>1,000</span></p>
                </div>
                <button type="submit">Accept</button>
            </form>
        </div>
    );
};

export default CharacterCreation;
