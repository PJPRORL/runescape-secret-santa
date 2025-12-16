import React, { useEffect, useRef } from 'react';
import levelUpSound from '../assets/Agility_Level_Up!.ogg';
import levelUpImg from '../assets/99_agility_notification.webp';

const LevelUp = ({ onContinue }) => {
    const audioRef = useRef(new Audio(levelUpSound));

    useEffect(() => {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(e => console.log('Audio play failed', e));
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999
        }}>
            <h1 style={{ marginBottom: '20px', fontSize: '48px', color: 'var(--rs-yellow)' }}>CONGRATULATIONS!</h1>
            <p style={{ fontSize: '24px', marginBottom: '20px' }}>You have reached Level 99 Agility!</p>

            <img
                src={levelUpImg}
                alt="Level 99 Agility"
                style={{ maxWidth: '80%', maxHeight: '60%', border: '4px solid gold', boxShadow: '0 0 30px gold' }}
            />

            <button
                onClick={onContinue}
                style={{ marginTop: '30px', fontSize: '30px', padding: '15px 40px' }}
            >
                Click here to continue
            </button>
        </div>
    );
};

export default LevelUp;
