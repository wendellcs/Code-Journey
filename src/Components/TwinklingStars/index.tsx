import { useEffect, useRef } from "react";
import { TwinklingStar } from './star';

export function TwinklingStars() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<TwinklingStar[]>([]);
    const frameIdRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        function initStars() {
            if (!canvas) return;
            const qty = 20;
            starsRef.current = Array.from(
                { length: qty },
                () => new TwinklingStar(canvas.width, canvas.height)
            );
        }

        function resizeCanvas() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        }

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            starsRef.current.forEach((star) => {
                star.update();
                star.draw(ctx);
            });

            frameIdRef.current = requestAnimationFrame(animate);
        }

        resizeCanvas();
        animate();

        window.addEventListener("resize", resizeCanvas);
        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(frameIdRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0"
        />
    );
}