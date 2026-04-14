import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, Html, Line } from "@react-three/drei";
import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const EARTH_TEXTURE_URL = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";

const CAIRO_HUB = { name: "TELSTP Cairo HQ", lat: 30.0444, lon: 31.2357, color: "#D4AF37", description: "Central nervous operating system and global headquarters." };

function getVector3(lat: number, lon: number, radius: number = 2.02) {
  if (typeof lat !== 'number' || typeof lon !== 'number') return new THREE.Vector3(0, 0, 0);
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function ConnectionLine({ start, end, color }: { start: THREE.Vector3; end: THREE.Vector3; color: string }) {
  const points = useMemo(() => {
    const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(2.5);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    return curve.getPoints(50);
  }, [start, end]);

  return <Line points={points} color={color} lineWidth={0.5} transparent opacity={0.3} />;
}

function Earth({ hubs, onSelectHub }: { hubs: any[]; onSelectHub: (hub: any) => void }) {
  const earthRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [error, setError] = useState(false);
  const cairoPos = useMemo(() => getVector3(CAIRO_HUB.lat, CAIRO_HUB.lon), []);

  useEffect(() => {
    textureLoader.load(
      EARTH_TEXTURE_URL,
      (tex) => setTexture(tex),
      undefined,
      () => setError(true)
    );
  }, []);

  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
          map={texture} 
          color={(!texture || error) ? "#1a254d" : "white"}
          roughness={0.8} 
          metalness={0.2} 
        />
        
        {/* Hub Markers & Connections - Now children of the rotating mesh */}
        {hubs.map((hub, i) => {
          const hubPos = getVector3(hub.lat, hub.lon);
          const isCairo = hub.name.includes("Cairo") || hub.name.includes("TELSTP");
          
          return (
            <group key={i}>
              <HubMarker 
                hub={hub} 
                position={hubPos} 
                onClick={() => onSelectHub(hub)} 
              />
              {!isCairo && (
                <ConnectionLine start={cairoPos} end={hubPos} color={hub.color} />
              )}
            </group>
          );
        })}
      </mesh>
      
      <Sphere args={[2.05, 64, 64]}>
        <meshBasicMaterial color="#4aa8ff" transparent opacity={0.05} side={THREE.BackSide} />
      </Sphere>
    </group>
  );
}

