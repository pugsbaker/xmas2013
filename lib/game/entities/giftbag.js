ig.module(
    'game.entities.giftbag'
)
    .requires(
    'game.entities.collectable',
    'impact.entity'
)
    .defines(function () {

        EntityGiftbag = EntityCollectable.extend({

        sfx: new ig.Sound('content/media/sfx/CASH.*'),

        check: function (other) {
            this.sfx.play();
            this.kill();
            ig.game.collectedGiftBags.push(this);
            console.log(ig.game.collectedGiftBags);
             ig.global._gaq.push(['_trackEvent', 'xmas', 'collected', 'Collected Bag', 0, false]);
            var completed = ig.game.collectedGiftBags.length;
            if (completed > 10) {
                ig.game.canExit = true;
            }
        }

    });
});