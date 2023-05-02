import GameManager from './game-manager.js';
import Square from './square.js';

export default class Polyomino{

    constructor(squaresCount, color, format){
        this.color = color;
        this._squaresCount = squaresCount;
        
        this._initializeSquares(format);
    }
    
    _initializeSquares(format){
        this._squares = [...Array(this._squaresCount)].map(() => [...Array(this._squaresCount)]);
        for (let i = 0; i < this._squaresCount; i++){
            for (let j = 0; j < this._squaresCount; j++){
                if (format[i][j]){
                    this._squares[i][j] = new Square(this.color);
                }
            }
        }
    }

    draw(){
        for(let i = 0; i < this._squaresCount; i++){
            for(let j = 0; j < this._squaresCount; j++){
                if(this._squares[i][j]){
                   this._squares[i][j].draw(
                        GameManager.arena.position.left + (this.position.x + i) * GameManager.config.squareSize,
                        GameManager.arena.position.top + (this.position.y + j) * GameManager.config.squareSize
                    );
                }
            }
        }
    }

    setPosition(x, y){
        this.position = {
            x: x,
            y: y
        };

        return this;
    }

    clone(){
        return new Polyomino(
            this._squaresCount,
            this.color,
            this._squares.map(x => x.map(y => y ? 1 : 0))).setPosition(this.position.x, this.position.y);
    }

    mergeToArena(){
        for(let i = 0; i < this._squaresCount; i++){
            for(let j = 0; j < this._squaresCount; j++){
                if(this._squares[i][j]){
                    GameManager.arena.setSquare(this.position.x + i, this.position.y + j, this._squares[i][j]);
                }
            }
        }
    }

    _validate(copy){
        for(let i = 0; i < this._squaresCount; i++){
            for(let j = 0; j < this._squaresCount; j++){
                if(copy._squares[i][j] && (GameManager.arena.isOutsideBoundaries(i, j, copy) || GameManager.arena.conflicts(i, j, copy))) {
                    return false;
                }
            }
        }
        return true;
    }

    _tryMove(moveFn){
        let copy = this.clone();
        moveFn(copy);

        if(!this._validate(copy)){
            return false;
        }
        moveFn(this);

        return true;    
    }

    tryMoveLeft(){
        return this._tryMove(obj => obj.position.x--);
    
    }

    tryRotateAntiClockwise(){
        let copy = this.clone();

            for(let i = 0; i < this._squaresCount; i++){
                for(let j = 0; j < this._squaresCount; j++){
                    copy._squares[i][j] = this._squares[this._squaresCount - j - 1][i];
            }
        }
    
        if(!this._validate(copy)){
            return false;
        }

        for(let i = 0; i < this._squaresCount; i++){
                for(let j = 0; j < this._squaresCount; j++){
                    this._squares[i][j] = copy._squares[i][j];
            }
        }

        return true;     
    }
      
    tryMoveRight(){
        return this._tryMove(obj => obj.position.x++);
        
    }

    tryMoveDown(){
        return this._tryMove(obj => obj.position.y++);
        
    }
}