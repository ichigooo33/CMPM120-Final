class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    create()
    {
        console.log("----- Enter Menu Scene -----");
        this.scene.start("scene1");
    }

    update()
    {
        
    }
}