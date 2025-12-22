import React, { useState, useRef } from 'react';
import squirrelImg from '../assets/giant_squirrel.png';
import bloodhoundImg from '../assets/Bloodhound.png';
import beaverImg from '../assets/Beaver.png';
import tanglerootImg from '../assets/Tangleroot.png';
import golemImg from '../assets/Rock_Golem.png';
import riftImg from '../assets/Rift_guardian.webp';
import petSoundFile from '../assets/Getting_pet.ogg';
import vbucksImg from '../assets/vbucks.png';

const pets = [
    { id: 'squirrel', name: 'Giant Squirrel', img: squirrelImg, desc: 'Snel, dol op eikels, houdt jouw tempo bij.' },
    { id: 'bloodhound', name: 'Bloodhound', img: bloodhoundImg, desc: 'Speurneus, vindt de route, perfecte joggingpartner.' },
    { id: 'beaver', name: 'Beaver', img: beaverImg, desc: 'Harde werker, let op je houten meubels!' },
    { id: 'tangleroot', name: 'Tangleroot', img: tanglerootImg, desc: 'Natuurlijke groei, kijkt toe hoe je spieren groeien.' },
    { id: 'golem', name: 'Rock Golem', img: golemImg, desc: 'Traag maar onverwoestbaar. Inspiratie voor krachttraining.' },
    { id: 'rift', name: 'Rift Guardian', img: riftImg, desc: 'Mystiek en zwevend. Pas op voor teleportaties.' },
];

const PetSelection = ({ userData, setUserData, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [showPrank, setShowPrank] = useState(false);
    const [showReward, setShowReward] = useState(false);

    const petSound = useRef(new Audio(petSoundFile));

    const nextPet = () => setCurrentIndex((prev) => (prev + 1) % pets.length);
    const prevPet = () => setCurrentIndex((prev) => (prev - 1 + pets.length) % pets.length);

    const handleSelect = () => {
        if (clickCount === 0) {
            // First click: Prank
            setClickCount(1);
            setShowPrank(true);
        } else {
            // Second click: Allow selection of current pet
            setShowPrank(false);

            setUserData(prev => ({ ...prev, pet: pets[currentIndex] }));

            // Play sound and show final screen
            petSound.current.play().catch(e => console.error(e));
            setShowReward(true);
        }
    };

    if (showReward) {
        return (
            <div className="rs-panel" style={{ textAlign: 'center', maxHeight: '95vh', width: '95%', margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px' }}>
                <h1>Reward Unlocked!</h1>
                <div className="rs-panel-inner" style={{ margin: '5px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <img src={userData.pet.img} style={{ maxWidth: '80%', maxHeight: '40vh', width: 'auto', height: 'auto', objectFit: 'contain' }} alt={userData.pet.name} />
                    <h2 style={{ color: 'var(--rs-orange)', fontSize: '1.5em', margin: '10px 0' }}>{userData.pet.name}</h2>
                    <p style={{ fontSize: '1em' }}>Gefeliciteerd, je hebt de {userData.pet.name} ontvangen!</p>
                </div>
                <button onClick={onComplete} style={{ marginTop: '10px', width: '100%', maxWidth: '300px' }}>Claim & View Leaderboard</button>
            </div>
        );
    }

    const currentPet = pets[currentIndex];

    return (
        <div className="rs-panel" style={{ position: 'relative', width: '95%', maxWidth: '800px', margin: '0 auto' }}>
            <h2>Choose your Pet Reward</h2>

            <div className="pet-selection-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '20px 0', flexWrap: 'nowrap' }}>
                <button onClick={prevPet} style={{ minWidth: '40px', padding: '5px' }}>&lt;</button>

                <div className="rs-panel-inner" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
                    <div style={{ width: '100%', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src={currentPet.img}
                            alt={currentPet.name}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <h3 style={{ marginTop: '10px', fontSize: '1.2em' }}>{currentPet.name}</h3>
                    <p style={{ fontSize: '14px', marginTop: '5px', minHeight: '50px', lineHeight: '1.2' }}>{currentPet.desc}</p>
                    <button onClick={handleSelect} style={{ marginTop: '10px', border: '2px solid var(--rs-green)', width: '100%', fontSize: '14px' }}>Select</button>
                </div>

                <button onClick={nextPet} style={{ minWidth: '40px', padding: '5px' }}>&gt;</button>
            </div>

            {showPrank && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }} onClick={() => setShowPrank(false)}>
                    <div style={{ position: 'relative', textAlign: 'center', width: '90%', maxWidth: '600px' }}>
                        <img src={vbucksImg} alt="Fortnite Prank" style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '10%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '90%',
                            textShadow: '2px 2px 4px black',
                            background: 'rgba(0,0,0,0.6)',
                            padding: '10px',
                            borderRadius: '8px'
                        }}>
                            <h2 style={{ color: 'white', fontSize: '1.2em', margin: 0 }}>
                                Sorry, de gekozen pet zit vast in de 'God Wars Dungeon', claim je prijs nu.
                            </h2>
                            <button style={{ marginTop: '10px', fontSize: '16px', padding: '10px 20px' }}>Kies nogmaals een pet.</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetSelection;
