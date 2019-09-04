const entities: string[] = [
    'Milky Way',
    'Moon',
    'Stars',
    'Sun',
    'World'
];

export const randomHello = (): string => entities[Math.floor(Math.random() * entities.length)];
