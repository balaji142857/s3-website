import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { SnakeComponent } from './snake.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [SnakeComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule
  ],
  exports: [SnakeComponent]
})
export class SnakeModule { }
