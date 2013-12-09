/*
Simple Mover that visits all its targets in an ordered fashion. You can use
the void entities (or any other) as targets.


Keys for Weltmeister:

speed
	Traveling speed of the mover in pixels per second.
	Default: 20
	
target.1, target.2 ... target.n
	Names of the entities to visit.
*/

ig.module(
	'game.entities.elevator'
)
.requires(
	'impact.entity',
    'game.entities.mover'
)
.defines(function(){
	
EntityElevator = EntityMover.extend({
	size: {x: 186, y: 32},
    offset: {x: 2, y: 192},
	zIndex: 100,
	speed: 100,
    roofTargets: {},
    roofDif: 186,
	animSheet: new ig.AnimationSheet( 'media/elevator.png', 192, 256 ),
    tune: new ig.Sound( 'media/sfx/ipanema.*', false ),


    init: function( x, y, settings ) {

		this.parent( x, y, settings );
        //this.tune.play();
        if(!ig.global.wm) {

            ig.game.spawnEntity(EntityElevatorRoof, x, y - 186, {parentObject: this})
        }

	},

    update: function() {
      this.parent();

    }


});
        EntityElevatorRoof = ig.Entity.extend({
            size: {x: 186, y: 186},

            zIndex: 100,
            gravityFactor: 0,
            parentObject: null,
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.A,
            collides: ig.Entity.COLLIDES.NEVER,

            //animSheet: new ig.AnimationSheet( 'media/elevator.png', 192, 256 ),
            init: function( x, y, settings ) {
               this.parent( x , y, settings );

            },

            update: function() {
                if (this.parentObject) {
                    this.vel.x = this.parentObject.vel.x;
                    this.vel.y = this.parentObject.vel.y;


                }




                this.parent();
            },
            check: function() {
                ig.game.player.inElevator = true;
                //ig.music.volume = 0;
                //this.parentObject.tune.play();

            }



        });



});