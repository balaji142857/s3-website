import { Component, OnInit, AfterViewInit } from '@angular/core';
import { analyzeFileForInjectables } from '@angular/compiler';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.scss']
})
export class SudokuComponent implements AfterViewInit {

  rows = [...Array(9).keys()];
  cols = [...Array(9).keys()];
  colors = ['khaki','olivedrab','lavendar','yellow','peru','sandybrown','white','silver','wheat']
  currentState: any[][];
  static readonly maxPossibleValues = [1,2,3,4,5,6,7,8,9];

  ngAfterViewInit(): void {
    this.setup();
  }

  reset() {
    this.setup();
    document.getElementById('myConsole').textContent='';
  }

  setup() {
    this.initialize();
    this.colorize();
  }

  colorize() {
    const border = '1px solid black';
    for(let i=0; i<9;i++){
      document.getElementById('span_0' + i).style.borderTop = border;
      document.getElementById('span_' + i + 0).style.borderLeft = border;
      document.getElementById('span_' + i + 8).style.borderRight = border;
      document.getElementById('span_8' + i).style.borderBottom = border;
      document.getElementById('span_2' + i).style.borderBottom = border;
      document.getElementById('span_5' + i).style.borderBottom = border;
      document.getElementById('span_' + i + 2).style.borderRight = border;
      document.getElementById('span_' + i + 5).style.borderRight = border;
    }

    const colorClone = JSON.parse(JSON.stringify(this.colors));
    for(let i =0; i < 9;i++) {
      this.colorBox(i, colorClone.splice(Math.floor(Math.random() * colorClone.length), 1)[0]);
    }
  }

  colorBox(boxNum, color) {
    if(boxNum === 0) {
      this.colorCells(0,2,0,2, color);
    } else if (boxNum === 1) {
      this.colorCells(0,2,3,5, color);
    } else if (boxNum === 2) {
      this.colorCells(0,2,6,8, color);
    } else if (boxNum === 3) {
      this.colorCells(3,5,0,2, color);
    } else if (boxNum === 4) {
      this.colorCells(3,5,3,5, color);
    } else if (boxNum === 5) {
      this.colorCells(3,5,6,8, color);
    } else if (boxNum === 6) {
      this.colorCells(6,8,0,2, color);
    } else if (boxNum === 7) {
      this.colorCells(6, 8, 3, 5, color);
    } else {
      this.colorCells(6,8,6,8,color);
    }
  }

  colorCells(rowStart, rowEnd, colStart, colEnd, color){
    for(let row = rowStart; row<=rowEnd;row++){
      for(let col = colStart; col<=colEnd;col++){
        document.getElementById('span_'+row+col).style.backgroundColor = color;
      }
    }
  }

  initialize(){
    this.currentState = [];
    for(let i =0;i<9;i++){
      this.currentState.push([],[],[],[],[],[],[],[],[]);
      for(let j=0;j<9;j++){
        this.currentState[i][j]=this.getDefaultCellValue();
        this.setNodeValue(i,j,null);
      }
    }
  }

  getDefaultCellValue() {
    return {
      possibleValues: JSON.parse(JSON.stringify(SudokuComponent.maxPossibleValues)),
      value: null
    }
  }

  solve() {
    //TODO
    for(let i=0;i<10;i++) {
      this.test();
    }
  }

  test() {
    for(let i =0;i<9;i++){
      for(let j=0;j<9;j++){
        const currentNodeValue = this.getNodeValue(i,j);
        if(currentNodeValue) {
          this.currentState[i][j].value = currentNodeValue;
          this.currentState[i][j].possibleValues = [];
          this.handleChange(i, j, currentNodeValue);
        }
      }
    }
  }

  handleChange(row, column, value) {
    this.updateRow(row, value);
    this.updateColumn(column, value);
    this.updateBox(row, column, value);
  }

  setNodeValue(row, col, val){
    (<HTMLInputElement>document.getElementById(row+''+col)).value = val;
  }

  updateRow(row, value)  {
    for(let i=0;i<this.cols.length;i++){
      const index = this.currentState[row][i].possibleValues.indexOf(value);
      if(index > -1) {
        this.currentState[row][i].possibleValues.splice(index,1);
        if (this.currentState[row][i].possibleValues.length === 1) {
          this.currentState[row][i].value = this.currentState[row][i].possibleValues.pop();
          this.setNodeValue(row, i, this.currentState[row][i].value);
          this.handleChange(row, i, this.currentState[row][i].value);
        }
      }
    }
  }

  updateColumn(column, value) {
    for(let i=0;i<this.rows.length;i++){
      const index = this.currentState[i][column].possibleValues.indexOf(value);
      if(index > -1) {
        this.currentState[i][column].possibleValues.splice(index,1);
        if(this.currentState[i][column].possibleValues.length === 1) {
          this.currentState[i][column].value = this.currentState[i][column].possibleValues.pop();
          this.setNodeValue(i,column,this.currentState[i][column].value);
          this.handleChange(i,column, this.currentState[i][column].value);
        }
      }
    }
  }

  updateBox(row, column, value){
    let rowStart = this.getLowerBound(row);
    let rowEnd = this.getUpperBound(row);
    let colStart = this.getLowerBound(column);
    let colEnd = this.getUpperBound(column);
    for(let i =rowStart;i<=rowEnd;i++){
      for(let j=colStart;j<=colEnd;j++){
        if(i== row && j == column) {
          continue;
        }
        const index = this.currentState[i][j].possibleValues.indexOf(value);
        if(index > -1){
          this.currentState[i][j].possibleValues.splice(index,1);
          if(this.currentState[i][j].possibleValues.length ===1){
            this.currentState[i][j].value = this.currentState[i][j].possibleValues.pop();
            this.setNodeValue(i,j,this.currentState[i][j].value);
            this.handleChange(i, j, this.currentState[i][j].value);
          }
        }
      }
    }
  }

  getNodeValue(row, col){
    const elem = document.getElementById(row+''+col);
    return !elem ? null : parseInt((<HTMLInputElement>elem).value);
  }

  getNodeValueById(id) {
    const elem = document.getElementById(id);
    return !elem ? null : parseInt((<HTMLInputElement>elem).value);
  }

  showPossibleValues(){
    const row = this.getNodeValueById('row');
    const col  = this.getNodeValueById('col');
    const values = this.currentState[row][col].possibleValues;
    document.getElementById('myConsole').textContent = 'possibleValues: '+values;
  }

  getLowerBound(value){
    if (value <= 2) {
      return 0
    } else if (value <=5){
      return 3;
    } else {
      return 6;
    }
  }

  getUpperBound(value) {
    if(value>=6){
      return 8;
    } else if (value >=3) {
      return 5;
    } else return 2;
  }



}
