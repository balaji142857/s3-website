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
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
  };

  constructor(public rowCount, public colCount, public speed) {
    this.snake = new Snake(this, 1, { x: 0, y: 0 });
    window['snake'] = this.snake;
    this.startGame();
  }

  isSamePosition(pos1, pos2) {
    if (!pos1 || !pos2) {
      return false;
    }
    return pos1.x === pos2.x && pos1.y === pos2.y;
  }

  setClass(pos: Position, clazz: string) {
    // do {
      this.paintCell(pos, clazz);
      pos = pos.next;
    // } while (pos);
  }

  removeClass(pos: Position, clazz: string) {
    do {
      this.clearCell(pos, clazz);
      pos = pos.next;
    } while (pos);
  }

  startGame() {
    this.isGameInProgress = true;
    this.placeFruit();
    this.interval = setInterval(() => this.snake.move(), this.speed);

    this.keyListener = window.addEventListener('keydown', (event) => {
      let dir = this.allowedDirections[event.key];
      if (dir) {
        this.snake.direction = dir;
        event.stopPropagation();
        event.preventDefault();
      }
    });
  }



  gameOver() {
    this.isGameInProgress = false;
    clearInterval(this.interval);
    window.removeEventListener('keydown', this.keyListener);
  }

  pauseGame() {
    this.gameOver();
  }

  resumeGame() {
    this.startGame();
  }

  paintCell(pos: Position, clazz: string) {
    const elem = document.getElementById(pos.x + '' + pos.y);
    if (elem) {
      elem.classList.add(clazz);
    }
  }

  clearCell(pos: Position, clazz: string) {
    const elem = document.getElementById(pos.x + '' + pos.y);
    if (elem) {
      elem.classList.remove(clazz);
    }
  }

  placeFruit() {
    do {
      this.fruitPosition = this.getRandomPosition();
    } while (this.isOverlapping(this.snake, this.fruitPosition));
    this.paintCell(this.fruitPosition, 'fruit');
  }

  getRandomPosition() {
    return {
      x: Math.floor(Math.random() * this.rowCount),
      y: Math.floor(Math.random() * this.colCount),
    };
  }

  isOverlapping(snake: Snake, pos: Position) {
    let node = snake.head;
    while (node != null) {
      if (this.isSamePosition(node, pos)) {
        return true;
      }
      node = node.next;
    }
    return false;
  }
}
