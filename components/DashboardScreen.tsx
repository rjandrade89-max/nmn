import React, { useState, useEffect } from 'react';
import { COUPLE_NAMES, IMG_MAIN_COUPLE, IMG_QUINTA, IMG_ENVELOPE_LINER, IMG_FLORAL_BOUQUET } from '../constants';
import DetailOverlay from './DetailOverlay';
import { FlowerCorner, FlowerSingle } from './VectorGraphics';

interface DashboardProps {
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

const DashboardScreen: React.FC<DashboardProps> = ({ isAudioPlaying, onToggleAudio }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Observer Logic for Staggered Animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const getFloatStyle = (delay: string, duration: string) => ({
    animationDelay: delay,
    animationDuration: duration,
  });

  return (
    <div className="dashboard-screen" style={{ position: 'relative' }}>
      
      {/* --- FLORAL DESIGN: Side Accents --- */}
      {/* Middle Right - Accent */}
      <div style={{ position: 'absolute', top: '30%', right: '-1.5rem', width: '4.5rem', zIndex: 0, pointerEvents: 'none', opacity: 0.7 }}>
         <FlowerSingle variant={4} style={{ width: '100%', transform: 'rotate(15deg)' }} />
      </div>

      {/* --- HEADER COMPOSITION: ENVELOPE + FLOWERS --- */}
      <div className="header-envelope-composition" style={{ 
          position: 'relative', 
          width: '70%', 
          maxWidth: '220px', 
          margin: '3rem auto 2rem auto', 
          display: 'flex', 
          justifyContent: 'center',
          zIndex: 10
      }}>
          {/* FLOWERS - Positioned absolutely relative to this container */}
          {/* They are BEHIND the envelope (zIndex 0 vs 10) but positioned to peek out Top-Left */}
          <div style={{
              position: 'absolute',
              top: '-45px',
              left: '-35px',
              width: '180px',
              zIndex: 0, 
              pointerEvents: 'none',
              transform: 'rotate(-10deg)'
          }}>
             <img 
               src={IMG_FLORAL_BOUQUET} 
               alt="Flores" 
               style={{ width: '100%', display: 'block' }}
             />
          </div>

          {/* ENVELOPE - The main visual anchor */}
          <div style={{ 
              position: 'relative', 
              width: '100%', 
              zIndex: 10 
          }}>
             <img 
               src={IMG_ENVELOPE_LINER} 
               alt="Convite" 
               style={{ width: '100%', height: 'auto', display: 'block', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))' }} 
             />
          </div>
      </div>


      {/* --- MASONRY GRID LAYOUT --- */}
      <div className="masonry-grid" style={{ paddingBottom: '4rem', position: 'relative', zIndex: 10 }}>
        
        {/* --- LEFT COLUMN --- */}
        <div className="col-left">
          
          {/* 1. Venue Photo Tile */}
          <div className="scroll-reveal" style={{ transitionDelay: '0.1s' }}>
             <div style={{ position: 'relative' }}>
                <div 
                    onClick={() => setActiveSection('details')}
                    className="card card-white card-details animate-float"
                    style={{ position: 'relative', zIndex: 10, ...getFloatStyle('0s', '8s') }}
                >
                    <div className="tape-top"></div>
                    <div style={{ width: '100%', height: '7rem', overflow: 'hidden', background: '#eee' }}>
                    <img src={IMG_QUINTA} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} alt="Venue" />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                        <p className="font-serif uppercase" style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: '#aaa', marginBottom: '2px' }}>O Casamento de</p>
                        <p className="font-serif font-bold" style={{ fontSize: '0.9rem' }}>{COUPLE_NAMES}</p>
                    </div>
                </div>
             </div>
          </div>

          {/* 2. RSVP Card */}
          <div className="scroll-reveal" style={{ transitionDelay: '0.3s' }}>
              <div style={{ position: 'relative' }}>
                  <div 
                    onClick={() => setActiveSection('rsvp')}
                    className="card card-white card-rsvp animate-float"
                    style={{ overflow: 'visible', zIndex: 10, ...getFloatStyle('2s', '6s') }}
                  >
                    <p className="font-script text-darkBlue" style={{ fontSize: '1.25rem', textAlign: 'left', marginLeft: '0.25rem' }}>Confirmar</p>
                    <p className="font-serif font-bold text-center text-darkBlue" style={{ fontSize: '1.5rem', borderBottom: '1px solid rgba(75, 101, 132, 0.3)', margin: '0.25rem 0' }}>Presença</p>
                    <p className="font-script text-darkBlue" style={{ fontSize: '1.1rem', textAlign: 'right', marginRight: '0.25rem' }}>(Por favor)</p>
                  </div>
              </div>
          </div>

          {/* 3. Photo Card -> GALLERY */}
          <div className="scroll-reveal" style={{ transitionDelay: '0.5s' }}>
             <div style={{ position: 'relative' }}>
                <div 
                    onClick={() => setActiveSection('gallery')}
                    className="card card-white card-timeline animate-float"
                    style={{ overflow: 'visible', zIndex: 10, ...getFloatStyle('0.5s', '8.5s') }}
                >
                    <div style={{ width: '100%', height: '10rem', overflow: 'hidden', position: 'relative' }}>
                    <img src={IMG_MAIN_COUPLE} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Couple" />
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(75, 101, 132, 0.1)', mixBlendMode: 'overlay' }}></div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                        <p className="font-script text-darkBlue" style={{ fontSize: '1.4rem' }}>Galeria</p>
                    </div>
                </div>
                {/* Floral: Small one at the bottom-right corner behind */}
                <div style={{ position: 'absolute', bottom: '-5px', right: '-10px', width: '2.5rem', zIndex: 5, pointerEvents: 'none' }}>
                    <FlowerSingle variant={4} style={{ width: '100%', transform: 'rotate(5deg)' }} />
                </div>
             </div>
          </div>
          
        </div>


        {/* --- RIGHT COLUMN --- */}
        <div className="col-right">
          
          {/* 1. Save The Date */}
          <div className="scroll-reveal" style={{ transitionDelay: '0.2s' }}>
             <div style={{ position: 'relative' }}>
                <div 
                    onClick={() => setActiveSection('timeline')}
                    className="card card-white card-std animate-float"
                    style={{ position: 'relative', zIndex: 10, ...getFloatStyle('1.5s', '7.5s') }}
                >
                    <div className="tape-corner"></div>
                    <p className="font-script text-gold" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Save the Date</p>
                    
                    <div style={{ borderTop: '1px solid rgba(147, 169, 209, 0.2)', borderBottom: '1px solid rgba(147, 169, 209, 0.2)', padding: '0.5rem 0', margin: '0.5rem 0' }}>
                        <p className="font-serif uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', marginBottom: '4px' }}>Setembro</p>
                        <p className="font-serif text-darkBlue font-bold" style={{ fontSize: '2.25rem', lineHeight: 1 }}>19</p>
                        <p className="font-serif uppercase" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', marginTop: '4px' }}>2026</p>
                    </div>
                    <p className="font-sans uppercase" style={{ fontSize: '0.6rem', color: '#999', letterSpacing: '0.1em' }}>Algarve</p>
                </div>
             </div>
          </div>

          {/* 2. Text Card -> TIMELINE */}
          <div className="scroll-reveal" style={{ transitionDelay: '0.4s' }}>
             <div style={{ position: 'relative' }}>
                <div 
                    onClick={() => setActiveSection('timeline')}
                    className="card card-gallery animate-float"
                    style={{ position: 'relative', overflow: 'hidden', zIndex: 10, ...getFloatStyle('2.5s', '7s') }}
                >
                    <p className="font-script text-center" style={{ fontSize: '1.1rem', color: '#888' }}>Ver o</p>
                    <p className="font-serif text-center uppercase font-bold" style={{ fontSize: '1.1rem', letterSpacing: '0.1em' }}>Cronograma</p>
                </div>
                {/* Floral: Overlapping bottom left corner */}
                <div style={{ position: 'absolute', bottom: '-15px', left: '-15px', width: '3.5rem', zIndex: 5, pointerEvents: 'none' }}>
                    <FlowerSingle variant={3} style={{ width: '100%', transform: 'rotate(-15deg)' }} />
                </div>
             </div>
          </div>

          {/* 3. Minigames Button */}
          <div className="scroll-reveal" style={{ transitionDelay: '0.6s' }}>
             <div style={{ position: 'relative' }}>
                <div 
                    onClick={() => setActiveSection('minigames')}
                    className="card card-white card-timeline animate-float" 
                    style={{ 
                    position: 'relative', 
                    overflow: 'hidden', 
                    zIndex: 10, 
                    padding: '1.5rem 0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...getFloatStyle('1s', '7s') 
                    }}
                >
                    <p className="font-script text-center text-gold" style={{ fontSize: '1.3rem' }}>Jogar</p>
                    <p className="font-serif text-center uppercase font-bold text-darkBlue" style={{ fontSize: '1rem', letterSpacing: '0.1em', marginTop: '0.25rem' }}>Sopa de Letras</p>
                </div>
             </div>
          </div>

          {/* 4. FAQs Circle */}
          <div className="scroll-reveal" style={{ transitionDelay: '0.8s' }}>
             <div 
                onClick={() => setActiveSection('faq')}
                className="card card-faq animate-float"
                style={{ position: 'relative', ...getFloatStyle('3s', '6s') }}
             >
                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                    <p className="font-script" style={{ fontSize: '1.1rem', opacity: 0.8, marginBottom: '-5px' }}>Ver as</p>
                    <p className="font-serif font-bold" style={{ fontSize: '1.5rem', letterSpacing: '0.1em', borderBottom: '1px solid var(--c-gold)', paddingBottom: '2px', marginBottom: '2px' }}>FAQS</p>
                    <span className="uppercase" style={{ fontSize: '0.6rem', opacity: 0.6 }}>Info</span>
                </div>
                {/* Floral: Small one on bottom left */}
                <div style={{ position: 'absolute', bottom: '-10px', left: '-15px', width: '2.5rem', zIndex: 5, pointerEvents: 'none' }}>
                    <FlowerSingle variant={5} style={{ width: '100%', transform: 'rotate(-10deg)' }} />
                </div>
             </div>
          </div>

        </div>

      </div>

      {/* Footer Bouquet - Bottom Right Balance */}
      <div style={{ position: 'absolute', bottom: '-3rem', right: '-1rem', width: '10rem', zIndex: 5, pointerEvents: 'none', opacity: 0.8 }}>
         <FlowerCorner src="https://drive.google.com/thumbnail?id=11riu0M7xfWAuKdk56aB43kpK8pWXg5gD&sz=w1000" style={{ width: '100%', transform: 'rotate(0deg)' }} />
      </div>

      <div style={{ textAlign: 'center', marginTop: '1rem', animation: 'fadeIn 1s forwards', animationDelay: '0.7s', opacity: 0, position: 'relative', zIndex: 10 }}>
        <p className="font-sans uppercase text-blue" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', opacity: 0.6 }}>Esperamos por vocês</p>
      </div>

      {/* Modal Overlay for Details */}
      {activeSection && (
        <DetailOverlay 
          section={activeSection} 
          onClose={() => setActiveSection(null)} 
        />
      )}
    </div>
  );
};

export default DashboardScreen;