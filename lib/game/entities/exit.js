/*
 This entity calls ig.game.loadLevel() when its triggeredBy() method is called -
 usually through an EntityTrigger entity.


 Keys for Weltmeister:

 level
 Name of the level to load. E.g. "LevelTest1" or just "test1" will load the
 'LevelTest1' level.
 */

ig.module(
    'game.entities.exit'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntityExit = ig.Entity.extend({
            //_wmDrawBox: true,
           // _wmBoxColor: 'rgba(0, 0, 255, 0.7)',

            size: {x: 128, y: 64},
            displayTimer: null,
            message: null,
            animSheet: new ig.AnimationSheet( 'media/exit.png', 128, 64 ),
            init: function(x,y,settings) {


                this.displayTimer = new ig.Timer();
                this.addAnim("closed", 1, [0]);
                this.addAnim("open", 1, [1,1,2]);
                this.currentAnim = this.anims.closed;
                this.parent(x,y,settings);

            },

            triggeredBy: function( entity, trigger ) {

                if(ig.game.collectedGiftBags) {


                    var completed = ig.game.collectedGiftBags.length;
                    if (completed > 0) {
                       // this.message = "Well Done.";
                        ig.system.setGame(EndScreen);
                        ig.music.next();
                    } else {
                        this.message = "You can't finish yet. You've only collected " + completed + " of your gifts.";
                        $("#message2").text(this.message).show();
                        this.displayTimer.set(2);
                    }


                } else {
                    this.message = "you can't finish yet";
                    $("#message2").text(this.message).show();
                    this.displayTimer.set(2);
                }
            },

            update: function(){
                if(this.displayTimer.delta() >= 0) {
                    $("#message2").hide();
                 }
                if(ig.game.canExit)
                    this.currentAnim = this.anims.open;
                this.parent();
            }
        });

    });