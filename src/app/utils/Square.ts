export class Square {
    constructor(private ctx: CanvasRenderingContext2D) {}
  
    draw(x: number, y: number, z: number) {
      this.ctx.fillRect(x, y, z, z);
    }
  }