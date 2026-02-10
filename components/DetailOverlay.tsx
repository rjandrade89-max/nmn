
import React, { useEffect, useState } from 'react';
import { TIMELINE_DATA, FAQ_DATA, WEDDING_FULL_DATE, MAP_TIVOLI_SRC, MAP_CANHOTO_SRC, IMG_QUINTA, IMG_POOL, GALLERY_IMAGES, RSVP_PHONE, RSVP_PHONE_CLEAN, QUIZ_DATA } from '../constants';

interface DetailOverlayProps {
  section: string;
  onClose: () => void;
}

// Simple Word Search Component
const WordSearchGame = () => {
  const GRID_SIZE = 8;
  const WORDS = ["CARLA", "FABIO", "AMOR", "FESTA", "ALGARVE"];
  
  // Pre-configured 8x8 Grid for simplicity and reliability in demo
  const INITIAL_GRID = [
    ['C','A','R','L','A','X','Y','Z'],
    ['B','L','G','A','R','V','E','F'],
    ['T','I','V','O','L','I','P','A'],
    ['F','A','B','I','O','Q','W','B'],
    ['E','S','T','A','M','O','R','I'],
    ['S','F','E','S','T','A','K','O'],
    ['T','U','V','W','X','Y','Z','A'],
    ['A','L','G','A','R','V','E','B'],
  ];
  
  // Flattened grid for easier state management: index 0-63
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  
  const handleCellClick = (row: number, col: number) => {
    const index = row * GRID_SIZE + col;
    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index));
    } else {
      // Add and check
      const newSelection = [...selectedIndices, index].sort((a,b) => a-b);
      setSelectedIndices(newSelection);
      checkWord(newSelection);
    }
  };

  const checkWord = (indices: number[]) => {
    // Construct word from indices
    const letters = indices.map(idx => {
       const r = Math.floor(idx / GRID_SIZE);
       const c = idx % GRID_SIZE;
       return INITIAL_GRID[r][c];
    }).join('');

    // Check if it matches any word (forward)
    if (WORDS.includes(letters)) {
      if (!foundWords.includes(letters)) {
        setFoundWords([...foundWords, letters]);
        setSelectedIndices([]); // Clear selection for next word
      }
    }
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={{ marginBottom: '1rem', color: '#666' }}>Encontra: <span className="font-bold">{WORDS.filter(w => !foundWords.includes(w)).join(', ')}</span></p>
      
      {foundWords.length > 0 && (
         <div style={{ marginBottom: '1rem', color: '#A3B18A', fontWeight: 'bold' }}>
            Encontraste: {foundWords.join(', ')}!
         </div>
      )}

      <div className="word-search-grid">
         {INITIAL_GRID.map((row, rIdx) => (
            row.map((letter, cIdx) => {
               const index = rIdx * GRID_SIZE + cIdx;
               const isSelected = selectedIndices.includes(index);
               
               return (
                 <div 
                   key={`${rIdx}-${cIdx}`} 
                   className={`ws-cell ${isSelected ? 'selected' : ''}`}
                   onClick={() => handleCellClick(rIdx, cIdx)}
                 >
                   {letter}
                 </div>
               )
            })
         ))}
      </div>
      <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>Toque nas letras em ordem.</p>
    </div>
  );
};

// Quiz Component
const QuizGame = () => {
    const [person, setPerson] = useState<'carla' | 'fabio'>('carla');
    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Safe fallback if data is missing
    const questions = QUIZ_DATA[person] || [];
    const currentQ = questions[currentQIndex];

    const handleOptionClick = (option: string) => {
        if (isAnswered) return;
        setSelectedOption(option);
        setIsAnswered(true);
        
        if (option === currentQ.answer) setScore(score + 1);

        setTimeout(() => {
            if (currentQIndex < questions.length - 1) {
                setCurrentQIndex(currentQIndex + 1);
                setSelectedOption(null);
                setIsAnswered(false);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    const resetQuiz = (newPerson: 'carla' | 'fabio') => {
        setPerson(newPerson);
        setCurrentQIndex(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsAnswered(false);
    };

    if (showResult) {
        return (
            <div style={{ textAlign: 'center', padding: '1rem' }}>
                <h4 className="font-serif text-darkBlue" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Resultado: {person === 'carla' ? 'Carla' : 'Fábio'}</h4>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#A3B18A', marginBottom: '1rem' }}>{score}/{questions.length}</div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={() => resetQuiz(person)} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid #ccc', background: 'white' }}>Tentar de novo</button>
                    <button onClick={() => resetQuiz(person === 'carla' ? 'fabio' : 'carla')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: 'none', background: '#A3B18A', color: 'white' }}>
                        Jogar {person === 'carla' ? 'Fábio' : 'Carla'}
                    </button>
                </div>
            </div>
        )
    }

    if (!currentQ) return null;

    return (
        <div className="quiz-container">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
                <button onClick={() => resetQuiz('carla')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: 'none', background: person === 'carla' ? '#93A9D1' : '#eee', color: person === 'carla' ? 'white' : '#666' }}>Carla</button>
                <button onClick={() => resetQuiz('fabio')} style={{ padding: '0.5rem 1rem', borderRadius: '20px', border: 'none', background: person === 'fabio' ? '#4B6584' : '#eee', color: person === 'fabio' ? 'white' : '#666' }}>Fábio</button>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.8rem', color: '#999' }}>Pergunta {currentQIndex + 1} de {questions.length}</p>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2C3E50', marginTop: '0.5rem' }}>{currentQ.q}</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {currentQ.options.map((opt, idx) => {
                    let className = "quiz-option";
                    if (isAnswered) {
                        if (opt === currentQ.answer) className += " correct";
                        else if (opt === selectedOption) className += " incorrect";
                    }
                    return (
                        <button key={idx} className={className} onClick={() => handleOptionClick(opt)} disabled={isAnswered}>{opt}</button>
                    );
                })}
            </div>
        </div>
    );
};

