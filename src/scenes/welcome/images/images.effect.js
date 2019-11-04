import seals from './seals.jpg';
import dog from './dog.jpg';
import snail from './snail.jpg';
import raccoon from './raccoon.jpg';
import frog from './frog.jpg';
import hamster from './hamster.jpg';
import squirrel from './squirrel.jpg';

const images = [
  {
    source: seals,
    name: 'Neail Cooper',
    username: '@neilcooper',
  },
  {
    source: dog,
    name: 'Neail Cooper',
    username: '@neilcooper',
  },
  {
    source: snail,
    name: 'bobotaks prasetya',
    username: '@bobotaks',
  },
  {
    source: raccoon,
    name: 'Gary Bendig',
    username: '@kris_ricepees',
  },
  {
    source: frog,
    name: 'Gary Bendig',
    username: '@kris_ricepees',
  },
  {
    source: hamster,
    name: 'Ricky Kharawala',
    username: '@sweetmangostudios',
  },
  {
    source: squirrel,
    name: 'Shane Young',
    username: '@shane_young',
  },
];

export default function useImage(graphId) {
  const hashCode = getHashCode(graphId);
  return images[Math.abs(hashCode) % images.length];
}

function getHashCode(string) {
  if (!string) {
    return 0;
  }

  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    const chr = string.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }

  return hash;
}
