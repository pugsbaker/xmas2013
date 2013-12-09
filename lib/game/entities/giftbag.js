ig.module(
    'game.entities.giftbag'
)
    .requires(
    'game.entities.collectable',
    'impact.entity'
)
    .defines(function () {

        EntityGiftbag = EntityCollectable.extend({

        sfx: new ig.Sound('media/sfx/CASH.*'),

        check: function (other) {
            this.sfx.play();
            this.kill();
            ig.game.collectedGiftBags.push(this);
            console.log(ig.game.collectedGiftBags);

            var completed = ig.game.collectedGiftBags.length;
            if (completed > 10) {
                ig.game.canExit = true;
            }
        }

    });
});