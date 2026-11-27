import LogoBody from './LogoBody';
import LogoFrame from './LogoFrame';

export default function Logo() {
  return (
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="logo-title logo-desc">
      <title id="logo-title">Armin Supermarket Logo</title>
      <desc id="logo-desc">{"\n              A glossy green shopping cart logo with a golden check mark.\n          "}</desc>
          <defs>
            <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9AF3BA" />
              <stop offset="45%" stopColor="#45C985" />
              <stop offset="100%" stopColor="#07965C" />
            </linearGradient>
            <linearGradient id="green-highlight" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C5FFE0" />
              <stop offset="35%" stopColor="#68D99B" />
              <stop offset="100%" stopColor="#0B9D60" />
            </linearGradient>
            <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE58A" />
              <stop offset="35%" stopColor="#FFC83D" />
              <stop offset="70%" stopColor="#F6A900" />
              <stop offset="100%" stopColor="#D88A00" />
            </linearGradient>
            <linearGradient id="white-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor="#F5F7F2" />
              <stop offset="100%" stopColor="#DDE4DB" />
            </linearGradient>
            <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="7" stdDeviation="7" floodColor="#000000" floodOpacity="0.28" /></filter>
            <filter id="soft-shadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.22" /></filter>
          </defs>
      <LogoBody />
      <LogoFrame />
    </svg>
  );
}