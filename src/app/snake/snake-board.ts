import { Snake } from './snake';
import { Position } from './position';



export class SnakeBoard {
  snake: Snake;
  isGameInProgress: boolean;
  interval;
  keyListener;
  fruitPosition;
  score = 0;

  allowedDirections = {
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
  };

  constructor(public rowCount, public colCount, public speed) {
    this.snake = new Snake(this, 1, {x: 0 ,y:0});
    this.startGame();
  }

  isSamePosition(pos1, pos2){
    if (!pos1 || !pos2){
      return false;
    }
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  paintSnake(pos: Position){
    do {
      this.paint(pos, 'snake-head');
      pos = pos.next;
    } while(pos)
  }

  startGame(){
    this.isGameInProgress = true;
    this.placeFruit();
    this.interval = setInterval(() => this.snake.move(), this.speed);

    this.keyListener = window.addEventListener('keydown', event => {
      let dir = this.allowedDirections[event.key];
      if(dir){
        this.snake.direction = dir;
        event.stopPropagation();
        event.preventDefault();
      }
    });
  }

  gameOver() {
    this.isGameInProgress = false;
    clearInterval(this.interval);
    window.removeEventListener('keydown',this.keyListener);
  }

  paint(pos: Position, clazz: string){
    const elem = document.getElementById(pos.x+''+pos.y);
    if(elem){
      elem.setAttribute('class',clazz);
    }
  }

  placeFruit(){
    do{
      this.fruitPosition = this.getRandomPosition();
    } while(this.isOverlapping(this.snake, this.fruitPosition))
    this.paint(this.fruitPosition,'fruit');
    console.log('fruit placed at',this.fruitPosition);
  }

  getRandomPosition(){
    return {
      x: Math.floor(Math.random()*this.rowCount),
      y: Math.floor(Math.random()*this.colCount)
    }
  }

  isOverlapping(snake: Snake, pos: Position){
    let node = snake.head;
    while(node != null){
      if(this.isSamePosition(node, pos)){
        return true;
      }
      node=  node.next;
    }
    return false;
  }

}
