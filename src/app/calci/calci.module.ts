import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CalciComponent } from './calci.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [CalciComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  exports:[CalciComponent]
})
export class CalciModule { }
