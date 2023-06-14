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

        // load JSON (dialog)
        this.load.json('Scene1_Area2_dialog', 'json/Scene1_Area2_dialog.json');
        this.load.json('Scene1_introdialog', 'json/Scene1_introdialog.json');
        this.load.json('Scene2_dialog', 'json/Scene2_dialog.json');
        this.load.json('Scene3_dialog', 'json/Scene3_dialog.json');

        // load bitmap font
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml');

        //load player asset
        this.load.image("Character_Dave_Scene1", "Character_Dave_Scene1.png");
        this.load.image("Character_Dave", "Character_Dave.png");

        //load Menu asset
        this.load.image("TitleScreen_bg", "TitleScreen_bg.png");
        this.load.image("TitleScreen_credit", "TitleScreen_credit.png");
        this.load.audio("TitleScreen_startSFX", "TitleScreen_startSFX.wav");

        //load scene1 asset
        this.load.image("scene1_tilesetImage", "TileMap.png"); 
        this.load.tilemapTiledJSON("scene1_tileMapJSON", "Scene1_TileMap.json");
        this.load.image("Hal", "Hal.png");
        this.load.image("DialogBox", "DialogBox.png");

        this.load.audio("Scene1_bgm1", "Scene1_bgm1.wav");
        this.load.audio("Scene1_bgm2", "Scene1_bgm2.wav");

        //load scene2 asset
        this.load.image("Space_bg", "Space_bg.png");
        this.load.image("Pod", "Pod.png");
        this.load.audio("Scene2_Noise", "Scene2_Noise.wav");

        //load scene3 asset
        this.load.image("Scene3_bg", "Scene3_bg.png");
        this.load.image("Character_Frank_Scene3", "Character_Frank.png");
    }

    create()
    {
        console.log("----- Enter Load Scene -----");
        this.scene.start("menuScene");
    }
}