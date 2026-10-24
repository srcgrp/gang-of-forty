import confetti from 'canvas-confetti';

const celebrateAddToCart = (): void => {
    confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.65 },
        disableForReducedMotion: false,
    });
};

export default celebrateAddToCart;