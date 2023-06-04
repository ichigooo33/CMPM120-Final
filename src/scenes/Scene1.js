class Scene1 extends Phaser.Scene
{
    constructor()
    {
        super("scene1");

        //scene variables
        this.bgRotateAngleSpeed = 0.01;
    }

    create()
    {
        console.log("----- Enter Scene 1 -----");

        //set background
        this.bg = this.add.image(spaceShipRadius, spaceShipRadius, "Spaceship_bg").setOrigin(0.5, 0.5);

        //set player
        this.dave = this.physics.add.sprite(centerX, buttomFifthY, "Character_Dave");
        this.dave.body.setCollideWorldBounds(true);

        //set foreground
        this.fg_bed = this.add.image(spaceShipRadius, spaceShipRadius, "Spaceship_fg_bed").setOrigin(0.5, 0.5);

        //define background group and add background elements
        this.bgGroup = this.add.group();
        
        this.bgGroup.add(this.bg);
        this.bgGroup.add(this.fg_bed);

        //set camera
        this.cam = this.cameras.main;
        //this.cam.centerOn(this.dave.x, this.dave.y);

        // define cursor key input
        cursors = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        if(cursors.left.isDown)
         {
            Phaser.Actions.RotateAround(this.bgGroup.getChildren(), {x: spaceShipRadius, y: spaceShipRadius}, this.bgRotateAngleSpeed);
            this.dave.setFlip(true, false);
        } 
        if(cursors.right.isDown) 
        {
            Phaser.Actions.RotateAround(this.bgGroup.getChildren(), {x: spaceShipRadius, y: spaceShipRadius}, -this.bgRotateAngleSpeed);
            this.dave.setFlip();
        } 

        if(cursors.up.isDown)
        {
            this.scene.start("scene2");
        }
    }
}