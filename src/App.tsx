import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls } from '@react-three/drei';
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { 
  Gamepad2, 
  MapPin, 
  Users, 
  Trophy, 
  CreditCard, 
  Shirt, 
  ChevronRight, 
  Menu, 
  X,
  Zap,
  Shield,
  Search,
  Cpu
} from 'lucide-react';
import { CHARACTERS, REWARDS } from './constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-ps-dark/95 backdrop-blur-md border-b border-ps-cyan/20 py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img 
            src="/Images/toppng.com-vector-free-download-playstation-it-is-a-playstation-playstation-logo-white-318x243.png" 
            alt="PS Logo" 
            className="w-12 h-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tighter text-white leading-none font-display uppercase">PLAYSTATION</span>
            <span className="text-[8px] text-ps-cyan font-black tracking-[0.4em] uppercase mt-1">Nederland</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Heatmap', 'Missie', 'Klassen', 'Beloningen'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold hover:text-ps-cyan transition-colors uppercase tracking-widest">
              {item}
            </a>
          ))}
          <button className="bg-ps-blue hover:bg-ps-blue/80 text-white px-6 py-2 rounded-full border border-ps-cyan glow-cyan transition-all flex items-center gap-2 text-sm font-black">
            <Users size={16} />
            INLOGGEN MET PSN
          </button>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-ps-dark border-b border-ps-cyan/20 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {['Heatmap', 'Missie', 'Klassen', 'Beloningen'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold">
                  {item}
                </a>
              ))}
              <button className="bg-ps-blue text-white px-6 py-3 rounded-full border border-ps-cyan glow-cyan text-center font-black">
                INLOGGEN MET PSN
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeatmapSection = () => {
  const [selectedSpot, setSelectedSpot] = useState<any>(null);
  const [isQuaking, setIsQuaking] = useState(false);
  const majorCities = [
    { name: 'Amsterdam', lat: 52.3676, lng: 4.9041 },
    { name: 'Rotterdam', lat: 51.9244, lng: 4.4777 },
    { name: 'Utrecht', lat: 52.0907, lng: 5.1214 },
    { name: 'Den Haag', lat: 52.0705, lng: 4.3007 },
    { name: 'Eindhoven', lat: 51.4416, lng: 5.4697 },
    { name: 'Groningen', lat: 53.2194, lng: 6.5665 },
    { name: 'Tilburg', lat: 51.5555, lng: 5.0913 },
    { name: 'Almere', lat: 52.3508, lng: 5.2647 },
    { name: 'Breda', lat: 51.5719, lng: 4.7683 },
    { name: 'Nijmegen', lat: 51.8126, lng: 5.8372 },
    { name: 'Enschede', lat: 52.2215, lng: 6.8937 },
    { name: 'Haarlem', lat: 52.3874, lng: 4.6462 },
    { name: 'Arnhem', lat: 51.9851, lng: 5.8987 },
    { name: 'Zwolle', lat: 52.5168, lng: 6.0830 },
    { name: 'Maastricht', lat: 50.8514, lng: 5.6910 },
  ];


  const hotspots = [
    { 
      name: 'De Dam', 
      city: 'Amsterdam', 
      lat: 52.3731,
      lng: 4.8922,
      activity: 92, 
      color: '#5757f7',
      boss: 'The Gilded Guardian',
      players: 142,
      classes: ['Astro', 'Kratos']
    },
    { 
      name: 'Lijnbaan', 
      city: 'Rotterdam', 
      lat: 51.9225,
      lng: 4.4792,
      activity: 78, 
      color: '#de3997',
      boss: 'Neon Nightshade',
      players: 89,
      classes: ['Ratchet', 'Astro']
    },
    { 
      name: 'Domplein', 
      city: 'Utrecht', 
      lat: 52.0907,
      lng: 5.1214,
      activity: 65, 
      color: '#00ac9f',
      boss: 'The Tower Titan',
      players: 56,
      classes: ['Kratos', 'Ratchet']
    }
  ];

  useEffect(() => {
    if (!selectedSpot) return;
    setIsQuaking(true);
    const timer = setTimeout(() => setIsQuaking(false), 750);
    return () => clearTimeout(timer);
  }, [selectedSpot]);

  return (
    <section id="heatmap" className="py-24 bg-gradient-to-b from-[#020b1f] via-[#020814] to-[#01040b] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3 w-full">
            <div className="inline-block px-4 py-1 rounded-full border border-white/15 bg-white/5 text-white text-[10px] font-bold tracking-[0.28em] uppercase mb-6">
              Live Command Center
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-5 font-display">
              LIVE <span className="text-ps-cyan">TACTICAL MAP</span>
            </h2>
            <p className="text-gray-300/90 mb-8 leading-relaxed text-sm md:text-base">
              Check in een oogopslag waar teams actief zijn. Elke hub geeft live drukte, actieve classes en boss-status weer.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                <div className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Active Hubs</div>
                <div className="text-2xl font-black text-white">03</div>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                <div className="text-[10px] text-white/60 uppercase tracking-widest mb-1">Online Spelers</div>
                <div className="text-2xl font-black text-ps-cyan">287</div>
              </div>
            </div>

            <div className="space-y-3">
              {hotspots.map((item) => (
                <div 
                  key={item.name} 
                  className={`p-4 rounded-2xl border cursor-pointer transition-all backdrop-blur-md ${
                    selectedSpot?.name === item.name
                      ? 'border-ps-cyan/50 bg-ps-cyan/10 shadow-[0_0_25px_rgba(0,242,255,0.22)]'
                      : 'border-white/10 bg-white/[0.03] hover:bg-white/[0.06]'
                  }`}
                  onClick={() => setSelectedSpot(item)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                      <span className="font-black text-sm uppercase text-white">{item.name}</span>
                      <span className="text-[10px] text-white/55 uppercase tracking-widest">{item.city}</span>
                    </div>
                    <span className="text-[10px] font-black text-white/70">{item.activity}% DRUKTE</span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.activity}%` }}
                      className="h-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {item.classes.map(c => (
                        <span key={c} className="text-[8px] px-1.5 py-0.5 rounded-full bg-white/10 text-white/85 font-bold">{c}</span>
                      ))}
                    </div>
                    <span className="text-[9px] font-black text-ps-cyan uppercase">Boss: {item.boss}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={`lg:w-2/3 relative w-full h-[420px] md:h-[620px] rounded-[28px] md:rounded-[36px] overflow-hidden border border-white/15 shadow-[0_20px_80px_rgba(0,0,0,0.55)] bg-[#02163d] ${isQuaking ? 'map-quake' : ''}`}>
            <MapContainer
              center={[52.1326, 5.2913]}
              zoom={7}
              minZoom={6}
              maxZoom={10}
              zoomControl={false}
              className="w-full h-full"
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
              />

              {majorCities.map((city) => (
                <CircleMarker
                  key={city.name}
                  center={[city.lat, city.lng]}
                  radius={1.5}
                  pathOptions={{ color: '#ffffff', fillColor: '#ffffff', fillOpacity: 0.95, weight: 1 }}
                >
                  <Tooltip direction="top" permanent offset={[0, -2]} className="map-label-white">
                    {city.name}
                  </Tooltip>
                </CircleMarker>
              ))}

              {hotspots.map((spot) => (
                <React.Fragment key={spot.name}>
                  {selectedSpot?.name === spot.name && (
                    <>
                      <CircleMarker
                        center={[spot.lat, spot.lng]}
                        radius={10}
                        pathOptions={{
                          color: spot.color,
                          fillColor: spot.color,
                          fillOpacity: 0.1,
                          weight: 2,
                          className: 'hotspot-quake-ring hotspot-quake-ring-1',
                        }}
                      />
                      <CircleMarker
                        center={[spot.lat, spot.lng]}
                        radius={18}
                        pathOptions={{
                          color: spot.color,
                          fillColor: spot.color,
                          fillOpacity: 0.06,
                          weight: 2,
                          className: 'hotspot-quake-ring hotspot-quake-ring-2',
                        }}
                      />
                      <CircleMarker
                        center={[spot.lat, spot.lng]}
                        radius={28}
                        pathOptions={{
                          color: spot.color,
                          fillColor: spot.color,
                          fillOpacity: 0.04,
                          weight: 2,
                          className: 'hotspot-quake-ring hotspot-quake-ring-3',
                        }}
                      />
                    </>
                  )}
                  <CircleMarker
                    center={[spot.lat, spot.lng]}
                    radius={3}
                    pathOptions={{
                      color: spot.color,
                      fillColor: spot.color,
                      fillOpacity: 1,
                      weight: selectedSpot?.name === spot.name ? 2 : 1,
                      className: selectedSpot?.name === spot.name ? 'hotspot-quake-core' : '',
                    }}
                    eventHandlers={{ click: () => setSelectedSpot(spot) }}
                  />
                </React.Fragment>
              ))}
            </MapContainer>

            {/* Popup Overlay */}
            <AnimatePresence>
              {selectedSpot && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="absolute bottom-10 right-10 glass-panel p-6 rounded-3xl border-ps-cyan/40 w-72 z-30"
                >
                  <button 
                    onClick={() => setSelectedSpot(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                  <div className="text-ps-cyan font-black text-2xl italic mb-1 uppercase font-display">{selectedSpot.name}</div>
                  <div className="text-white/70 font-bold text-sm mb-4">{selectedSpot.city}</div>
                  
                  <div className="space-y-3 border-t border-white/10 pt-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40 uppercase tracking-widest">BOSS</span>
                      <span className="font-black text-ps-purple">{selectedSpot.boss}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40 uppercase tracking-widest">SPELERS</span>
                      <span className="font-black text-white">{selectedSpot.players}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40 uppercase tracking-widest">CLASSES</span>
                      <span className="font-black text-white">{selectedSpot.classes.join(', ')}</span>
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-ps-cyan text-ps-dark font-black py-3 rounded-xl text-sm uppercase italic hover:bg-white transition-colors">
                    JOIN RAID
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>
      </div>
    </section>
  );
};


const MissionSection = () => {
  return (
    <section id="missie" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="glass-panel rounded-[40px] p-12 border-ps-purple/30 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3">
            <div className="relative">
              <div className="absolute -inset-4 bg-ps-cyan/20 blur-2xl rounded-full"></div>
              <img 
                src="https://picsum.photos/seed/taoufik/400/400" 
                alt="Taoufik & Asan" 
                className="relative rounded-full border-4 border-ps-cyan w-64 h-64 object-cover mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-4xl font-black italic mb-3 font-display"><span className="text-ps-cyan">UNITE THE PLAYERS</span>: HET DECREET VAN DE GILDEN</h2>
            <p className="text-sm uppercase tracking-[0.2em] text-ps-purple font-bold mb-4">Strijders van de Lage Landen, luister goed!</p>
            <p className="text-xl text-gray-300 mb-8 font-light italic leading-relaxed">
              "De tijd van het eenzame pad is voorbij. In deze schaduwen baant de solo-reiziger slechts de weg naar zijn eigen ondergang. Deze missie vraagt niet om een vluchtige overwinning, maar om een Legioen van Helden."
            </p>
            <p className="text-base text-gray-300/90 mb-8 leading-relaxed">
              "Breek de zegels van je isolement! In de Unite The Players AR Hunt smeed je allianties in het heetst van de strijd. Deel je wijsheid als een ware Scholar, bescherm de zwakken als een onverzettelijke Tank en sla toe als een onstuitbare eenheid. Alleen zij die zij aan zij staan, die hun bloed en strategie delen, zullen de poorten naar de ultieme glorie openen. Laat de echo van onze samenwerking de hemel splijten."
            </p>
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-ps-cyan font-black text-2xl">STRIJD SAMEN</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Smeed Allianties</span>
              </div>
              <div className="w-px h-12 bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-ps-purple font-black text-2xl">OVERWIN SAMEN</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">WORD LEGENDAIR</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MechanicsSection = () => {
  return (
    <section className="py-24 bg-ps-dark">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12">
          {[
            { icon: Search, title: 'SCAN', desc: 'Gebruik je smartphone om verborgen PlayStation-symbolen in de echte wereld te vinden.' },
            { icon: Zap, title: 'CAPTURE', desc: 'Vang de symbolen en verzamel energie voor je team om bosses te verzwakken.' },
            { icon: Trophy, title: 'REDEEM', desc: 'Wissel je verdiende trofeeën in voor echt PS Store tegoed en exclusieve gear.' }
          ].map((item, i) => (
            <div key={i} className="text-center group">
              <div className="w-20 h-20 mx-auto bg-ps-blue/20 rounded-3xl flex items-center justify-center mb-6 border border-ps-cyan/20 group-hover:border-ps-cyan transition-all">
                <item.icon className="text-ps-cyan" size={32} />
              </div>
              <h3 className="text-2xl font-black italic mb-4 font-display">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InfographicSection = () => {
  return (
    <section id="poster" className="py-24 bg-ps-dark relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black italic mb-4 font-display">DE KERNMECHANISMEN</h2>
          <p className="text-gray-400">Kies je klasse, vind je team en start de coöperatieve actie.</p>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.015, rotateX: 1.5, rotateY: -1.5 }}
          transition={{ type: 'spring', stiffness: 140, damping: 14 }}
          className="group glass-panel rounded-[32px] md:rounded-[40px] p-3 md:p-4 border-ps-cyan/30 overflow-hidden shadow-2xl relative max-w-5xl mx-auto"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,242,255,0.22),transparent_42%),radial-gradient(circle_at_80%_90%,rgba(188,19,254,0.18),transparent_42%)] opacity-80 group-hover:opacity-100 transition-opacity"></div>
          <div className="scanline-effect pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img 
            src="/Images/Game explained picture.png" 
            alt="Mechanics Infographic" 
            className="w-full h-auto rounded-[32px] relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </section>
  );
};

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
};

const ModelViewer = ({ url }: { url: string }) => {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.5}>
            <Model url={url} />
          </Stage>
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={2}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

const CharacterCard = ({ character }: { character: any, key?: any }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="relative group h-[600px] rounded-3xl overflow-hidden glass-panel border-ps-cyan/10 hover:border-ps-cyan/50 transition-all"
    >
      <div className="absolute inset-0">
        {character.glb ? (
          <ModelViewer url={character.glb} />
        ) : (
          <img 
            src={character.image} 
            alt={character.name} 
            className={`w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity ${character.crop || ''}`}
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ps-dark via-ps-dark/40 to-transparent pointer-events-none"></div>
      </div>

      <div className="absolute bottom-0 p-8 w-full">
        <div className="flex items-center gap-2 mb-2">
           {character.id === 'kratos' && <span className="text-ps-circle font-bold">○</span>}
           {character.id === 'ratchet' && <span className="text-ps-triangle font-bold">△</span>}
           {character.id === 'astro' && <span className="text-ps-cross font-bold">×</span>}
           <span className="text-xs font-black tracking-widest uppercase" style={{ color: character.color }}>{character.title}</span>
        </div>
              <h3 className="text-3xl font-black mb-2 italic font-display">{character.name}</h3>
        <p className="text-sm text-gray-300 mb-6">{character.description}</p>
        
        <div className="space-y-3">
          {Object.entries(character.stats).map(([stat, value]: [string, any]) => (
            <div key={stat}>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter mb-1">
                <span>{stat}</span>
                <span>{value}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${value}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="h-full"
                  style={{ backgroundColor: character.color }}
                />
              </div>
            </div>
          ))}
        </div>

        <button className="mt-8 w-full py-4 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-xs font-black tracking-widest uppercase">
          SELECTEER KLASSE
        </button>
      </div>
    </motion.div>
  );
};

const RewardsSection = () => {
  return (
    <section id="beloningen" className="py-24 bg-ps-blue/5">
      <div className="container mx-auto px-6">
        <div className="glass-panel rounded-[40px] p-12 border-ps-cyan/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-ps-cyan/10 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-ps-purple/10 blur-[100px] rounded-full"></div>

          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black mb-2 italic font-display">PSN VAULT & <span className="text-ps-cyan">REWARDS</span></h2>
              <p className="text-gray-400">Verzilver je verdiende trofeeën voor exclusieve PlayStation prijzen.</p>
            </div>
            <button className="bg-ps-blue px-8 py-4 rounded-full border border-ps-cyan glow-cyan font-black flex items-center gap-2">
              <Trophy size={20} />
              BEKIJK MIJN VAULT
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REWARDS.filter(r => r.image).map((reward) => (
              <motion.div 
                key={reward.id}
                whileHover={{ scale: 1.02 }}
                className="glass-panel p-4 rounded-3xl border-ps-cyan/10 text-center flex flex-col items-center group cursor-pointer"
              >
                <div className="aspect-[3/4] w-full mb-4 overflow-hidden rounded-2xl">
                  <img 
                    src={reward.image} 
                    alt={reward.title} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-[10px] font-black uppercase tracking-tighter text-ps-cyan mb-1">{reward.type}</div>
                <div className="text-sm font-black leading-tight">{reward.title}</div>
              </motion.div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {REWARDS.filter(r => !r.image).map((reward) => (
              <motion.div 
                key={reward.id}
                whileHover={{ y: -5 }}
                className="glass-panel p-6 rounded-2xl border-ps-cyan/10 text-center flex flex-col items-center group cursor-pointer"
              >
                <div className="w-10 h-10 mb-3 flex items-center justify-center text-ps-cyan group-hover:text-ps-purple transition-colors">
                  {reward.icon === 'Gamepad2' && <Gamepad2 size={32} />}
                  {reward.icon === 'Shirt' && <Shirt size={32} />}
                </div>
                <div className="text-[10px] font-black uppercase tracking-tighter text-gray-500 mb-1">{reward.type}</div>
                <div className="text-xs font-black leading-tight">{reward.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <img 
            src="/Images/toppng.com-vector-free-download-playstation-it-is-a-playstation-playstation-logo-white-318x243.png" 
            alt="PS Logo" 
            className="w-8 h-auto object-contain opacity-50"
            referrerPolicy="no-referrer"
          />
          <span className="text-lg font-bold tracking-tighter opacity-50 font-display">PLAYSTATION <span className="text-ps-cyan">AR</span></span>
        </div>
        
        <div className="flex gap-8 text-xs text-gray-500 uppercase tracking-widest font-bold">
          <a href="#" className="hover:text-ps-cyan">Privacy Policy</a>
          <a href="#" className="hover:text-ps-cyan">Terms of Service</a>
          <a href="#" className="hover:text-ps-cyan">Cookie Settings</a>
        </div>

        <div className="text-xs text-gray-600">
          © 2026 Unite The Players. Created by Taoufik & Asan.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const backgroundSymbols = [
    { char: '□', className: 'ps-symbol-square', sx: '-12vw', sy: '18vh', tx: '108vw', ty: '-34vh', dur: '11s', delay: '0s', size: '26px' },
    { char: '×', className: 'ps-symbol-cross', sx: '-8vw', sy: '62vh', tx: '112vw', ty: '-12vh', dur: '13s', delay: '1.3s', size: '28px' },
    { char: '○', className: 'ps-symbol-circle', sx: '-10vw', sy: '84vh', tx: '110vw', ty: '12vh', dur: '12.5s', delay: '3.1s', size: '24px' },
    { char: '△', className: 'ps-symbol-triangle', sx: '-14vw', sy: '34vh', tx: '109vw', ty: '-52vh', dur: '14s', delay: '2.2s', size: '30px' },
    { char: '□', className: 'ps-symbol-square', sx: '8vw', sy: '108vh', tx: '128vw', ty: '12vh', dur: '15s', delay: '4.4s', size: '20px' },
    { char: '×', className: 'ps-symbol-cross', sx: '14vw', sy: '102vh', tx: '122vw', ty: '2vh', dur: '10.8s', delay: '5.2s', size: '22px' },
    { char: '○', className: 'ps-symbol-circle', sx: '2vw', sy: '96vh', tx: '118vw', ty: '-18vh', dur: '13.8s', delay: '6s', size: '26px' },
    { char: '△', className: 'ps-symbol-triangle', sx: '-6vw', sy: '76vh', tx: '116vw', ty: '-30vh', dur: '12.2s', delay: '7.3s', size: '24px' },
  ];

  return (
    <div className="relative isolate min-h-screen bg-ps-dark text-white selection:bg-ps-cyan selection:text-ps-dark">
      <div className="ps-bg-symbols" aria-hidden="true">
        {backgroundSymbols.map((symbol, index) => (
          <span
            key={`${symbol.char}-${index}`}
            className={`ps-bg-symbol ${symbol.className}`}
            style={
              {
                '--sx': symbol.sx,
                '--sy': symbol.sy,
                '--tx': symbol.tx,
                '--ty': symbol.ty,
                '--dur': symbol.dur,
                '--delay': symbol.delay,
                '--size': symbol.size,
              } as React.CSSProperties
            }
          >
            {symbol.char}
          </span>
        ))}
      </div>

      <div className="relative z-10">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-gradient-to-b from-ps-dark/20 via-ps-dark/60 to-ps-dark"></div>
             <img 
               src="/Images/Gemini_Generated_Image_b4uagjb4uagjb4ua.png"
               alt="Hero Background" 
               className="w-full h-full object-cover opacity-40"
               referrerPolicy="no-referrer"
               onError={(event) => {
                 event.currentTarget.src = 'https://picsum.photos/seed/ps-hero/1920/1080?blur=2';
               }}
             />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-1 rounded-full border border-ps-cyan/30 bg-ps-cyan/10 text-ps-cyan text-[10px] font-bold tracking-[0.3em] uppercase mb-6">
                Nu Live in Nederland
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black italic mb-6 tracking-tighter leading-none font-display">
                UNITE THE <br />
                <span className="text-ps-cyan text-glow-cyan">PLAYERS</span>
              </h1>
              <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8 md:mb-10 font-light">
                De echte wereld is jouw nieuwe multiplayer-lobby. Start de AR Treasure Hunt en word een legende.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#poster" className="bg-ps-cyan text-ps-dark px-8 md:px-10 py-3 md:py-4 rounded-full font-black text-xs md:text-sm tracking-widest uppercase hover:scale-105 transition-transform glow-cyan inline-block">
                  DOWNLOAD DE APP
                </a>
                <button className="bg-transparent border border-white/20 hover:bg-white/5 px-8 md:px-10 py-3 md:py-4 rounded-full font-black text-xs md:text-sm tracking-widest uppercase transition-all">
                  BEKIJK TRAILER
                </button>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-ps-cyan opacity-50">
             <ChevronRight className="rotate-90" />
          </div>
        </section>

        <HeatmapSection />
        <MissionSection />
        <MechanicsSection />
        <InfographicSection />

        <section id="klassen" className="py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 italic font-display">THE LEGEND <span className="text-ps-cyan">TRIO</span></h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Kies je klasse en combineer krachten met andere spelers om legendarische bosses te verslaan.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {CHARACTERS.map((char) => (
                <CharacterCard key={char.id} character={char} />
              ))}
            </div>
          </div>
        </section>

        <MechanicsSection />
        <RewardsSection />
      </main>

      <Footer />
      </div>
    </div>
  );
}
