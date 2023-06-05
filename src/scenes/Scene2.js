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
        this.sceneWidth = 1200;
        this.sceneHeight = 360;
        this.podAcceleration = 50;
        this.daveAcceleration = 25;
        this.currentMainCamZoom = 1;
        this.targetMainCamZoom = 0.5;

        this.isInPod = true;

        //set background
        this.add.image(0, 0, "Space_bg").setOrigin(0, 0);

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

        //set world bounds
        this.physics.world.bounds.setTo(0, 0, this.sceneWidth, this.sceneHeight);

        //define cursor key input
        cursors = this.input.keyboard.createCursorKeys();
        
    }

    update()
    {
        this.applyMove();
    }

    applyMove()
    {
        this.tempAcceleration = 0
        if(this.isInPod)
        {
            this.tempAcceleration = this.podAcceleration;
        }
        else
        {
            this.tempAcceleration = this.daveAcceleration;
        }

        //reset dave and pod speed
        

        //when dave inside the pod
        if(cursors.left.isDown)
        {
            this.dave.body.setAccelerationX(-this.tempAcceleration);
            this.dave.resetFlip();
            this.pod.body.setAccelerationX(-this.tempAcceleration);
        }
        if(cursors.right.isDown)
        {
            this.dave.body.setAccelerationX(this.tempAcceleration);
            this.dave.setFlip(true, false);
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
}