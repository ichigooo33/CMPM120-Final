class Scene1_Area2_Dialog extends Phaser.Scene {
    constructor() {
        super("scene1_area2_dialog");

        // dialog constants
        this.DBOX_X = 0;			    // dialog box x-position
        this.DBOX_Y = h * 0.8;			    // dialog box y-position
        this.DBOX_FONT = 'gem_font';	// dialog box font key

        this.TEXT_X = w * 0.1;			// text w/in dialog box x-position
        this.TEXT_Y = h * 0.85;			// text w/in dialog box y-position
        this.TEXT_SIZE = 20;		// text font size (in pixels)
        this.TEXT_MAX_WIDTH = w * 0.8;	// max width of text within box

        this.NEXT_TEXT = '[SPACE]';	// text to display for next prompt
        this.NEXT_X = w * 0.9;			// next text prompt x-position
        this.NEXT_Y = h * 0.95;			// next text prompt y-position

        this.LETTER_TIMER = 10;		// # ms each letter takes to "type" onscreen

        // dialog variables
        this.dialogConvo = 0;			// current "conversation"
        this.dialogLine = 0;			// current line of conversation
        this.dialogSpeaker = null;		// current speaker
        this.dialogLastSpeaker = null;	// last speaker
        this.dialogTyping = false;		// flag to lock player input while text is "typing"
        this.dialogText = null;			// the actual dialog text
        this.nextText = null;			// player prompt text to continue typing

        // character variables
        this.Hal = null;
        this.Character_Dave_Scene1 = null;
        this.Character_Dave = null;
        this.Pod = null;
        this.tweenDuration = 500;

        this.OFFSCREEN_X = -500;        // x,y values to place characters offscreen
        this.OFFSCREEN_Y = 1000;

        this.isReadyForRestart = false;
    }

    create() {
        console.log("----- Enter Scene 1 Area 2 Dialogue -----"); 

        // parse dialog from JSON file
        this.dialog = this.cache.json.get('Scene1_Area2_dialog');
        //console.log(this.dialog);

        // add dialog box sprite
        this.dialogbox = this.add.sprite(this.DBOX_X, this.DBOX_Y, 'DialogBox').setOrigin(0).setScale(2);

        // initialize dialog text objects (with no text)
        this.dialogText = this.add.bitmapText(this.TEXT_X, this.TEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);
        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, '', this.TEXT_SIZE);

        // ready the character dialog images offscreen

        //homer -> Hal
        //minerva -> Character_Dave_Scene1
        //neptune -> Character_Dave
        //jove -> Pod
        this.Hal = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'Hal').setOrigin(0, 1);
        this.Dave = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'Character_Dave_Scene1').setOrigin(0, 1);
        this.Character_Dave = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'Character_Dave').setOrigin(0, 1);
        this.Pod = this.add.sprite(this.OFFSCREEN_X, this.DBOX_Y+8, 'Pod').setOrigin(0, 1);

        // input
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // start dialog
        this.typeText();        
    }

    update() {
        //initialze if just restart
        if(this.isReadyForRestart)
        {
            this.isReadyForRestart = false;
            this.typeText();
        }

        // check for spacebar press
        if(Phaser.Input.Keyboard.JustDown(this.keySpace) && !this.dialogTyping) {
            // trigger dialog
            this.typeText();
        }
    }

    typeText() {
        // lock input while typing
        this.dialogTyping = true;

        // clear text
        this.dialogText.text = '';
        this.nextText.text = '';

        /* Note: In my conversation data structure: 
                - each array within the main JSON array is a "conversation"
                - each object within a "conversation" is a "line"
                - each "line" can have 3 properties: 
                    1. a speaker (required)
                    2. the dialog text (required)
                    3. an (optional) flag indicating if this speaker is new
        */

        // make sure there are lines left to read in this convo, otherwise jump to next convo
        if(this.dialogLine > this.dialog[this.dialogConvo].length - 1) {
            this.dialogLine = 0;
            // I increment conversations here, but you could create logic to exit the dialog here
            this.dialogConvo++;
        }
        
        // make sure we haven't run out of conversations...
        if(this.dialogConvo >= this.dialog.length) {
            // here I'm simply "exiting" the last speaker and removing the dialog box,
            // but you could build other logic to change game states here
            console.log('----- End Scene 1 Area 2 Dialogue -----');
            // tween out prior speaker's image
            if(this.dialogLastSpeaker) {
                this.tweens.add({
                    targets: this[this.dialogLastSpeaker],
                    x: this.OFFSCREEN_X,
                    duration: this.tweenDuration,
                    ease: 'Linear',
                    onComplete: () => {
                        //close the scene
                        dialogFinish = true;
                        this.resetStatus();
                        this.scene.sleep();
                    }
                });
            }
            // make text box invisible
            //this.dialogbox.visible = false;

            //close the scene
            // dialogFinish = true;
            // this.resetStatus();
            // this.scene.sleep();
            //this.scene.sendToBack().sleep();
        } else {
            // if not, set current speaker
            this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];
            // check if there's a new speaker (for exit/enter animations)
            if(this.dialog[this.dialogConvo][this.dialogLine]['newSpeaker']) {
                // tween out prior speaker's image
                if(this.dialogLastSpeaker) {
                    this.tweens.add({
                        targets: this[this.dialogLastSpeaker],
                        x: this.OFFSCREEN_X,
                        duration: this.tweenDuration,
                        ease: 'Linear'
                    });
                }
                // tween in new speaker's image
                this.tweens.add({
                    targets: this[this.dialogSpeaker],
                    x: this.DBOX_X + 30,
                    duration: this.tweenDuration,
                    ease: 'Linear'
                });
            }

            // build dialog (concatenate speaker + line of text)
            this.dialogLines = this.dialog[this.dialogConvo][this.dialogLine]['speaker'].toUpperCase() + ': ' + this.dialog[this.dialogConvo][this.dialogLine]['dialog'];

            // create a timer to iterate through each letter in the dialog text
            let currentChar = 0; 
            this.textTimer = this.time.addEvent({
                delay: this.LETTER_TIMER,
                repeat: this.dialogLines.length - 1,
                callback: () => { 
                    // concatenate next letter from dialogLines
                    this.dialogText.text += this.dialogLines[currentChar];
                    // advance character position
                    currentChar++;
                    // check if timer has exhausted its repeats 
                    // (necessary since Phaser 3 no longer seems to have an onComplete event)
                    if(this.textTimer.getRepeatCount() == 0) {
                        // show prompt for more text
                        this.nextText = this.add.bitmapText(this.NEXT_X, this.NEXT_Y, this.DBOX_FONT, this.NEXT_TEXT, this.TEXT_SIZE).setOrigin(1);
                        // un-lock input
                        this.dialogTyping = false;
                        // destroy timer
                        this.textTimer.destroy();
                    }
                },
                callbackScope: this // keep Scene context
            });
            
            // set bounds on dialog
            this.dialogText.maxWidth = this.TEXT_MAX_WIDTH;

            // increment dialog line
            this.dialogLine++;

            // set past speaker
            this.dialogLastSpeaker = this.dialogSpeaker;
        }
    }

    resetStatus()
    {
        this.dialogConvo = 0;			                                                    // current "conversation"
        this.dialogLine = 0;			                                                    // current line of conversation
        this.dialogSpeaker = this.dialog[this.dialogConvo][this.dialogLine]['speaker'];		// current speaker
        this.dialogLastSpeaker = null;	                                                    // last speaker
        this.dialogTyping = false;		                                                    // flag to lock player input while text is "typing"
        this.isReadyForRestart = true;
    }
}