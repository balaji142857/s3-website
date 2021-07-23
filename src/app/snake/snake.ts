import { SnakeBoard } from './snake-board';
import { Position } from './position';




export class Snake {
  direction: 'up'|'down'|'left'|'right';

  constructor(public board: SnakeBoard, public size, public head: Position){
    this.size =1;
    this.direction = 'right';
  }

  move() {
    this.board.removeClass(this.head, 'snake-body');
    let nextHead = Object.create(this.head);
    switch (this.direction) {
      case 'up':
        nextHead.x -=1;
        break;
      case 'down':
        nextHead.x +=1;
        break;
      case 'left':
        nextHead.y -=1;
        break;
      case 'right':
        nextHead.y +=1;
        break;
    }
    if(this.board.isSamePosition(nextHead, this.board.fruitPosition)){
      this.head = this.grow(this.head, nextHead);
      this.board.placeFruit();
      this.board.score+=10*this.board.speed;
    } else {
      this.head.x = nextHead.x;
      this.head.y = nextHead.y;
    }
    this.updateSnakeBody(this.head);
    this.board.setClass(this.head, 'snake-body');
    if(!this.isWithinBounds(this.head, this.board)){
      this.board.gameOver();
      return;
    }
  }

  updateSnakeBody(pos: Position){
    if(!pos){
      return;
    }
    let next = pos.next;
    while(next) {
      if(pos.x > next.x){
        next.x++;
      } else if(pos.x < next.x) {
        next.x--;
      } else if(pos.y > next.y) {
        next.y++;
      } else if(pos.y < next.y) {
        next.y--;
      }
      pos = next;
      next = next.next
    }
  }

  isWithinBounds(head: Position, board:SnakeBoard) {
    return head.x >=0 && head.y >= 0 &&  head.x < board.rowCount && head.y < board.colCount;
  }

  grow(current: Position, next: Position) {
    console.log('growing snake',current, next);
    next.next = Object.create(current);
    return next;
  }

}
