class Scene1 extends Phaser.Scene
{
    constructor()
    {
        super("scene1");
    }

    create()
    {
        console.log("----- Enter Scene 1 -----"); 

        //reset global variable
        dialogFinish = false;

        //define scene variables
        this.sceneAreaSize = 640;
        this.daveSpeed = 200;
        this.scrollDuration = 400;
        this.scrollStyle = 'Quad';

        //define tilemap
        const map = this.add.tilemap("scene1_tileMapJSON");
        const tileset = map.addTilesetImage("scene1_tileset", "scene1_tilesetImage");

        //add layer
        const baseColorLayer = map.createLayer("BaseColor", tileset, 0, 0);
        const wallLayer = map.createLayer("Wall", tileset, 0, 0);
        const bedLayer = map.createLayer("Bed", tileset, 0, 0);
        const computerLayer = map.createLayer("Computer", tileset, 0, 0);

        //set player
        this.dave = this.physics.add.sprite(this.sceneAreaSize / 2, this.sceneAreaSize * 1.5, "Character_Dave_Scene1");
        this.dave.body.setCollideWorldBounds(true);
        this.dave.scrollLock = false;

        //set main camera and follow player
        this.mainCam = this.cameras.main;
        this.mainCam.setBounds(0, 0, this.sceneAreaSize * 3, this.sceneAreaSize * 3);
        this.mainCam.centerOn(this.dave.x, this.dave.y);
        this.mainCam.setBackgroundColor("rgb(0, 0, 0)");

        //define cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        //set collision
        wallLayer.setCollisionByProperty({collides: true});
        bedLayer.setCollisionByProperty({collides: true});
        computerLayer.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.dave, wallLayer);
        this.physics.add.collider(this.dave, bedLayer);
        this.physics.add.collider(this.dave, computerLayer, this.interactWithComputer);

        //define wolrd physics bounds
        this.physics.world.setBounds(0, 0, this.sceneAreaSize * 3, this.sceneAreaSize * 3);

