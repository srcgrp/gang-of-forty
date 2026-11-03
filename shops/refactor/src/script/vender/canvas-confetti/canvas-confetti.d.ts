declare module 'canvas-confetti' {
    type ConfettiOptions = {
        particleCount?: number;
        spread?: number;
        origin?: { x?: number; y?: number };
        disableForReducedMotion?: boolean;
    };

    type ConfettiFunction = (options?: ConfettiOptions) => Promise<null>;

    const confetti: ConfettiFunction;
    export default confetti;
}
