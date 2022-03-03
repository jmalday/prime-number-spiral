import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrimeNumbersService {
  private primeNumbers: Array<number> = [2];
  private lastIndex=2;
  constructor() { }

  isPrimeNumber(number:number):boolean{
    if (number>this.lastIndex) {
      for (let index = this.lastIndex; index <= number; index++) {
        if(!this.primeNumbers.some((element)=>index%element===0)){
          this.primeNumbers.push(index);
        }
      }
      this.lastIndex=number;
    }
      return this.primeNumbers.some((element)=>number===element);   
  }
}
