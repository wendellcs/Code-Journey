import { StreakStar } from "../../Visuals/StreakStar"
import { useEffect, useRef } from "react";

export function LoadingRocket() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<StreakStar[]>([]);
    const frameIdRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        function resizeCanvas() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const qty = 80;
            starsRef.current = Array.from({ length: qty }, () => new StreakStar(canvas.width, canvas.height));
        }

        function animate() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            starsRef.current.forEach((star) => {
                star.update(canvas.width);
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
        <div className="relative mx-auto top-full inset-0 flex items-center justify-center overflow-hidden z-50 w-full max-w-100 h-80 my-20 rounded-full translate">
            <canvas ref={canvasRef} className="absolute top-0 left-0" />

            <div className="relative flex flex-col items-center animate-rocket-float transform rotate-90 mb-10 animate-pulse">
                <svg width="70" height="90" viewBox="0 0 70 90" className="drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                    <ellipse cx="35" cy="37" rx="15" ry="30" fill="#e5e7eb" />
                    <circle cx="35" cy="30" r="6" fill="#a855f7" stroke="#7c3aed" strokeWidth="2" />
                    <path d="M21 20 Q35 -5 49 20 Z" fill="#a855f7" />
                    <path d="M21 50 L8 65 L21 62 Z" fill="#ec4899" />
                    <path d="M49 50 L62 65 L49 62 Z" fill="#ec4899" />
                </svg>

                <div className="w-4 h-10 -mt-2 rounded-b-full bg-linear-to-b from-yellow-300 via-orange-400 to-transparent animate-flame-flicker blur-[2px]" />
            </div>

            <p className="absolute bottom-16 text-white/80 text-sm tracking-widest animate-pulse">
                CARREGANDO...
            </p>
        </div>
    );
}