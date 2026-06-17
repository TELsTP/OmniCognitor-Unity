import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface GlobeMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  description: string;
  color: string;
  size: number;
}

interface InteractiveGlobeProps {
  onMarkerClick?: (marker: GlobeMarker) => void;
  onGlobeClick?: () => void;
}

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ onMarkerClick, onGlobeClick }) => {
  const { language } = useLanguage();
  const globeRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [selectedMarker, setSelectedMarker] = useState<GlobeMarker | null>(null);

  // Sample markers - TELSTP global network
  const markers: GlobeMarker[] = [
    {
      id: 'telstp-egypt',
      lat: 30.0444,
      lng: 31.2357,
      label: 'TELSTP - Giza, Egypt',
      description: 'Life Science Technology Park - Main Campus',
      color: '#D4AF37',
      size: 12,
    },
    {
      id: 'johns-hopkins',
      lat: 39.2989,
      lng: -76.6108,
      label: 'Johns Hopkins',
      description: 'Genomics Research Collaboration',
      color: '#3B82F6',
      size: 8,
    },
    {
      id: 'oxford',
      lat: 51.752,
      lng: -1.2577,
      label: 'University of Oxford',
      description: 'Medical Research Partnership',
      color: '#EF4444',
      size: 8,
    },
    {
      id: 'harvard',
      lat: 42.377,
      lng: -71.1167,
      label: 'Harvard University',
      description: 'Biotechnology Collaboration',
      color: '#10B981',
      size: 8,
    },
    {
      id: 'tokyo',
      lat: 35.6762,
      lng: 139.6503,
      label: 'University of Tokyo',
      description: 'NGS Research Hub',
      color: '#8B5CF6',
      size: 8,
    },
    {
      id: 'berlin',
      lat: 52.52,
      lng: 13.405,
      label: 'Charité Berlin',
      description: 'Telemedicine Network',
      color: '#F59E0B',
      size: 8,
    },
    {
      id: 'nairobi',
      lat: -1.2921,
      lng: 36.8219,
      label: 'Nairobi Telemedicine Hub',
      description: 'Rural Healthcare Access',
      color: '#EF4444',
      size: 6,
    },
    {
      id: 'mumbai',
      lat: 19.076,
      lng: 72.8777,
      label: 'Mumbai Research Center',
      description: 'Biobank Facility',
      color: '#3B82F6',
      size: 6,
    },
  ];

  // Auto-rotate globe
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setRotation(prev => ({ ...prev, y: (prev.y + 0.2) % 360 }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.x;
    const dy = e.clientY - lastPos.y;
    setRotation(prev => ({
      x: (prev.x + dy * 0.2) % 360,
      y: (prev.y - dx * 0.2) % 360,
    }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Convert 3D coordinates to 2D
  const project3D = (lat: number, lng: number, radius: number = 150) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + rotation.y) * (Math.PI / 180);
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    // Apply X rotation
    const cosX = Math.cos(rotation.x * Math.PI / 180);
    const sinX = Math.sin(rotation.x * Math.PI / 180);
    const newY = y * cosX - z * sinX;
    const newZ = y * sinX + z * cosX;

    // Perspective projection
    const scale = 500 / (500 + newZ);
    const projX = x * scale;
    const projY = newY * scale;

    return { x: projX, y: projY, scale };
  };

  // Handle marker click
  const handleMarkerClick = (marker: GlobeMarker) => {
    setSelectedMarker(marker);
    onMarkerClick?.(marker);
  };

  // Handle globe click (background)
  const handleGlobeClick = (e: React.MouseEvent) => {
    if (e.target === globeRef.current) {
      onGlobeClick?.();
    }
  };

  return (
    <div 
      ref={globeRef}
      className="interactive-globe relative w-full h-96 md:h-[500px] cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleGlobeClick}
    >
      {/* Globe Container */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Globe Sphere */}
        <div className="globe-sphere w-80 h-80 md:w-96 md:h-96 rounded-full relative overflow-hidden border-2 border-gold-400/30 shadow-globe">
          {/* Background - Earth texture approximation */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-800/50 via-green-700/50 to-blue-900/50" />
          
          {/* Grid Lines */}
          <div className="absolute inset-4 rounded-full border border-white/20" />
          
          {/* Markers */}
          {markers.map((marker) => {
            const { x, y, scale } = project3D(marker.lat, marker.lng);
            const isVisible = scale > 0.3 && Math.abs(x) < 200 && Math.abs(y) < 200;
            
            if (!isVisible) return null;

            return (
              <div 
                key={marker.id}
                className="absolute marker-point cursor-pointer hover:scale-110 transition-transform"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  zIndex: Math.floor(scale * 100),
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMarkerClick(marker);
                }}
              >
                {/* Marker Dot */}
                <div 
                  className="marker-dot rounded-full shadow-marker"
                  style={{
                    width: `${marker.size * scale}px`,
                    height: `${marker.size * scale}px`,
                    background: marker.color,
                  }}
                />
                
                {/* Marker Label (on hover) */}
                <div className="marker-label absolute -top-8 left-1/2 transform -translate-x-1/2 bg-stone-900/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                  {marker.label}
                </div>
              </div>
            );
          })}

          {/* TELSTP Central Node (Egypt) - Special highlight */}
          {(() => {
            const { x, y, scale } = project3D(30.0444, 31.2357);
            const isVisible = scale > 0.3 && Math.abs(x) < 200 && Math.abs(y) < 200;
            
            if (!isVisible) return null;

            return (
              <div 
                className="absolute telstp-node cursor-pointer"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  zIndex: 1000,
                }}
              >
                {/* Pulsing central node */}
                <div className="relative">
                  <div className="w-6 h-6 rounded-full bg-gold-400 shadow-gold-glow animate-pulse" />
                  <div className="absolute -inset-2 rounded-full border-2 border-gold-300 animate-ping" />
                  <div className="absolute -inset-4 rounded-full border border-gold-200 animate-ping delay-300" />
                </div>
                
                {/* Arcs connecting to other nodes */}
                {markers.filter(m => m.id !== 'telstp-egypt').map(marker => {
                  const { x: mx, y: my } = project3D(marker.lat, marker.lng);
                  return (
                    <svg 
                      key={`arc-${marker.id}`}
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{ zIndex: -1 }}
                    >
                      <path 
                        d={`M${x + 50} ${y + 50} Q50 50 ${mx + 50} ${my + 50}`}
                        stroke={marker.color}
                        strokeWidth="1"
                        fill="none"
                        opacity="0.3"
                        className="animate-arc-pulse"
                      />
                    </svg>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Selected Marker Tooltip */}
      {selectedMarker && (
        <div className="absolute top-4 left-4 bg-stone-900/95 backdrop-blur-sm rounded-lg p-4 border border-gold-400 shadow-tooltip z-50">
          <div className="text-gold-400 font-bold text-lg">{selectedMarker.label}</div>
          <div className="text-stone-300 text-sm mt-1">{selectedMarker.description}</div>
          <button 
            className="mt-3 text-gold-400 hover:text-gold-300 text-sm"
            onClick={() => setSelectedMarker(null)}
          >
            Close
          </button>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-stone-400 text-sm">
        {language === 'ar' ? 'اسحب لتدوير الكرة الأرضية • انقر على العلامات' : 
         language === 'fr' ? 'Faites glisser pour tourner • Cliquez sur les marqueurs' :
         language === 'es' ? 'Arrastre para girar • Haga clic en los marcadores' :
         language === 'zh' ? '拖动旋转 • 点击标记' :
         language === 'ur' ? 'گول کرنے کے لئے کھینچیں • مارکرز پر کلک کریں' :
         'Drag to rotate • Click on markers'}
      </div>
    </div>
  );
};

export default InteractiveGlobe;
