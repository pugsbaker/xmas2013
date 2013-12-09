ig.module(
    'game.entities.slip'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntitySlip = ig.Entity.extend({

            size: {x: 128, y: 10},
            offset: {x: 0, y: 54},
            zIndex: -1,
            animSheet: new ig.AnimationSheet('media/slip.png' , 128, 64),
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NEVER,



            init: function(x, y, settings){
                this.parent(x, y, settings);
                this.addAnim('idle', 1, [1]);

                this.currentAnim = this.anims.idle;



            },
            update: function() {
                var player = ig.game.getEntitiesByType( EntityPlayer )[0];
                if( player && player.slipTimer.delta() < 0) {
                    player.slipping = true;

                } else {
                    player.slipping = false;
                }

            },
            check: function(other) {
                if (other.slipTimer.delta() >= 0) {
                    other.slipping = true;
                    other.slipTimer.set(2);
                };


            }
        })
    });