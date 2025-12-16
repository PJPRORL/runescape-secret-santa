import React, { useState, useRef } from 'react';

const pets = [
    { id: 'squirrel', name: 'Giant Squirrel', img: `${import.meta.env.BASE_URL}assets/giant_squirrel.png`, desc: 'Snel, dol op eikels, houdt jouw tempo bij.' },
    { id: 'bloodhound', name: 'Bloodhound', img: `${import.meta.env.BASE_URL}assets/Bloodhound.png`, desc: 'Speurneus, vindt de route, perfecte joggingpartner.' },
    { id: 'beaver', name: 'Beaver', img: `${import.meta.env.BASE_URL}assets/Beaver.png`, desc: 'Harde werker, let op je houten meubels!' },
    { id: 'tangleroot', name: 'Tangleroot', img: `${import.meta.env.BASE_URL}assets/Tangleroot.png`, desc: 'Natuurlijke groei, kijkt toe hoe je spieren groeien.' },
    { id: 'golem', name: 'Rock Golem', img: `${import.meta.env.BASE_URL}assets/Rock_Golem.png`, desc: 'Traag maar onverwoestbaar. Inspiratie voor krachttraining.' },
    { id: 'rift', name: 'Rift Guardian', img: `${import.meta.env.BASE_URL}assets/Rift_guardian.webp`, desc: 'Mystiek en zwevend. Pas op voor teleportaties.' },
];

const PetSelection = ({ userData, setUserData, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [showPrank, setShowPrank] = useState(false);
    const [showReward, setShowReward] = useState(false);

    const petSound = useRef(new Audio(`${import.meta.env.BASE_URL}assets/Getting_pet.ogg`));

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
            <div className="rs-panel" style={{ textAlign: 'center' }}>
                <h1>Reward Unlocked!</h1>
                <div className="rs-panel-inner" style={{ margin: '20px' }}>
                    <img src={`${import.meta.env.BASE_URL}assets/giant_squirrel.png`} style={{ maxWidth: '300px', height: 'auto' }} alt="Giant Squirrel" />
                    <h2 style={{ color: 'var(--rs-orange)' }}>Giant Squirrel</h2>
                    <p>Gefeliciteerd, je hebt de Giant Squirrel ontvangen!</p>
                </div>
                <button onClick={onComplete}>Claim & View Leaderboard</button>
            </div>
        );
    }

    const currentPet = pets[currentIndex];

    return (
        <div className="rs-panel" style={{ position: 'relative' }}>
            <h2>Choose your Pet Reward</h2>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
                <button onClick={prevPet}>&lt;</button>

                <div className="rs-panel-inner" style={{ width: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

                <button onClick={nextPet}>&gt;</button>
            </div>

            {showPrank && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    background: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
                }} onClick={() => setShowPrank(false)}>
                    <div style={{ position: 'relative', textAlign: 'center' }}>
                        <img src={`${import.meta.env.BASE_URL}assets/vbucks.png`} alt="Fortnite Prank" style={{ maxWidth: '80vw', maxHeight: '80vh' }} />
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
