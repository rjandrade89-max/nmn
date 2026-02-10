
import React, { useState } from 'react';
import { COUPLE_NAMES, WEDDING_DATE, IMG_LOGO, IMG_SEAL_EXT, IMG_SEAL_INT } from '../constants';

interface EnvelopeScreenProps {
  onOpen: () => void;
  onStartAudio?: () => void;
}

const EnvelopeScreen: React.FC<EnvelopeScreenProps> = ({ onOpen, onStartAudio }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    
    // Attempt to start audio immediately upon user gesture
    if (onStartAudio) {
      onStartAudio();
    }

    setIsOpen(true);
    
    // Sequence: Open flap -> Slide card up -> Zoom into dashboard
    setTimeout(() => {
      setIsZooming(true);
      setTimeout(() => {
        onOpen();
      }, 800);
    }, 1200);
  };

  return (
    <div className={`envelope-screen ${isZooming ? 'is-zooming' : ''}`}>
      
      {/* Title Header above Envelope */}
      <div className={`envelope-header ${isOpen ? 'is-open' : ''}`}>
        <h1 className="font-serif" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{COUPLE_NAMES}</h1>
        <p className="font-sans text-blue uppercase font-bold" style={{ fontSize: '0.75rem', letterSpacing: '0.2em' }}>{WEDDING_DATE}</p>
      </div>

      {/* 3D Envelope Container */}
      <div className="envelope-3d-container" onClick={handleOpen}>
        
        {/* Envelope Body (Back) */}
        <div className="envelope-body">
          
          {/* The Invitation Card Inside */}
          <div className={`invitation-card ${isOpen ? 'is-open' : ''}`}>
            <div style={{ width: '100%', height: '100%', border: '1px solid rgba(147, 169, 209, 0.2)', padding: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              
              {/* Logo on Invitation */}
              <img src={IMG_LOGO} alt="Logo" style={{ maxWidth: '80%', maxHeight: '60px', objectFit: 'contain', marginBottom: '8px' }} />
              
              <p className="font-script text-gold" style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Convite</p>
              <p className="font-serif text-center" style={{ fontSize: '0.7rem', borderTop: '1px solid rgba(197, 160, 89, 0.3)', borderBottom: '1px solid rgba(197, 160, 89, 0.3)', padding: '4px 16px', color: '#666' }}>{WEDDING_DATE}</p>
              
              {/* Slogan added here */}
              <p className="font-script text-darkBlue" style={{ fontSize: '1rem', marginTop: '12px', textAlign: 'center' }}>
                O início do nosso 'Para Sempre'
              </p>
            </div>
          </div>

          {/* Envelope Front (Pocket) - Blue */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', zIndex: 20, pointerEvents: 'none', filter: 'drop-shadow(0 4px 3px rgba(0,0,0,0.1))' }}>
             <svg style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%' }} viewBox="0 0 320 220" preserveAspectRatio="none">
               <path d="M0,220 L160,110 L320,220 Z" fill="#4B6584" opacity="0.9" /> {/* Dark Blue */}
               <path d="M0,0 L0,220 L160,110 Z" fill="#93A9D1" /> {/* Blue */}
               <path d="M320,0 L320,220 L160,110 Z" fill="#93A9D1" /> {/* Blue */}
             </svg>
          </div>

          {/* Envelope Top Flap */}
          <div className={`envelope-flap ${isOpen ? 'is-open' : ''}`}>
             {/* Flap Graphic */}
             <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }} viewBox="0 0 320 110" preserveAspectRatio="none">
                <path d="M0,0 L160,110 L320,0 Z" fill="#93A9D1" /> {/* Blue */}
             </svg>
             
             {/* Wax Seal with Logo */}
             <div className={`wax-seal ${isOpen ? 'is-open' : ''}`}>
                <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Exterior - Rotating */}
                    <img 
                        src={IMG_SEAL_EXT} 
                        alt="Seal Ring" 
                        style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
                            animation: 'spin-slow 10s linear infinite'
                        }} 
                    />
                    {/* Interior - Static */}
                    <img 
                        src={IMG_SEAL_INT} 
                        alt="Seal Center" 
                        style={{ 
                            position: 'absolute', 
                            inset: 0, 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
                            transform: 'scale(0.55)'
                        }} 
                    />
                </div>
             </div>
          </div>

        </div>
      </div>

      <div style={{ marginTop: '3rem', transition: 'opacity 0.5s', opacity: isOpen ? 0 : 1 }} className={!isOpen ? 'animate-pulse-slow' : ''}>
        <p className="font-serif" style={{ fontStyle: 'italic', color: 'rgba(75, 101, 132, 0.6)' }}>Toque para abrir</p>
      </div>

    </div>
  );
};

export default EnvelopeScreen;