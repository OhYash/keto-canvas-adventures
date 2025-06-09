
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';

interface Position {
  x: number;
  y: number;
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  position: Position;
  color: string;
  gradient: string;
  icon: string;
  direction: 'right' | 'left' | 'up' | 'down';
}

const InfiniteCanvas = () => {
  const [viewportPosition, setViewportPosition] = useState<Position>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState<Position>({ x: 0, y: 0 });
  const [currentSection, setCurrentSection] = useState<string>('home');
  const canvasRef = useRef<HTMLDivElement>(null);

  const sections: Section[] = [
    {
      id: 'work',
      title: 'Work Experience',
      subtitle: 'Professional Journey & Projects',
      position: { x: 800, y: 0 },
      color: 'from-blue-500 to-cyan-500',
      gradient: 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20',
      icon: '💼',
      direction: 'right'
    },
    {
      id: 'alwar',
      title: 'Alwar City Life',
      subtitle: 'My Hometown Adventures',
      position: { x: -800, y: 0 },
      color: 'from-green-500 to-emerald-500',
      gradient: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20',
      icon: '🏛️',
      direction: 'left'
    },
    {
      id: 'keto',
      title: 'Meet Keto',
      subtitle: 'My Beloved Cat',
      position: { x: 0, y: -800 },
      color: 'from-purple-500 to-pink-500',
      gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
      icon: '🐱',
      direction: 'up'
    },
    {
      id: 'fitness',
      title: 'Fitness Journey',
      subtitle: 'From Skinny Fat to Fit',
      position: { x: 0, y: 800 },
      color: 'from-orange-500 to-red-500',
      gradient: 'bg-gradient-to-br from-orange-500/20 to-red-500/20',
      icon: '💪',
      direction: 'down'
    }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastMousePos.x;
    const deltaY = e.clientY - lastMousePos.y;

    setViewportPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));

    setLastMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;

    const deltaX = e.touches[0].clientX - lastMousePos.x;
    const deltaY = e.touches[0].clientY - lastMousePos.y;

    setViewportPosition(prev => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY
    }));

    setLastMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const navigateToSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (section) {
      // Calculate the position to center the section card on screen
      setViewportPosition({
        x: -section.position.x,
        y: -section.position.y
      });
      setCurrentSection(sectionId);
    }
  };

  const navigateHome = () => {
    setViewportPosition({ x: 0, y: 0 });
    setCurrentSection('home');
  };

  const getArrowIcon = (direction: string) => {
    switch (direction) {
      case 'right': return <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'left': return <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'up': return <ArrowUp className="w-4 h-4 sm:w-6 sm:h-6" />;
      case 'down': return <ArrowDown className="w-4 h-4 sm:w-6 sm:h-6" />;
      default: return <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6" />;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          navigateToSection('work');
          break;
        case 'ArrowLeft':
          navigateToSection('alwar');
          break;
        case 'ArrowUp':
          navigateToSection('keto');
          break;
        case 'ArrowDown':
          navigateToSection('fitness');
          break;
        case 'Escape':
        case 'Home':
          navigateHome();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div 
      ref={canvasRef}
      className="w-full h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 cursor-grab active:cursor-grabbing relative touch-pan-x touch-pan-y"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Canvas content */}
      <div
        className="absolute transition-transform duration-300 ease-out"
        style={{
          transform: `translate(${viewportPosition.x}px, ${viewportPosition.y}px)`,
          left: '50%',
          top: '50%'
        }}
      >
        {/* Home/Landing section */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2">
          <Card className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm border-slate-600/50 text-center w-[95vw] sm:w-[90vw] md:w-[600px] max-w-[600px] max-h-[85vh] overflow-y-auto">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2 sm:mb-3">
                Welcome to My Universe
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 mb-4 sm:mb-6">
                Navigate through different dimensions of my life
              </p>
              <div className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4">
                Use arrow keys, tap cards, or drag to explore
              </div>
            </div>

            {/* Navigation hints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => navigateToSection(section.id)}
                  className={`p-3 sm:p-4 rounded-lg border border-slate-600/50 hover:border-slate-400/50 transition-all duration-300 hover:scale-105 ${section.gradient} backdrop-blur-sm group touch-manipulation`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg sm:text-xl">{section.icon}</span>
                    <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                      {getArrowIcon(section.direction)}
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-white text-xs sm:text-sm">{section.title}</div>
                    <div className="text-xs text-slate-300">{section.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>

            <Badge variant="secondary" className="text-xs">
              Press ESC to return home
            </Badge>
          </Card>
        </div>

        {/* Section pages */}
        {sections.map((section) => (
          <div
            key={section.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: section.position.x,
              top: section.position.y
            }}
          >
            {section.id === 'work' && (
              <Card className={`p-4 sm:p-6 ${section.gradient} backdrop-blur-sm border-slate-600/50 w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto`}>
                <div className="text-center mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 block">{section.icon}</span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">{section.title}</h2>
                  <p className="text-sm sm:text-base text-slate-300">{section.subtitle}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Frontend Development</h3>
                    <p className="text-slate-300 mb-3 text-sm">Building modern, responsive web applications with React, TypeScript, and modern CSS frameworks.</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge className="text-xs">React</Badge>
                      <Badge className="text-xs">TypeScript</Badge>
                      <Badge className="text-xs">Tailwind CSS</Badge>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">UI/UX Design</h3>
                    <p className="text-slate-300 mb-3 text-sm">Creating intuitive user experiences and beautiful interfaces that users love to interact with.</p>
                    <div className="flex flex-wrap gap-1">
                      <Badge className="text-xs">Figma</Badge>
                      <Badge className="text-xs">Design Systems</Badge>
                      <Badge className="text-xs">Prototyping</Badge>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={navigateHome}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 mx-auto block text-sm touch-manipulation"
                >
                  ← Back to Home
                </button>
              </Card>
            )}

            {section.id === 'alwar' && (
              <Card className={`p-4 sm:p-6 ${section.gradient} backdrop-blur-sm border-slate-600/50 w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto`}>
                <div className="text-center mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 block">{section.icon}</span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">{section.title}</h2>
                  <p className="text-sm sm:text-base text-slate-300">{section.subtitle}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">City Palace & Heritage</h3>
                    <p className="text-slate-300 text-sm">Growing up surrounded by the rich history of Alwar, from the majestic City Palace to the ancient Bala Quila fort.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Sariska Tiger Reserve</h3>
                    <p className="text-slate-300 text-sm">Weekend adventures in one of India's most beautiful tiger reserves, just a short drive from home.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Local Culture</h3>
                    <p className="text-slate-300 text-sm">The vibrant markets, delicious street food, and warm community that shaped my values and perspective.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Memories</h3>
                    <p className="text-slate-300 text-sm">From school days to family gatherings, Alwar holds countless precious memories that continue to inspire me.</p>
                  </div>
                </div>
                
                <button 
                  onClick={navigateHome}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 mx-auto block text-sm touch-manipulation"
                >
                  ← Back to Home
                </button>
              </Card>
            )}

            {section.id === 'keto' && (
              <Card className={`p-4 sm:p-6 ${section.gradient} backdrop-blur-sm border-slate-600/50 w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto`}>
                <div className="text-center mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 block">{section.icon}</span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">{section.title}</h2>
                  <p className="text-sm sm:text-base text-slate-300">{section.subtitle}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Personality</h3>
                    <p className="text-slate-300 text-sm">Keto is the most curious and playful cat you'll ever meet. Always getting into mischief and making us laugh.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Favorite Activities</h3>
                    <p className="text-slate-300 text-sm">Chasing laser dots, napping in sunbeams, and somehow always knowing when it's treat time.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Special Talents</h3>
                    <p className="text-slate-300 text-sm">Master of opening doors, professional lap warmer, and expert at judging my coding skills from across the room.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Life Lessons</h3>
                    <p className="text-slate-300 text-sm">Keto has taught me the importance of curiosity, rest, and finding joy in simple moments.</p>
                  </div>
                </div>
                
                <button 
                  onClick={navigateHome}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 mx-auto block text-sm touch-manipulation"
                >
                  ← Back to Home
                </button>
              </Card>
            )}

            {section.id === 'fitness' && (
              <Card className={`p-4 sm:p-6 ${section.gradient} backdrop-blur-sm border-slate-600/50 w-[95vw] sm:w-[90vw] md:w-[700px] max-w-[700px] max-h-[85vh] overflow-y-auto`}>
                <div className="text-center mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3 block">{section.icon}</span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">{section.title}</h2>
                  <p className="text-sm sm:text-base text-slate-300">{section.subtitle}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">The Starting Point</h3>
                    <p className="text-slate-300 text-sm">Like many developers, I struggled with the "skinny fat" physique - looking slim but lacking muscle definition and strength.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">The Journey</h3>
                    <p className="text-slate-300 text-sm">Started with basic bodyweight exercises, gradually progressed to weight training, and learned about proper nutrition.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Current Focus</h3>
                    <p className="text-slate-300 text-sm">Building lean muscle, improving strength, and maintaining consistency while balancing a demanding coding schedule.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 p-3 sm:p-4 rounded-lg">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Lessons Learned</h3>
                    <p className="text-slate-300 text-sm">Consistency beats perfection, progressive overload is key, and taking care of your body enhances mental performance.</p>
                  </div>
                </div>
                
                <button 
                  onClick={navigateHome}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 mx-auto block text-sm touch-manipulation"
                >
                  ← Back to Home
                </button>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* Navigation indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-slate-800/80 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-full text-slate-300 text-xs sm:text-sm">
          {currentSection === 'home' ? 'Home Base' : sections.find(s => s.id === currentSection)?.title}
        </div>
      </div>
    </div>
  );
};

export default InfiniteCanvas;
