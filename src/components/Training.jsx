import React, { useState, useEffect } from 'react';

const exercisesList = [
    'Push-ups', 'Jumping Jacks', 'Squats',
    'Lunges', 'Plank (30s)', 'High Knees',
    'Burpees', 'Sit-ups'
];

const Training = ({ userData, setUserData, onComplete }) => {
    const [exercises, setExercises] = useState([]);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [showXpDrop, setShowXpDrop] = useState(false);

    useEffect(() => {
        // Select 3 random exercises
        const shuffled = [...exercisesList].sort(() => 0.5 - Math.random());
        setExercises(shuffled.slice(0, 3));
    }, []);

    const handleExerciseComplete = () => {
        // Trigger XP drop
        setShowXpDrop(true);

        // Update history
        const currentEx = exercises[currentExerciseIndex];
        setUserData(prev => ({
            ...prev,
            xp: prev.xp + 500, // Arbitrary XP
            exerciseHistory: [...prev.exerciseHistory, currentEx]
        }));

        setTimeout(() => {
            setShowXpDrop(false);
            if (currentExerciseIndex < 2) {
                setCurrentExerciseIndex(prev => prev + 1);
            } else {
                onComplete();
            }
        }, 1500); // Wait for XP drop animation
    };

    if (exercises.length === 0) return <div>Loading course...</div>;

    const currentExercise = exercises[currentExerciseIndex];

    return (
        <div className="rs-panel" style={{
            textAlign: 'center',
            minHeight: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${userData.selectedLocation?.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <h2 style={{ position: 'absolute', top: 10, width: '100%', left: 0 }}>
                {userData.selectedLocation?.name} - Obstacle {currentExerciseIndex + 1}/3
            </h2>

            <div className="rs-panel-inner" style={{ margin: '40px auto', width: '100%', maxWidth: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                {/* Placeholder for animation */}
                <h3 style={{ fontSize: '40px', color: 'var(--rs-green)' }}>
                    DO: {currentExercise}
                </h3>
            </div>

            <button onClick={handleExerciseComplete} disabled={showXpDrop}>
                {showXpDrop ? 'XP Gained!' : 'Obstacle Cleared'}
            </button>

            {showXpDrop && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    animation: 'floatUp 1s ease-out forwards',
                    pointerEvents: 'none'
                }}>
                    <div style={{
                        background: 'rgba(0,0,0,0.7)',
                        borderRadius: '50%',
                        width: '60px',
                        height: '60px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid gold'
                    }}>
                        <span style={{ color: 'purple', fontSize: '24px', fontWeight: 'bold' }}>+500 XP</span>
                    </div>
                </div>
            )}

            <style>{`
        @keyframes floatUp {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          100% { transform: translate(-50%, -150%) scale(1.2); opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default Training;
