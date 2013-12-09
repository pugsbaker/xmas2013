ig.module(
    'game.entities.checkpoint'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntityCheckpoint = ig.Entity.extend({

            size: {x: 32, y: 128},

            type: ig.Entity.TYPE.B,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NEVER,

            animSheet: new ig.AnimationSheet('media/checkpoint.png' , 32, 128),

            init: function(x, y, settings){
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [0]);
                this.addAnim('active', 1, [1])

                this.currentAnim = this.anims.idle;


            },

            check: function( other ) {
                other.currentCheckpoint = this.name;
                console.log(this.name);
                this.currentAnim = this.anims.active;
            }
        })
    });