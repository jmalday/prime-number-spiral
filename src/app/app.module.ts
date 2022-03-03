import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FigurePositionerService } from './figure-positioner.service';
import { PrimeNumbersService } from './prime-numbers.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PrimeNumbersService, FigurePositionerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
