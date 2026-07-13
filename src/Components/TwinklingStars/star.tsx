export class TwinklingStar {
  x: number;
  y: number;
  radius: number;
  phase: number;
  pulseSpeed: number;
  minBrightness: number;
  maxBrightness: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.radius = Math.random() * 4 + 0.5;
    this.phase = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.005;
    this.minBrightness = Math.random() * 0.3;
    this.maxBrightness = Math.random() * 0.8 + 0.5;
  }

  update() {
    this.phase += this.pulseSpeed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const brightness =
      this.minBrightness +
      ((Math.sin(this.phase) + 1) / 2) * (this.maxBrightness - this.minBrightness);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
    ctx.shadowBlur = this.radius * 4;
    ctx.shadowColor = "white";
    ctx.fill();
  }
}