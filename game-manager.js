import Arena from "./arena.js";

export default class GameManager{
    static start(config){
        GameManager.config = config;
        window.addEventListener("load", GameManager._init);
    }

    static _init(){
        let canvas = document.getElementById("canvas");
        canvas.width = GameManager.config.width;
        canvas.height = GameManager.config.height;

        GameManager.context = canvas.getContext("2d");
        GameManager.arena = new Arena();

        GameManager._draw();
    }
    
    static _draw(){
        GameManager.arena.draw();

        requestAnimationFrame(GameManager._draw);
    }

}