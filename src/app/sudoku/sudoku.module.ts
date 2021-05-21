import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { SudokuComponent } from './sudoku.component';



@NgModule({
  declarations: [SudokuComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  exports: [SudokuComponent]
})
export class SudokuModule { }
