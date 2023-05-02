import GameManager from './game-manager.js';

export default class InputHandler {
    constructor(){
        document.addEventListener('keydown', this.onKeyDown);
    }

    onKeyDown(e) {
        switch (e.code){
            case "KeyW":
                GameManager.arena.currentPiece.tryRotateAntiClockwise()
                break;
            case "KeyA":
                GameManager.arena.currentPiece.tryMoveLeft();
                break;
            case "KeyS":
                GameManager.arena.currentPiece.tryMoveDown();
                break;
            case "KeyD":
                GameManager.arena.currentPiece.tryMoveRight();
                break;
            case "Space":
                while(GameManager.arena.currentPiece.tryMoveDown());
                break;
        }
    }
}