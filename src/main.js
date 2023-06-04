'use strict';

//reserve keyboard vars
let keyUP, keyDOWN, keyR, keyG, keyT;

//game config
let config = 
{
    type: Phaser.AUTO,
    width: 960,
    height: 960,
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
    scene: [Load, Menu, Scene1]
};

let game = new Phaser.Game(config);

//global variables
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
const buttomFifthY = game.config.height * 0.8;
const w = game.config.width;
const h = game.config.height;

const spaceShipRadius = 960 / 2;
let cursors = null;