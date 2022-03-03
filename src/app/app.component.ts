import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FigurePositionerService } from './figure-positioner.service';
import { Position } from './position';
import { PrimeNumbersService } from './prime-numbers.service';
import { Square } from './utils/Square';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: ['canvas { border: 1px dashed orange }']
})

export class AppComponent implements OnInit {
  title = 'prime-number-spiral';
  @ViewChild('canvas', { static: true })


  canvas!: ElementRef<HTMLCanvasElement>;
  canvasSize = {
    width: 300,
    height: 300
  };
  ctx!: CanvasRenderingContext2D;
  delay = (ms: number) => new Promise(res => setTimeout(res, ms));
  figure = {
    size: 30,
    padding: 1,
    draw(position: Position, canvas: CanvasRenderingContext2D, actualCubes?: string) {
      canvas.fillStyle = "red";
      const square = new Square(canvas);
      square.draw(position.x + this.padding, position.y + this.padding, this.size-2*this.padding);
      if (actualCubes) {
        canvas.font = `${this.size/4}px Arial`;
        canvas.fillStyle = "black";
        canvas.textAlign = "center";
        canvas.fillText(actualCubes, position.x+this.size/2, position.y+(3*this.size/4));
      }
    }
  }

  primeNumberService:PrimeNumbersService;
  positioner: FigurePositionerService;

  ngOnInit(): void {
    this.ctx=this.canvas.nativeElement.getContext('2d')!;
  }

  constructor(positioner: FigurePositionerService, primeNumberService:PrimeNumbersService) {
    this.positioner = positioner;
    this.primeNumberService=primeNumberService;
  }


  async animate(): Promise<void> {
    let actualCubes: number = 1;

    this.positioner.position(this.canvasSize, this.figure)
      .subscribe(pos => {
        // console.log({"actualCubes":actualCubes, "pos":{...pos}});
        if (this.primeNumberService.isPrimeNumber(actualCubes)) {
          this.figure.draw(pos, this.ctx, actualCubes.toString());
        }
        actualCubes++;
      });
  }
  




}



