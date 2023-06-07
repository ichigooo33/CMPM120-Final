//Wang Liao

'use strict';

//reserve keyboard vars
let keyUP, keyDOWN, keyR, keyG, keyT;

//game config
let config = 
{
    parent: "gameViewport",
    type: Phaser.CANVAS,
    width: 320,
    height: 320,
    render: {
        pixelArt: true
    },
    physics:{
        default: "arcade",
        arcade:{
            debug: true,
            gravity:{
                x: 0,
                y: 0
            }
        }
    },
    zoom: 1,
    scale:{
        //mode: Phaser.Scale.NONE,
        mode: Phaser.Scale.FIT,
        //mode: Phaser.Scale.ENVELOP,
        //mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
        //mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        //mode: Phaser.Scale.RESIZE,
        //autoCenter: Phaser.Scale.NO_CENTER,
        //autoCenter: Phaser.Scale.HORIZONTALLY,
        //autoCenter: Phaser.Scale.VERTICALLY,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Load, Menu, Scene1, Scene1_Area2_Dialog, Scene2]
};

let game = new Phaser.Game(config);

//global variables
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
const w = game.config.width;
const h = game.config.height;

let dialogFinish = false;
let cursors = null;