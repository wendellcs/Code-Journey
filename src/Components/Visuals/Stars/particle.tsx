const colors:string[] = ['#623af2', '#FFF', '#7636f5', '#351e63', '#8b71bf'] 

export class Particle {
    x: number;
    y: number;
    size: number;
    vX: number;
    vY: number;
    color: string;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2 + 0.5;
        this.vX = Math.random() - 0.5;
        this.vY = Math.random() * -1 - 0.5;
        this.color = colors[Math.round(Math.random() * colors.length)];
    }

    update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vX;
        this.y += this.vY;

        if (this.y < 0) {
            this.y = canvasHeight;
            this.x = Math.random() * canvasWidth;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}