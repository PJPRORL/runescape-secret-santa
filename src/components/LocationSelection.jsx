import React from 'react';

const locations = [
    { id: 'gnome', name: 'Gnome Stronghold', img: `${import.meta.env.BASE_URL}assets/gnome_stronghold.png` },
    { id: 'draynor', name: 'Draynor Village', img: `${import.meta.env.BASE_URL}assets/draynor.png` },
    { id: 'canifis', name: 'Canifis', img: `${import.meta.env.BASE_URL}assets/canifis.png` },
    { id: 'brimhaven', name: 'Brimhaven Arena', img: `${import.meta.env.BASE_URL}assets/brimhaven.png` },
    { id: 'sepulchre', name: 'Hallowed Sepulchre', img: `${import.meta.env.BASE_URL}assets/hallowed_sepulchre.png` },
];

const LocationSelection = ({ onSelect }) => {
    return (
        <div className="rs-panel" style={{ maxWidth: '1000px' }}>
            <h2>Select Training Location</h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '15px',
                marginTop: '20px'
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
        </div>
    );
};

export default LocationSelection;
