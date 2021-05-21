import { Component, OnInit } from '@angular/core';
import { SnakeBoard } from './snake-board';
import { Snake } from './snake';

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent  {


  rowCount = 8
  colCount = 13;
  speed = 350;
  board: SnakeBoard;
  snake: Snake;

  rows: number[];
  cols: number[];

  startGame() {
    this.rows = [...Array(this.rowCount).keys()];
    this.cols = [...Array(this.colCount).keys()]
    this.board = new SnakeBoard(this.rowCount, this.colCount, this.speed);
  }

}
