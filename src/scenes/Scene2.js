class Scene2 extends Phaser.Scene
{
    constructor()
    {
        super("scene2");
    }

    create()
    {
        console.log("----- Enter Scene 2 -----");

        //set scene variables
        this.sceneWidth = 2400;
        this.sceneHeight = 720;
        this.podAcceleration = 10;
        this.daveAcceleration = 5;
        this.currentMainCamZoom = 1;
        this.targetMainCamZoom = 0.5;

        this.isInPod = true;

        this.dialogFinish = false;

        //set background
        this.add.image(0, 0, "Space_bg").setOrigin(0, 0);
        this.bgm = this.sound.add("Scene2_Noise").setVolume(0.3);
        this.time.addEvent({ delay: 3000, callback: this.playbgm, callbackScope: this, repeat: -1 });

        //set player
        this.dave = this.physics.add.sprite(centerX, centerY, "Character_Dave");
        this.dave.body.setCollideWorldBounds(true);

        //set pod
        this.pod = this.physics.add.sprite(centerX, centerY, "Pod");
        this.pod.body.setCollideWorldBounds(true);

        //set camera
        this.mainCam = this.cameras.main;
        this.mainCam.setBounds(0, 0, this.sceneWidth, this.sceneHeight);
        this.mainCam.startFollow(this.dave, false, 0.2, 0.2);
        this.mainCam.setZoom(0.8);

        //set world bounds
        this.physics.world.bounds.setTo(0, 0, this.sceneWidth, this.sceneHeight);

        //define cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update()
    {
        if(this.isInPod)
        {
            if(Phaser.Input.Keyboard.JustDown(keyR))
            {
                this.isInPod = false;
                this.leavePod();
            }

            if(this.pod.x >= 2100)
            {
                this.scene.restart();
            }
        }
        else
        {
            if(this.dave.x >= 2200 && this.dave.y >= 200 && this.dave.y <= 560)
            {
                this.scene.start("scene3");
            }
        }

        if(!this.dialogFinish && this.dave.x >= 1200)
        {
            this.dialogFinish = true;

            this.dave.body.setAccelerationX(0);
            this.dave.body.setAccelerationY(0);
            this.dave.body.setVelocity(0);

            this.pod.body.setAccelerationX(0);
            this.pod.body.setAccelerationY(0);
            this.pod.body.setVelocity(0);

            this.scene.run("scene2_dialog");
        }

        if(!this.scene.isActive('scene2_dialog'))
        {
            this.applyMove();
        }

    }

    applyMove()
    {
        this.tempAcceleration = 0
        if(this.isInPod)
        {
            this.tempAcceleration = this.podAcceleration;
            this.dave.x = this.pod.x;
            this.dave.y = this.pod.y;

            if(cursors.left.isDown)
            {
                this.dave.body.setAccelerationX(-this.tempAcceleration);
                //this.dave.setFlip(true);
                this.dave.resetFlip();
                this.pod.body.setAccelerationX(-this.tempAcceleration);
            }
            if(cursors.right.isDown)
            {
                this.dave.body.setAccelerationX(this.tempAcceleration);
                this.dave.setFlip(true);
                //this.dave.resetFlip();
                //this.dave.setFlip(true, false);
                this.pod.body.setAccelerationX(this.tempAcceleration);
            }
            if(cursors.up.isDown)
            {
                this.dave.body.setAccelerationY(-this.tempAcceleration);
                this.pod.body.setAccelerationY(-this.tempAcceleration);
            }
            if(cursors.down.isDown)
            {
                this.dave.body.setAccelerationY(this.tempAcceleration);
                this.pod.body.setAccelerationY(this.tempAcceleration);
            }
        }
        else
        {
            this.tempAcceleration = this.daveAcceleration;

            this.pod.setAccelerationX = 0;
            this.pod.setAccelerationY = 0;

            if(cursors.left.isDown)
            {
                this.dave.body.setAccelerationX(-this.tempAcceleration);
                this.dave.resetFlip();
            }
            if(cursors.right.isDown)
            {
                this.dave.body.setAccelerationX(this.tempAcceleration);
                this.dave.setFlip(true, false);
            }
            if(cursors.up.isDown)
            {
                this.dave.body.setAccelerationY(-this.tempAcceleration);
            }
            if(cursors.down.isDown)
            {
                this.dave.body.setAccelerationY(this.tempAcceleration);
            }
        }
    }

    leavePod()
    {
        this.pod.body.setAccelerationX(0);
        this.pod.body.setAccelerationY(0);
        this.pod.body.setVelocity(0);

        this.mainCam.setZoom(1.4);
    }

    playbgm()
    {
        this.bgm.play();
    }
}