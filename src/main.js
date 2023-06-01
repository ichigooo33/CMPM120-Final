'use strict';

//reserve keyboard vars
let keyUP, keyDOWN, keyR, keyG, keyT;

//game config
let config = 
{
    type: Phaser.AUTO,
    width: 960,
    height: 540,
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
    scene: [Load, Menu, Scene1]
};

let game = new Phaser.Game(config);

//global variables
let tileSize = 64;

let gravityForce = 800;
let fishAcceleration = 300;

let highScore = 0;

let sceneIndex = 0;