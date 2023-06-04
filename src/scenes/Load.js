class Load extends Phaser.Scene
{
    constructor()
    {
        super("loadScene");
    }

    preload()
    {
        //loading bar
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, game.config.height - 20, game.config.width * value, 10);      // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        //set load path
        this.load.path = "assets/";

        //load environment assets
        this.load.image("Spaceship_bg", "Spaceship_bg.png");
        this.load.image("Spaceship_fg_bed", "Spaceship_fg_bed.png");

        //load player asset
        this.load.image("Character_Dave", "Character_Dave.png");
    }

    create()
    {
        console.log("----- Enter Load Scene -----");
        this.scene.start("menuScene");
    }
}