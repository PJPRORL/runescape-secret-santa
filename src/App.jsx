import React, { useState, useEffect } from 'react';
import StartScreen from './components/StartScreen';
import CharacterCreation from './components/CharacterCreation';
import LocationSelection from './components/LocationSelection';
import Training from './components/Training';
import LevelUp from './components/LevelUp';
import PetSelection from './components/PetSelection';
import Leaderboard from './components/Leaderboard';
import StopScreen from './components/StopScreen';
import './App.css';

function App() {
  const [phase, setPhase] = useState('START');
  const [userData, setUserData] = useState({
    name: '',
    level: 98,
    xp: 0,
    locationsCompleted: 0,
    selectedLocation: null,
    completedLocations: [],
    exerciseHistory: [],
    pet: null
  });

  const resetGame = () => {
    setUserData({
      name: '',
      level: 98,
      xp: 0,
      locationsCompleted: 0,
      selectedLocation: null,
      completedLocations: [],
      exerciseHistory: [],
      pet: null
    });
    setPhase('CHARACTER_CREATION');
  };

  const stopWorkout = () => {
    if (window.confirm('Weet je zeker dat je wilt stoppen?')) {
      setPhase('STOPPED');
    }
  };

  return (
    <div className="app-container">
      {phase === 'START' && (
        <StartScreen
          onStart={() => setPhase('CHARACTER_CREATION')}
          onStop={stopWorkout}
        />
      )}

      {phase === 'CHARACTER_CREATION' && (
        <CharacterCreation
          userData={userData}
          setUserData={setUserData}
          onNext={() => setPhase('LOCATION_SELECTION')}
        />
      )}

      {phase === 'LOCATION_SELECTION' && (
        <LocationSelection
          userData={userData}
          setUserData={setUserData}
          onSelect={(loc) => {
            setUserData(prev => ({ ...prev, selectedLocation: loc }));
            setPhase('TRAINING');
          }}
        />
      )}

      {phase === 'TRAINING' && (
        <Training
          userData={userData}
          setUserData={setUserData}
          onComplete={() => {
            const newCount = userData.locationsCompleted + 1;
            setUserData(prev => ({
              ...prev,
              locationsCompleted: newCount,
              completedLocations: [...prev.completedLocations, prev.selectedLocation.name]
            }));

            if (newCount < 2) {
              setPhase('LOCATION_SELECTION');
            } else {
              setPhase('LEVEL_UP');
            }
          }}
        />
      )}

      {phase === 'LEVEL_UP' && (
        <LevelUp
          onContinue={() => {
            setUserData(prev => ({ ...prev, level: 99 }));
            setPhase('PET_SELECTION');
          }}
        />
      )}

      {phase === 'PET_SELECTION' && (
        <PetSelection
          userData={userData}
          setUserData={setUserData}
          onComplete={() => setPhase('LEADERBOARD')}
        />
      )}

      {phase === 'LEADERBOARD' && (
        <Leaderboard
          userData={userData}
          onPlayAgain={resetGame}
          onStop={stopWorkout}
        />
      )}

      {phase === 'STOPPED' && <StopScreen onHome={() => setPhase('START')} />}

      {/* Background Music or Global Elements could go here */}
    </div>
  );
}

export default App;
