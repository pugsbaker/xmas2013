/**
 * Created with JetBrains WebStorm.
 * User: ChristianBaker
 * Date: 11/12/12
 * Time: 4:44 PM
 * To change this template use File | Settings | File Templates.
 */
ig.module(
    'game.entities.message'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntityMessage = ig.Entity.extend({
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(0, 0, 255, 0.7)',

            size: {x: 8, y: 8},
            message: null,
            displayTimer: null,

            init: function(x,y,settings) {

                this.parent(x,y,settings);
                this.displayTimer = new ig.Timer();

            },

            triggeredBy: function( entity, trigger ) {
                console.log(this.message);
                $(".message").text(this.message).show();
                this.displayTimer.set(2);
            },

            update: function(){
                if(this.displayTimer.delta() >= 0) {
                    $(".message").hide();
                }


            }
        });

    });