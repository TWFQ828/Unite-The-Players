export const COLORS = {
  deepBlue: '#003087',
  psBlue: '#003791',
  psCyan: '#00f2ff',
  psPurple: '#bc13fe',
  psTriangle: '#00ac9f',
  psCircle: '#f05023',
  psCross: '#5757f7',
  psSquare: '#de3997',
  darkBg: '#00011a',
};

export const CHARACTERS = [
  {
    id: 'kratos',
    name: 'Kratos',
    title: 'DE TANK',
    role: 'Kracht & Verdediging',
    description: 'Sloop obstakels, bescherm je team en voer krachtige melee-aanvallen uit.',
    color: '#e81c24',
    stats: { strength: 95, defense: 90, speed: 40 },
    glb: '/GLBS/Kratos.glb',
  },
  {
    id: 'ratchet',
    name: 'Ratchet',
    title: 'DE GADGET-EXPERT',
    role: 'Technologie & Strategie',
    description: 'Hack systemen, gebruik inventieve gadgets en los technologische puzzels op.',
    color: '#f9b233',
    stats: { strength: 50, defense: 60, speed: 80 },
    glb: '/GLBS/Ratchet.glb',
  },
  {
    id: 'astro',
    name: 'Astro',
    title: 'DE EXPLORER',
    role: 'Snelheid & Collectibles',
    description: 'Vind verborgen items, activeer verre checkpoints en scan voor zwakke plekken.',
    color: '#00aeef',
    stats: { strength: 30, defense: 40, speed: 95 },
    image: '/Images/Astro.png',
  },
];

export const REWARDS = [
  { id: 1, title: '€20 PS Store Tegoed', type: 'Digital', image: '/Images/210-2105425_free-psn-cards-playstation-psn-playstation-store-gift.png' },
  { id: 2, title: '€50 PS Store Tegoed', type: 'Digital', image: '/Images/210-2105425_free-psn-cards-playstation-psn-playstation-store-gift.png' },
  { id: 3, title: '€75 PS Store Tegoed', type: 'Digital', image: '/Images/210-2105425_free-psn-cards-playstation-psn-playstation-store-gift.png' },
  { id: 4, title: '€100 PS Store Tegoed', type: 'Digital', image: '/Images/210-2105425_free-psn-cards-playstation-psn-playstation-store-gift.png' },
  { id: 5, title: 'Exclusive Skins', type: 'In-game', icon: 'Gamepad2' },
  { id: 6, title: 'Physical Merch', type: 'Physical', icon: 'Shirt' },
];
