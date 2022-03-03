import { Injectable } from '@angular/core';

import { Size } from './size';
import {of, from, Observable} from 'rxjs';
import { Position } from './position';
import { Figure } from './figure';

@Injectable({
  providedIn: 'root'
})
export class FigurePositionerService {

  private direction = [Direction.Right, Direction.Down, Direction.Left, Direction.Up];
  private actualDirection=0;
  private actualPosition: Position={x:0, y:0}


  constructor() {
  }

  position(size:Size, figure:Figure):Observable<Position>{
    return new Observable(observer=>{
    let maxCounter:number = Math.min(size.height, size.width)/figure.size;
    let maxCubes: number= Math.floor(size.height/figure.size)*Math.floor(size.width/figure.size);
    this.findCenter(maxCubes, size, figure.size);
    let actualCubes=1;
    for (let counter = 1; counter <= maxCounter; counter++) {
      for (let d = 0; d < 2; d++) {
        let localDirection=this.cycleDirection();
        for (let mov = 0; mov < counter; mov++) {
          observer.next(this.actualPosition);
          this.changeDirection(localDirection, figure.size);
          if (actualCubes>=maxCubes) {
            observer.complete();
            break;
          }
          actualCubes++;
      }
      }
    }
    observer.complete();
    });
  }

  private changeDirection(localDirection: Direction, space:number) {
    switch (localDirection) {
      case Direction.Right:
        this.actualPosition.x = this.actualPosition.x + space;
        break;
      case Direction.Down:
        this.actualPosition.y = this.actualPosition.y + space;
        break;
      case Direction.Left:
        this.actualPosition.x = this.actualPosition.x - space;
        break;
      case Direction.Up:
        this.actualPosition.y = this.actualPosition.y - space;
        break;
    }
  }

  private findCenter(maxCubes:number, size: Size, objectSize:number):void{
    if (maxCubes%2===0) {
      this.actualPosition.x=size.width/2;
      this.actualPosition.y=size.height/2-objectSize;
    }else{
      this.actualPosition.x=size.width/2-objectSize/2;
      this.actualPosition.y=size.height/2-objectSize/2;
    }

  }
  
  private cycleDirection():Direction{
    this.actualDirection++;
     if (this.actualDirection<4) {
       return this.direction[this.actualDirection];
     } else {
      this.actualDirection=0;
      return this.direction[this.actualDirection];
     }
   }
}

enum Direction {
  Up,
  Down,
  Left,
  Right,
}