const DetailOverlay: React.FC<DetailOverlayProps> = ({ section, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'tivoli' | 'canhoto'>('tivoli');
  const [gameTab, setGameTab] = useState<'words' | 'quiz'>('words');

  useEffect(() => {
    // Small delay to trigger animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 400); // Wait for animation
  };

  const renderContent = () => {
    switch(section) {
      case 'timeline':
        return (
          <div style={{ marginTop: '1rem' }}>
             <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h3 className="font-serif text-blue" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Plano de Festa</h3>
                <p className="uppercase text-gold" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>{WEDDING_FULL_DATE}</p>
             </div>
             <div style={{ borderLeft: '1px solid rgba(163, 177, 138, 0.3)', marginLeft: '1rem', paddingLeft: '2rem', paddingBottom: '1rem' }}>
                {TIMELINE_DATA.map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <span className="timeline-dot"></span>
                    <span className="font-serif text-gold" style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.25rem' }}>{item.time}</span>
                    <h4 className="font-sans font-bold uppercase" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>{item.title}</h4>
                    <p className="font-sans" style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.6, maxWidth: '28rem' }}>{item.description}</p>
                  </div>
                ))}
             </div>
          </div>
        );

      case 'gallery':
        return (
          <div style={{ marginTop: '1rem' }}>
             <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h3 className="font-serif text-blue" style={{ fontSize: '2rem' }}>Galeria</h3>
                <p style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Momentos Especiais</p>
             </div>
             <div className="gallery-grid">
               {GALLERY_IMAGES.map((imgSrc, idx) => (
                 <div key={idx} className="gallery-item animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                    <img src={imgSrc} alt={`Gallery ${idx}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                 </div>
               ))}
             </div>
          </div>
        );

      case 'faq':
        return (
          <div style={{ marginTop: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h3 className="font-serif text-blue" style={{ fontSize: '2rem' }}>Informações Úteis</h3>
            </div>
            
            <div style={{ backgroundColor: '#FEF2F2', padding: '1.5rem', borderRadius: '12px', border: '1px solid #FECACA', textAlign: 'center', marginBottom: '1.5rem', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                 <h4 style={{ fontWeight: 'bold', color: '#991B1B', fontSize: '0.85rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dress Code - Importante</h4>
                 <p style={{ fontSize: '1rem', color: '#B91C1C', lineHeight: 1.5, marginBottom: '0.25rem' }}>
                   Cores Proibidas: <span style={{ fontWeight: '600' }}>Azul Claro, Branco e Bege</span>.
                 </p>
                 <p style={{ fontSize: '0.75rem', color: '#DC2626' }}>Sugerimos tons pastel (rosa, lilás, verde) ou tons escuros.</p>
            </div>

            {FAQ_DATA.filter(f => !f.question.includes('Dress')).map((item, idx) => (
              <div key={idx} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid rgba(163, 177, 138, 0.2)', marginBottom: '1rem' }}>
                <h4 className="font-serif text-darkBlue" style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.question}</h4>
                <p style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.6 }}>{item.answer}</p>
              </div>
            ))}
          </div>
        );

      case 'details':
        return (
          <div style={{ marginTop: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            
            {/* Tabs */}
            <div style={{ display: 'flex', padding: '4px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}>
               <button 
                  onClick={() => setActiveTab('tivoli')}
                  className={`tab-btn ${activeTab === 'tivoli' ? 'active' : ''}`}
               >
                 Hotel & Cerimónia
               </button>
               <button 
                  onClick={() => setActiveTab('canhoto')}
                  className={`tab-btn ${activeTab === 'canhoto' ? 'active' : ''}`}
               >
                 Copo D'água
               </button>
            </div>

            {activeTab === 'tivoli' ? (
               <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ height: '16rem', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', position: 'relative' }}>
                    <img src={IMG_POOL} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Tivoli" />
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p className="font-serif text-white" style={{ fontSize: '1.8rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Tivoli Carvoeiro</p>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center', padding: '0 1rem' }}>
                     <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Ponto de encontro e Cerimónia Civil</p>
                     <p className="text-darkBlue font-bold" style={{ fontSize: '1.5rem' }}>12h30 - Chegada</p>
                  </div>

                  <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #eee' }}>
                    <iframe 
                      src={MAP_TIVOLI_SRC}
                      width="100%" 
                      height="250" 
                      style={{border:0}} 
                      loading="lazy" 
                      title="Mapa Tivoli"
                    ></iframe>
                  </div>

                  <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(163, 177, 138, 0.2)', fontSize: '0.9rem', color: '#555', lineHeight: 1.6 }}>
                     <p style={{ marginBottom: '0.5rem' }}><strong className="text-blue">De Faro:</strong> A22 direção Lagoa -> N125 até Carvoeiro.</p>
                     <p><strong className="text-blue">De Lisboa:</strong> A2 até Algarve -> A22 e N125 até Carvoeiro.</p>
                  </div>
               </div>
            ) : (
               <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ height: '16rem', width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', position: 'relative' }}>
                    <img src={IMG_QUINTA} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Quinta" />
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <p className="font-serif text-white" style={{ fontSize: '1.8rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Quinta do Canhoto</p>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'center', padding: '0 1rem' }}>
                     <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Celebração, Jantar e Festa</p>
                     <p className="text-darkBlue font-bold" style={{ fontSize: '1.5rem' }}>Albufeira</p>
                  </div>

                  <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', border: '1px solid #eee' }}>
                    <iframe 
                      src={MAP_CANHOTO_SRC}
                      width="100%" 
                      height="250" 
                      style={{border:0}} 
                      loading="lazy" 
                      title="Mapa Canhoto"
                    ></iframe>
                  </div>
               </div>
            )}
            
          </div>
        );

      case 'rsvp':
        return (
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '40vh', gap: '1.5rem' }}>
             <div style={{ width: '5rem', height: '5rem', backgroundColor: '#A3B18A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} className="animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
             </div>
             <div style={{ textAlign: 'center' }}>
                <h3 className="font-serif" style={{ fontSize: '2.25rem', color: '#2F3E32', marginBottom: '0.5rem' }}>Confirmação</h3>
                <p className="font-bold text-darkBlue" style={{ fontSize: '1.5rem', letterSpacing: '0.05em' }}>{RSVP_PHONE}</p>
             </div>
             <p style={{ textAlign: 'center', fontSize: '1rem', color: '#555', maxWidth: '24rem' }}>
                Por favor, confirmem a vossa presença até <span style={{ fontWeight: '600', color: '#3A4B40' }}>1 de Julho de 2026</span>.
             </p>
             <a 
               href={`https://wa.me/${RSVP_PHONE_CLEAN}?text=Olá! Confirmo a minha presença no casamento do Fábio e da Carla.`} 
               target="_blank"
               rel="noreferrer"
               style={{ 
                 padding: '1rem 2rem', 
                 backgroundColor: '#3A4B40', // Forest Green
                 color: 'white', 
                 fontSize: '1.1rem', 
                 fontWeight: 'bold', 
                 borderRadius: '999px', 
                 boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '0.75rem', 
                 textDecoration: 'none',
                 transition: 'transform 0.2s'
               }}
               onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
               onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
             >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Confirmar por WhatsApp
             </a>
          </div>
        );

      case 'minigames':
         return (
             <div style={{ marginTop: '1rem', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="font-serif text-blue" style={{ fontSize: '2rem' }}>Jogos</h3>
                    <p style={{ fontSize: '0.85rem', color: '#888' }}>Divirta-se com os noivos!</p>
                </div>

                <div style={{ display: 'flex', padding: '4px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '1.5rem', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}>
                    <button onClick={() => setGameTab('words')} className={`tab-btn ${gameTab === 'words' ? 'active' : ''}`}>Sopa de Letras</button>
                    <button onClick={() => setGameTab('quiz')} className={`tab-btn ${gameTab === 'quiz' ? 'active' : ''}`}>Quiz</button>
                </div>

                {gameTab === 'words' ? <WordSearchGame /> : <QuizGame />}
             </div>
         );

      default:
        return null;
    }
  };

  return (
    <div className={`overlay-backdrop ${isVisible ? 'visible' : ''}`} onClick={handleClose}>
      {/* Content Sheet / Modal */}
      <div 
        className="overlay-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Header */}
        <div className="close-btn-container">
           <button onClick={handleClose} className="close-btn">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>
           </button>
        </div>
        
        <div style={{ padding: '0 1.5rem 3rem 1.5rem' }}>
          {renderContent()}
        </div>

      </div>
    </div>
  );
};

export default DetailOverlay;
