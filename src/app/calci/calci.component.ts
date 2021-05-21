import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calci',
  templateUrl: './calci.component.html',
  styleUrls: ['./calci.component.scss']
})
export class CalciComponent implements OnInit {


  stack = [];
  keyListener;
  operators = ['+','-','*','/'];
  digits = [1,2,3,4,5,6,7,8,9,0];
  currNum = '';
  result;

  ngOnInit(): void {
    this.keyListener = window.addEventListener('keydown', event => {
      if(!isNaN(<any>event.key)){
        this.handleButtonClick(event.code);
      } else if(this.operators.indexOf(event.key) > -1) {
        this.handleButtonClick('op'+event.key);
      } else if('=' === event.key|| 'Enter'===event.code) {
        this.handleButtonClick('equal');
      } else if('Escape' === event.code) {
        this.reset();
      } else if('Backspace' === event.code) {
        if(this.currNum && this.currNum.length) {
          this.currNum = this.currNum.substring(0, this.currNum.length -1);
        }
      } else if('Period' === event.code) {
        this.handleDecimal();
      } else {
        console.log('unknown event', event.key, event.code);
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this.keyListener);
  }

  handleButtonClick(id) {
    if(id && document.getElementById(id)) {
      document.getElementById(id).click();
    }
  }

  considerDigit(digit) {
    this.clearResult();
    this.currNum += ''+digit;
  }

  handleDecimal(){
    this.clearResult();
    if(this.currNum && this.currNum.toString().indexOf('.') > -1) {
      return;
    } else {
      this.currNum +='.';
    }
  }

  process(op){
    this.stack.push(this.currNum);
    this.stack.push(op);
    this.currNum = '';
  }

  handleResult() {
    if(this.currNum){
      this.stack.push(this.currNum);
    }
    let expr ='';
    for(let i=0; i<this.stack.length;i++) {
      expr+=this.stack[i];
    }
    this.result = eval(expr);
    this.currNum='';
  }

  reset() {
    this.stack = [];
    this.currNum ='';
    this.clearResult();
  }

  clearResult(){
    this.result = null;
  }

}
