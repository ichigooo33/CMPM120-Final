/*
    Name: Wang Liao
    Game Name: 2001: A Space Odyssey Discovery One

    Major components of Phaser used in game:
        1. physics systems
        2. cameras
        3. text objects
        4. tween manager
        5. tilemaps

    Creative Tilt:
    
    I tried my best learning how Professors' examples about DialogueBox and ScrollStyle work.
    After I fully understood how they worked, I modified them so they work better for the purpose of my game.
    
    For example, I used a golbal variable bool to store if the player finishs the dialogue of scene 1.
    Every time the player moves to a different area (I combined DialogueBox mechanic with the camera scrolling), player can read the dialogue again if the player presses "R".
    I think it's an important point because the dialogue also tells the player how to progress the game. If the player misses some information in the dialogue, thep player can go back to read it again.
*/


'use strict';

//reserve keyboard vars
let keyUP, keyDOWN, keyR, keyG, keyT;

//game config
let config = 
{
    parent: "gameViewport",
    type: Phaser.CANVAS,
    width: 640,
    height: 640,
    render: {
        pixelArt: true
    },
    physics:{
        default: "arcade",
        arcade:{
            debug: false,
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
    scene: [Load, Menu, Scene1, Scene1_IntroDialog, Scene1_Area2_Dialog, Scene2, Scene2_Dialog, Scene3]
};

let game = new Phaser.Game(config);

//global variables
const centerX = game.config.width / 2;
const centerY = game.config.height / 2;
const w = game.config.width;
const h = game.config.height;

let dialogFinish = false;
let cursors = null;