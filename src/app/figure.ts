import { Position } from "./position";

export interface Figure {
    size:number;
    padding: number;
    draw(position:Position, canvas:CanvasRenderingContext2D, value?:string):void
}
