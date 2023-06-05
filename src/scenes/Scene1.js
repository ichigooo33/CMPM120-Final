class Scene1 extends Phaser.Scene
{
    constructor()
    {
        super("scene1");
    }

    create()
    {
        console.log("----- Enter Scene 1 -----"); 

        //define scene variables
        this.sceneAreaSize = 320;
        this.daveSpeed = 150;

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
        this.mainCam.startFollow(this.dave, true);

        //set collision
        wallLayer.setCollisionByProperty({collides: true});
        bedLayer.setCollisionByProperty({collides: true});
        computerLayer.setCollisionByProperty({collides: true});
        this.physics.add.collider(this.dave, wallLayer);
        this.physics.add.collider(this.dave, bedLayer);
        this.physics.add.collider(this.dave, computerLayer);

        //define cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        //define wolrd physics bounds
        this.physics.world.setBounds(0, 0, this.sceneAreaSize * 3, this.sceneAreaSize * 3);
    }

    update()
    {
        this.daveMove();
    }

    daveMove()
    {
        //normalize the movement input
        this.direction = new Phaser.Math.Vector2(0);
        if(cursors.left.isDown)
        {
            this.direction.x = -1;
        }
        else if(cursors.right.isDown)
        {
            this.direction.x = 1;
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
}