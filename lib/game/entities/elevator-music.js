/*
 This entity gives damage (through ig.Entity's receiveDamage() method) to
 the entity that is passed as the first argument to the triggeredBy() method.

 I.e. you can connect an EntityTrigger to an EntityHurt to give damage to the
 entity that activated the trigger.


 Keys for Weltmeister:

 damage
 Damage to give to the entity that triggered this entity.
 Default: 10
 */

ig.module(
    'game.entities.elevator-music'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntityElevatorMusic = ig.Entity.extend({
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255, 0, 0, 0.7)',

            size: {x: 8, y: 8},
           elevatorName: null,

            triggeredBy: function( entity, trigger ) {

                var elevator = ig.game.getEntityByName( this.elevatorName );
                if (elevator && entity.inElevator == true) {
                    elevator.tune.play();
                    //ig.music.volume = 0;

                }
// else if (elevator && ig.music.volume == 0) {
//                    elevator.tune.stop();
//                    ig.music.volume = 0.5;
//                }
                //ig.game.player.inElevator = false;

//                }


            },

            update: function(){}
        });

    });