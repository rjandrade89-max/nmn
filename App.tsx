
import React, { useState, useEffect } from 'react';
import EnvelopeScreen from './components/EnvelopeScreen';
import DashboardScreen from './components/DashboardScreen';
import { ViewState } from './types';
import { AUDIO_BG, IMG_LOGO } from './constants';

function App() {
  const [viewState, setViewState] = useState<ViewState>('INTRO');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Intro Sequence Logic
    if (viewState === 'INTRO') {
      const timer = setTimeout(() => {
        setViewState('ENVELOPE');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [viewState]);

  // Audio Control: Pause when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      const audio = document.getElementById('bg-music') as HTMLAudioElement;
      if (document.hidden && audio && !audio.paused) {
        audio.pause();
        setIsPlaying(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Triggered immediately when user clicks envelope
  const handleStartAudio = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (audio && !isPlaying) {
      audio.volume = 0.4;
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(e => {
          console.log("Audio autoplay prevented or source error:", e);
          setIsPlaying(false);
        });
    }
  };

  // Triggered after animation finishes to show dashboard
  const handleOpenEnvelope = () => {
    setViewState('DASHBOARD');
  };

  const toggleAudio = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="app-wrapper">
      
      {/* Background Audio - Standard HTML Tag hidden */}
      <audio id="bg-music" loop src={AUDIO_BG} style={{ display: 'none' }}></audio>

      {/* Floating Audio Button (FAB) - Sage Green */}
      <button 
        onClick={toggleAudio}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 999, // High z-index to be on top of everything
          width: '3.5rem',
          height: '3.5rem',
          borderRadius: '50%',
          backgroundColor: '#A3B18A', // Sage Green / Verde Tropa
          border: 'none',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'white',
          transition: 'transform 0.2s',
          animation: isPlaying ? 'none' : 'pulse-slow 3s infinite'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        {isPlaying ? (
          // Pause Icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="4" height="16"></rect>
            <rect x="14" y="4" width="4" height="16"></rect>
          </svg>
        ) : (
          // Musical Note Icon
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M9 18V5l12-2v13"></path>
             <circle cx="6" cy="18" r="3"></circle>
             <circle cx="18" cy="16" r="3"></circle>
          </svg>
        )}
      </button>

      {/* Background - Replaced Image with Gradient as requested */}
      <div 
        className="bg-blur-layer"
        style={{ 
          background: 'linear-gradient(135deg, #F5F8FA 0%, #E6EEF5 100%)',
          opacity: 1, // Full opacity for the color
          filter: 'none' // Remove blur
        }}
      ></div>
      
      {/* Subtle overlay */}
      <div className="bg-overlay"></div>

      {/* Intro Text Overlay (Fades out) */}
      {viewState === 'INTRO' && (
         <div className="intro-overlay">
            {/* Replaced initial Text with Logo as requested */}
            <div className="intro-text" style={{ width: '80%', maxWidth: '300px', display: 'flex', justifyContent: 'center' }}>
               <img 
                 src={IMG_LOGO} 
                 alt="Carla & Fábio" 
                 style={{ width: '100%', height: 'auto', objectFit: 'contain' }} 
               />
            </div>
         </div>
      )}

      {/* Content Container */}
      <div className="main-container">
        
        {/* Paper Texture Overlay inside the app */}
        <div className="paper-texture"></div>

        <div style={{ flex: 1, width: '100%', height: '100%', position: 'relative', zIndex: 10 }}>
          {viewState === 'DASHBOARD' ? (
            <DashboardScreen isAudioPlaying={isPlaying} onToggleAudio={toggleAudio} />
          ) : (
            <EnvelopeScreen 
              onOpen={handleOpenEnvelope} 
              onStartAudio={handleStartAudio}
            />
          )}
        </div>
      </div>

    </div>
  );
}

export default App;
