export class StreakStar {
    x: number;
    y: number;
    length: number;
    speed: number;
    opacity: number;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.length = Math.random() * 20 + 5;
        this.speed = Math.random() * 8 + 4;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    update(canvasWidth: number) {
        this.x -= this.speed;

        if (this.x < -this.length) {
            this.x = canvasWidth + this.length;
            this.y = Math.random() * window.innerHeight;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y);
        ctx.stroke();
    }
}