function HubMarker({ hub, position, onClick }: { hub: any; position: THREE.Vector3; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group 
      position={position} 
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }} 
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <mesh>
        <sphereGeometry args={[hovered ? 0.06 : 0.04, 16, 16]} />
        <meshBasicMaterial color={hub.color} />
      </mesh>
      <mesh>
        <sphereGeometry args={[hovered ? 0.12 : 0.08, 16, 16]} />
        <meshBasicMaterial color={hub.color} transparent opacity={hovered ? 0.6 : 0.3} />
      </mesh>
      {hovered && (
        <Html distanceFactor={10} zIndexRange={[100, 0]} portal={undefined}>
          <div className="bg-[#0A0E1A] border-2 border-[#D4AF37] p-3 rounded-xl backdrop-blur-xl shadow-2xl shadow-gold/20 min-w-[150px] animate-in fade-in zoom-in duration-200">
            <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-1">{hub.name}</p>
            <p className="text-blue-200/60 text-[10px] leading-tight">{hub.description}</p>
            <div className="mt-2 flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] text-green-500/80 font-bold uppercase tracking-tighter">Live Node</span>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

const DEMO_HUBS = [
  CAIRO_HUB,
  { name: "MedCity London", lat: 51.5074, lon: -0.1278, color: "#0088ff", description: "Leading European life science cluster." },
  { name: "Boston BioHub", lat: 42.3601, lon: -71.0589, color: "#ffaa00", description: "World-class research and innovation center." },
  { name: "Singapore Biopolis", lat: 1.3017, lon: 103.7912, color: "#ff44ff", description: "Asia's premier biomedical sciences hub." },
  { name: "San Francisco Mission Bay", lat: 37.7749, lon: -122.4194, color: "#00ff88", description: "Global leader in biotechnology." },
  { name: "Zurich Life Science", lat: 47.3769, lon: 8.5417, color: "#ff4444", description: "Precision medicine and research excellence." },
  { name: "Tokyo Bio-District", lat: 35.6762, lon: 139.6503, color: "#8844ff", description: "Advanced pharmaceutical and medical tech." },
  { name: "Berlin Health Capital", lat: 52.5200, lon: 13.4050, color: "#00ffff", description: "Digital health and innovation hub." },
  { name: "Paris Biocluster", lat: 48.8566, lon: 2.3522, color: "#ff8800", description: "Strategic research and development center." },
  { name: "Shanghai Zhangjiang", lat: 31.2304, lon: 121.4737, color: "#ff0088", description: "High-tech park specializing in life sciences." },
  { name: "Seoul Bio-Hub", lat: 37.5665, lon: 126.9780, color: "#44ff88", description: "Next-generation biomedical research." },
  { name: "Sydney Bio-Innovation", lat: -33.8688, lon: 151.2093, color: "#88ff44", description: "Southern hemisphere's leading research hub." },
  { name: "Toronto MaRS Discovery", lat: 43.6532, lon: -79.3832, color: "#4488ff", description: "Urban innovation hub for health and tech." },
  { name: "Munich Bio-Region", lat: 48.1351, lon: 11.5820, color: "#ffaa44", description: "Biotechnology and pharmaceutical cluster." },
  { name: "Stockholm-Uppsala Life Science", lat: 59.3293, lon: 18.0686, color: "#44ffaa", description: "Collaborative research and development." },
  { name: "Barcelona Bio-Cluster", lat: 41.3851, lon: 2.1734, color: "#aa44ff", description: "Biomedical research and health innovation." },
  { name: "Hyderabad Genome Valley", lat: 17.3850, lon: 78.4867, color: "#ff44aa", description: "India's first organized life sciences cluster." },
  { name: "Cape Town Bio-Innovation", lat: -33.9249, lon: 18.4241, color: "#aaff44", description: "African hub for health and biotech." },
  { name: "Sao Paulo Bio-Tech", lat: -23.5505, lon: -46.6333, color: "#44aaff", description: "South American leader in life sciences." },
  { name: "Dubai Science Park", lat: 25.2048, lon: 55.2708, color: "#D4AF37", description: "Strategic science and research community." }
];

export default function Globe() {
  const [selectedHub, setSelectedHub] = useState<any>(null);

  useEffect(() => {
    console.log("GLOBE COMPONENT MOUNTED - INITIALIZING 3D ASSETS");
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] relative bg-[#05070F] rounded-2xl overflow-hidden border border-[#1b254d]">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center bg-[#05070F]">
          <div className="text-[#D4AF37] font-mono text-xs animate-pulse">INITIALIZING GLOBAL NETWORK...</div>
        </div>
      }>
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 45 }} 
          gl={{ antialias: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.setClearColor('#05070F');
          }}
        >
          <ambientLight intensity={2.5} />
          <pointLight position={[10, 10, 10]} intensity={4} />
          <pointLight position={[-10, -10, -10]} intensity={2} color="#4aa8ff" />
          <spotLight position={[0, 15, 0]} intensity={2} angle={0.4} penumbra={1} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Stars radius={300} depth={60} count={5000} factor={7} fade />
          <Earth hubs={DEMO_HUBS} onSelectHub={setSelectedHub} />
          <OrbitControls enableZoom={true} enablePan={false} minDistance={2.5} maxDistance={10} />
        </Canvas>
      </Suspense>

      {/* UI Overlays */}
      <div className="absolute top-4 left-4 pointer-events-none">
        <h3 className="text-[#D4AF37] font-bold text-lg">Global Hub Network</h3>
        <p className="text-blue-200/60 text-xs">Interactive 3D Visualization managed by Hayah</p>
      </div>

      {selectedHub && (
        <div className="absolute bottom-4 left-4 right-4 md:right-auto md:w-80 bg-[#0A0E1A]/95 border border-[#D4AF37]/30 p-4 rounded-xl backdrop-blur-xl animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-[#D4AF37] font-bold text-sm uppercase tracking-wider">{selectedHub.name}</h4>
            <button onClick={() => setSelectedHub(null)} className="text-blue-200/40 hover:text-white transition-colors">✕</button>
          </div>
          <p className="text-blue-200/80 text-xs leading-relaxed mb-3">{selectedHub.description}</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: selectedHub.color }} />
            <span className="text-[10px] text-blue-200/40 uppercase font-bold tracking-widest">Active Connection</span>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 pointer-events-none">
        <p className="text-[10px] text-blue-200/20 uppercase tracking-widest">20 Major Research Parks Connected</p>
      </div>
    </div>
  );
}
