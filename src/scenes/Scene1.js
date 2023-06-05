class Scene1 extends Phaser.Scene
{
    constructor()
    {
        super("scene1");
    }

    create()
    {
        console.log("----- Enter Scene 1 -----"); 

        //define tilemap
        const map = this.add.tilemap("scene1_tileMapJSON");
        const tileset = map.addTilesetImage("scene1_tileset", "scene1_tilesetImage");

        //add layer
        const baseColorLayer = map.createLayer("BaseColor", tileset, 0, 0);
        const wallLayer = map.createLayer("Wall", tileset, 0, 0);
        const bedLayer = map.createLayer("Bed", tileset, 0, 0);
        const computerLayer = map.createLayer("Computer", tileset, 0, 0);

        //set player

        //set main camera and follow player
        

        // define cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        //define scene variables
        
    }

    update()
    {
        if(cursors.left.isDown)
         {
            //flip player sprite
            // this.dave.setFlip(true, false);
        } 
        if(cursors.right.isDown) 
        {
            //flip player sprite
            // this.dave.setFlip();
        } 

        if(cursors.up.isDown)
        {
            this.scene.start("scene2");
        }
    }
}