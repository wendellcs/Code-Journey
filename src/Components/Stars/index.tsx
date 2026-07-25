import { useEffect, useRef } from "react"
import { Particle } from "./particle"

export const Stars = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const particlesRef = useRef<Particle[]>([])
    const frameIdRef = useRef<number>(0)

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        function initParticles() {
            if (!canvas) return;
            const qty = 30;
            particlesRef.current = Array.from(
                { length: qty },
                () => new Particle(canvas.width, canvas.height)
            );
        }

        function resizeCanvas() {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        function animateParticles() {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p) => {
                p.update(canvas.width, canvas.height);
                p.draw(ctx);
            });

            frameIdRef.current = requestAnimationFrame(animateParticles);
        }

        resizeCanvas();
        animateParticles();

        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(frameIdRef.current);
        };
    }, []);

    return (
        <canvas className="fixed top-0 left-0" ref={canvasRef}/>
    )
}