        //text config
        let tempTextConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            color: "#843605",
            align: "left",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 480
        }

        //temp text
        this.turotialText1 = this.add.text(w * 0.1 + this.mainCam.scrollX, h * 0.80 + this.mainCam.scrollY, "arrow key to move", tempTextConfig);
        this.turotialText2 = this.add.text(w * 0.1 + this.mainCam.scrollX, h * 0.85 + this.mainCam.scrollY, "(R) to dialog", tempTextConfig);
        this.turotialText3 = this.add.text(w * 0.1 + this.mainCam.scrollX, h * 0.9 + this.mainCam.scrollY, "(T) to next scene", tempTextConfig);

        //add audio
        this.bgm1 = this.sound.add("Scene1_bgm1");
        this.bgm2 = this.sound.add("Scene1_bgm2");
        this.time.addEvent({ delay: 3000, callback: this.playbgm1, callbackScope: this, repeat: -1 });
        this.time.addEvent({ delay: 5200, callback: this.playbgm2, callbackScope: this, repeat: -1 });
    }

    update()
    {
        if(!this.scene.isActive('scene1_area2_dialog'))
        {
            this.daveMove();
            this.checkCamBounds(this.dave, this.mainCam);

            if(Phaser.Input.Keyboard.JustDown(keyR) && !dialogFinish)
            {
                this.dave.setVelocity(0);
                this.scene.run("scene1_area2_dialog");
            }
        }

        if(Phaser.Input.Keyboard.JustDown(keyT))
        {
            this.scene.start("scene2");
        }
    }

    daveMove()
    {
        //normalize the movement input
        this.direction = new Phaser.Math.Vector2(0);
        if(cursors.left.isDown)
        {
            this.direction.x = -1;
            this.dave.setFlip(true, false);
        }
        else if(cursors.right.isDown)
        {
            this.direction.x = 1;
            this.dave.resetFlip();
        }
        if(cursors.up.isDown)
        {
            this.direction.y = -1;
        }
        else if(cursors.down.isDown)
        {
            this.direction.y = 1;
        }
        this.direction.normalize();
        this.dave.setVelocity(this.daveSpeed * this.direction.x, this.daveSpeed * this.direction.y);
    }

    // uses a camera pan and object tween to create "slideshow" scrolling
    // assumes object has 0.5 origin
    // calculations in camera pans need to use cam.centerX/centerY b/c pans are relative to camera center
    checkCamBounds(obj, cam) {
        if(obj.x + obj.width/2 > cam.width + cam.scrollX) {
            // PLAYER HITS RIGHT EDGE (SCROLL R->L)
            // lock player
            obj.scrollLock = true;
            // tween player
            this.tweens.add({
                targets: obj,
                duration: this.scrollDuration,
                ease: this.scrollStyle,
                x: { from: obj.x, to: obj.x + obj.width + 1},
                onComplete: function() {
                    obj.scrollLock = false; // unlock player
                }
            });
            // pan camera
            cam.pan(cam.scrollX + cam.centerX + cam.width, cam.scrollY + cam.centerY, this.scrollDuration, this.scrollStyle);

            //reset dialog
            dialogFinish = false;

            //update text position
            this.updateTextPosition();
        } else if(obj.x - obj.width/2 < cam.scrollX) {
            // PLAYER HITS LEFT EDGE (SCROLL L->R)
            // lock player
            obj.scrollLock = true;
            // tween player
            this.tweens.add({
                targets: obj,
                duration: this.scrollDuration,
                ease: this.scrollStyle,
                x: { from: obj.x, to: obj.x - obj.width - 1},
                onComplete: function() {
                    obj.scrollLock = false; // unlock player
                }
            });
            // pan camera
            cam.pan(cam.scrollX - cam.centerX, cam.scrollY + cam.centerY, this.scrollDuration, this.scrollStyle);
        } else if(obj.y + obj.height/2 > cam.height + cam.scrollY) {
            // PLAYER HITS BOTTOM EDGE (SCROLL BOTTOM -> TOP)
            // lock player
            obj.scrollLock = true;
            //PLAYER HITS NORMAL BUTTOM EDGE
            // tween player
            this.tweens.add({
                targets: obj,
                duration: this.scrollDuration,
                ease: this.scrollStyle,
                y: { from: obj.y, to: obj.y + obj.height + 1},
                onComplete: function() {
                    obj.scrollLock = false; // unlock player
                }
            });
            // pan camera
            cam.pan(cam.scrollX + cam.centerX, cam.scrollY + cam.centerY + cam.height, this.scrollDuration, this.scrollStyle);

            //reset dialog
            dialogFinish = false;
        } else if(obj.y - obj.height/2 < cam.scrollY) {
            // PLAYER HITS TOP EDGE (SCROLL TOP->BOTTOM)
            // lock player
            obj.scrollLock = true;
            // tween player
            this.tweens.add({
                targets: obj,
                duration: this.scrollDuration,
                ease: this.scrollStyle,
                y: { from: obj.y, to: obj.y - obj.height - 1},
                onComplete: function() {
                    obj.scrollLock = false; // unlock player
                }
            });
            // pan camera
            cam.pan(cam.scrollX + cam.centerX, cam.scrollY - cam.centerY, this.scrollDuration, this.scrollStyle);

            //reset dialog
            dialogFinish = false;
        }
        else if(obj.y - obj.height/2 <= 0)
        {
            //PLAYER HITS TOP EDGE OF THE SPACESHIP, MOVE PLAYER TO THE BUTTOM EDGE OF THE SPACESHIP
            cam.setScroll(cam.scrollX, this.sceneAreaSize * 2);
            obj.y = cam.scrollY + cam.height - obj.height/2 - 1;

            //reset dialog
            dialogFinish = false;
        }
        else if(obj.y + obj.height / 2 >= this.sceneAreaSize * 3)
        {
            //PLAYER HITS BUTTOM EDGE OF THE SPACESHIP, MOVE PLAYER TO THE TOP EDGE OF THE SPACESHIP
            cam.setScroll(cam.scrollX, 0);
            obj.y = cam.scrollY + obj.height/2 + 1;

            //reset dialog
            dialogFinish = false;
        }
    }

    interactWithComputer()
    {
        console.log("Interact with computer");
    }

    talking()
    {
        this.scene.run("scene1_dialog");
    }

    updateTextPosition()
    {
        //BUG here! Doesn't work
        this.turotialText1.setPosition(w * 0.1 + this.mainCam.scrollX, h * 0.8 + this.mainCam.scrollY);

        this.turotialText1.x = w * 0.1 + this.mainCam.scrollX;
        this.turotialText1.y = h * 0.8 + this.mainCam.scrollY;

        this.turotialText2.x = w * 0.1 + this.mainCam.scrollX; 
        this.turotialText2.y = h * 0.85 + this.mainCam.scrollY;

        this.turotialText3.x = w * 0.1 + this.mainCam.scrollX; 
        this.turotialText3.y = h * 0.9 + this.mainCam.scrollY;
    }

    playbgm1()
    {
        this.bgm1.play();
    }

    playbgm2()
    {
        this.bgm2.play();
    }
}