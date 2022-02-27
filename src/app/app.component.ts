import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  screen={
    width:600,
    height:600
  };
  figureSize=8;
  figureSpace=10;
  figureMargin:number=0;
  actualPosition={ x:0, y:0};
  primeNumbers:Array<number>=[];
  direction = [Direction.Right, Direction.Down, Direction.Left, Direction.Up];
  actualDirection=0;
  ctx!: CanvasRenderingContext2D;
  delay = (ms:number) => new Promise(res => setTimeout(res, ms));

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.figureMargin=this.getMargin(this.figureSize, this.figureSpace);
  }
  
  async animate(): Promise<void> {
    this.ctx.fillStyle = 'red';
    const square = new Square(this.ctx);
    this.findCenter();
    let maxCounter:number = Math.min(this.screen.height, this.screen.width)/this.figureSpace;
    let maxCubes: number= Math.floor(this.screen.height/this.figureSpace)*Math.floor(this.screen.width/this.figureSpace);
    let complete:boolean=false;
    this.primeNumbersCalculator(maxCubes).then((_)=>{
      console.log("Devolviendo la promesa")
      complete=true});
    let actualCubes: number =1;
    for (let counter = 1; counter <= maxCounter; counter++) {
      for (let d = 0; d < 2; d++) {
        let localDirection=this.cycleDirection();
        for (let mov = 0; mov < counter; mov++) {
        await this.delay(1);
        this.changeDirection(localDirection);
        if (maxCubes<=actualCubes) {
          console.log("Completado");
          return;
        }else{
          if (actualCubes>this.primeNumbers[this.primeNumbers.length-1] && !complete) {
            console.log("Entrando Delay");
            await this.delay(200);
            console.log("Saliendo Delay");
          }
          if(this.primeNumbers.includes(actualCubes)){
            square.draw(this.actualPosition.x+this.figureMargin, this.actualPosition.y+this.figureMargin, this.figureSize);
          }
          actualCubes++;
        }
      }
      }
      
    }

  }

  async primeNumbersCalculator(toNumber:number):Promise<void>{
    for (let index = 2; index <= toNumber; index++) {
      if(!this.primeNumbers.some((element)=>index%element===0)){
        console.log(index);
        this.primeNumbers.push(index);
      }
    }
  }

  private changeDirection(localDirection: Direction) {
    switch (localDirection) {
      case Direction.Right:
        this.actualPosition.x = this.actualPosition.x + 10;
        break;
      case Direction.Down:
        this.actualPosition.y = this.actualPosition.y + 10;
        break;
      case Direction.Left:
        this.actualPosition.x = this.actualPosition.x - 10;
        break;
      case Direction.Up:
        this.actualPosition.y = this.actualPosition.y - 10;
        break;
    }
  }

  findCenter():void{
    this.actualPosition.x=this.screen.width/2;
    this.actualPosition.y=this.screen.height/2-this.figureSpace;
  }
  
   cycleDirection():Direction{
    this.actualDirection++;
     if (this.actualDirection<4) {
       return this.direction[this.actualDirection];
     } else {
      this.actualDirection=0;
      return this.direction[this.actualDirection];
     }
   }

   getMargin(figureSize:number, figureSpace:number):number{
    return (figureSpace-figureSize)/2;
   }
   
}

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

