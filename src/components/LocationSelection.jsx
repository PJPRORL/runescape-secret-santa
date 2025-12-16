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
