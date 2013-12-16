
ig.module(
    'game.entities.fall'
)
    .requires(
    'impact.entity'
)
    .defines(function(){

        EntityFall = ig.Entity.extend({
            _wmDrawBox: true,
            _wmBoxColor: 'rgba(255, 0, 0, 0.7)',

            size: {x: 8, y: 8},
            damage: 10,

            triggeredBy: function( entity, trigger ) {

                entity.sfxFall.play();
                ig.music.volume = 0;
                ig.global._gaq.push(['_trackEvent', 'xmas', 'fall', 'Fell down a hole', 0, false]);
            },

            update: function(){}
        });

    });/**
 * Created with JetBrains WebStorm.
 * User: ChristianBaker
 * Date: 12/12/12
 * Time: 6:00 PM
 * To change this template use File | Settings | File Templates.
 */
