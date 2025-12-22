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

import bgMusicFile from './assets/Adventure_(v1).ogg.mp3';

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

  const audioRef = React.useRef(new Audio(bgMusicFile));

  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3; // Set a reasonable volume

    const playAudio = () => {
      audioRef.current.play().then(() => {
        // Autoplay started!
        // Remove listener if it worked
        document.removeEventListener('click', playAudio);
      }).catch(e => {
        console.log("Autoplay blocked, waiting for interaction:", e);
      });
    };

    // Try to play immediately
    playAudio();

    // Also try on any click (to handle browser autoplay policies)
    document.addEventListener('click', playAudio);

    // Cleanup
    return () => {
      audioRef.current.pause();
      document.removeEventListener('click', playAudio);
    };
  }, []);

  useEffect(() => {
    // Pause music when in Level Up screen or when muted
    if (phase === 'LEVEL_UP') {
      audioRef.current.pause();
    }
    // Resume music when not in Level Up screen (and ensure it's playing if it was paused)
    else if (audioRef.current.paused && !audioRef.current.muted) { // Check muted state
      audioRef.current.play().catch(e => console.error("Resume failed:", e));
    }
  }, [phase]);

  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };


  const restartMusic = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(e => console.error("Play failed:", e));
    }
  };

  const resetGame = () => {
    restartMusic();
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
      restartMusic();
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

            if (newCount < 1) {
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

      {/* Background Music Mute Button */}
      <button
        onClick={toggleMute}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          background: 'rgba(0,0,0,0.6)',
          color: 'white',
          border: '2px solid white',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          fontSize: '24px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* Background Music or Global Elements could go here */}
    </div>
  );
}

export default App;
