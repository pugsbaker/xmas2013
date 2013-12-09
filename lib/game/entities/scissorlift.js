ig.module(
    'game.entities.scissorlift'
)
    .requires(
    'impact.entity',
    'game.entities.mover'
)
    .defines(function(){

        EntityScissorlift = EntityMover.extend({
            size: {x: 128, y: 16},
            offset: {x: 0, y: 64},
            zIndex: 100,
            speed: 30,

            animSheet: new ig.AnimationSheet( 'media/scissorlift.png', 128, 284 ),

            init: function( x, y, settings ) {
                this.parent( x, y, settings );
                this.addAnim('rolling', 0.1, [0,1,2]);
                this.currentAnim = this.anims.rolling;
            }

        });
    });