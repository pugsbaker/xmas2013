ig.module(
    'game.entities.collectable'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntityCollectable = ig.Entity.extend({

            size: {x: 32, y: 32},

            zIndex: -1,
            animSheet: new ig.AnimationSheet('media/present.png' , 32, 32),
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NEVER,


            init: function(x, y, settings){
                this.parent(x, y, settings);
                this.addAnim('idle',0.1, [0,1,2,3,4,5]);
                this.currentAnim = this.anims.idle;
            }
        })
    });