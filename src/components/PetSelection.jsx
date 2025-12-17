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
            // Second click: Force Squirrel
            setShowPrank(false);

            // Find Squirrel data even if not selected
            const squirrel = pets.find(p => p.id === 'squirrel');

            setUserData(prev => ({ ...prev, pet: squirrel }));

            // Play sound and show final screen
            petSound.current.play().catch(e => console.error(e));
            setShowReward(true);
        }
    };

    if (showReward) {
        return (
            <div className="rs-panel" style={{ textAlign: 'center', maxHeight: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <h1>Reward Unlocked!</h1>
                <div className="rs-panel-inner" style={{ margin: '10px', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <img src={squirrelImg} style={{ maxWidth: '60vw', maxHeight: '30vh', width: 'auto', height: 'auto' }} alt="Giant Squirrel" />
                    <h2 style={{ color: 'var(--rs-orange)', fontSize: '1.5em', margin: '10px 0' }}>Giant Squirrel</h2>
                    <p style={{ fontSize: '1em' }}>Gefeliciteerd, je hebt de Giant Squirrel ontvangen!</p>
                </div>
                <button onClick={onComplete} style={{ marginTop: '10px' }}>Claim & View Leaderboard</button>
            </div>
        );
    }

    const currentPet = pets[currentIndex];

    return (
        <div className="rs-panel" style={{ position: 'relative' }}>
            <h2>Choose your Pet Reward</h2>

            <div className="pet-selection-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
                <button onClick={prevPet} style={{ minWidth: '50px' }}>&lt;</button>

                <div className="rs-panel-inner" style={{ width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '100%', maxWidth: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img
                            src={currentPet.img}
                            alt={currentPet.name}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                    </div>
                    <h3 style={{ marginTop: '10px' }}>{currentPet.name}</h3>
                    <p style={{ fontSize: '18px', marginTop: '10px', minHeight: '60px' }}>{currentPet.desc}</p>
                    <button onClick={handleSelect} style={{ marginTop: '10px', border: '2px solid var(--rs-green)' }}>Select This Pet</button>
                </div>

                <button onClick={nextPet} style={{ minWidth: '50px' }}>&gt;</button>
            </div>

            {showPrank && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }} onClick={() => setShowPrank(false)}>
                    <div style={{ position: 'relative', textAlign: 'center' }}>
                        <img src={vbucksImg} alt="Fortnite Prank" style={{ maxWidth: '80vw', maxHeight: '80vh' }} />
                        <div style={{ position: 'absolute', bottom: '10%', left: '0', width: '100%', textShadow: '2px 2px 4px black' }}>
                            <h2 style={{ color: 'white', background: 'rgba(0,0,0,0.5)', display: 'inline-block', padding: '10px' }}>
                                Sorry, de gekozen pet zit vast in de 'God Wars Dungeon', claim je prijs nu.
                            </h2>
                            <br />
                            <button style={{ marginTop: '10px' }}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PetSelection;
