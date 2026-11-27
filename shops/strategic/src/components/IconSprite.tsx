import SpriteContact from './SpriteContact';
import SpriteShop from './SpriteShop';
import SpriteUi from './SpriteUi';

export default function IconSprite() {
  return (
    <svg className="sprite" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
      <SpriteShop />
      <SpriteContact />
      <SpriteUi />
    </svg>
  );
}