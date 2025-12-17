import React from 'react';
import gnomeImg from '../assets/gnome_stronghold.png';
import draynorImg from '../assets/draynor.png';
import canifisImg from '../assets/canifis.png';
import brimhavenImg from '../assets/brimhaven.png';
import sepulchreImg from '../assets/hallowed_sepulchre.png';

const locations = [
    { id: 'gnome', name: 'Gnome Stronghold', img: gnomeImg },
    { id: 'draynor', name: 'Draynor Village', img: draynorImg },
    { id: 'canifis', name: 'Canifis', img: canifisImg },
    { id: 'brimhaven', name: 'Brimhaven Arena', img: brimhavenImg },
    { id: 'sepulchre', name: 'Hallowed Sepulchre', img: sepulchreImg },
];

const LocationSelection = ({ onSelect }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextLocation = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % locations.length);
    };

    const prevLocation = (e) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + locations.length) % locations.length);
    };

    return (
        <div className="rs-panel" style={{ maxWidth: '1000px', width: '100%', height: '90vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2>Select Training Location</h2>

            {isMobile ? (
                // Mobile Carousel View
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '10px' }}>
                    <button onClick={prevLocation}>&lt;</button>
                    <div
                        onClick={() => onSelect(locations[currentIndex])}
                        className="rs-panel-inner"
                        style={{
                            cursor: 'pointer',
                            textAlign: 'center',
                            flex: 1,
                            maxWidth: '300px'
                        }}
                    >
                        <img
                            src={locations[currentIndex].img}
                            alt={locations[currentIndex].name}
                            style={{ width: '100%', maxHeight: '40vh', objectFit: 'cover', border: '2px solid var(--rs-ui-border)' }}
                        />
                        <p style={{ marginTop: '10px', color: 'var(--rs-orange)', fontSize: '20px' }}>{locations[currentIndex].name}</p>
                    </div>
                    <button onClick={nextLocation}>&gt;</button>
                </div>
            ) : (
                // Desktop Grid View
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '15px',
                    marginTop: '20px',
                    overflowY: 'auto',
                    maxHeight: '80vh'
                }}>
                    {locations.map(loc => (
                        <div
                            key={loc.id}
                            onClick={() => onSelect(loc)}
                            className="rs-panel-inner"
                            style={{
                                cursor: 'pointer',
                                transition: 'transform 0.2s',
                                textAlign: 'center'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <img
                                src={loc.img}
                                alt={loc.name}
                                style={{ width: '100%', height: '120px', objectFit: 'cover', border: '2px solid var(--rs-ui-border)' }}
                            />
                            <p style={{ marginTop: '5px', color: 'var(--rs-orange)', fontSize: '18px' }}>{loc.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocationSelection;
