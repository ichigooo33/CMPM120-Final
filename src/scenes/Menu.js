class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    create()
    {
        console.log("----- Enter Menu Scene -----");

        //set images
        this.add.image(0, 0, "TitleScreen_bg").setOrigin(0, 0);
        this.credit = this.add.image(0, 0, "TitleScreen_credit").setOrigin(0, 0);
        this.credit.alpha = 0;

        //add audio
        this.sfx = this.sound.add("TitleScreen_startSFX");

        //keyboard input
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        this.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        this.keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(this.keySpace)) 
        {
            this.sfx.play();
            this.scene.start("scene1");
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyT)) 
        {
            this.scene.start("scene2");
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyY)) 
        {
            this.scene.start("scene3");
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyC))
        {
            if(this.credit.alpha == 0)
            {
                this.credit.alpha = 1;
            }
            else
            {
                this.credit.alpha = 0;
            }
        }
    }
}