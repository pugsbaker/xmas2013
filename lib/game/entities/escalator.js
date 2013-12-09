ig.module(
    'game.entities.escalator'
)
.requires(
    'impact.entity',
    'game.entities.mover',
    'game.entities.pin-trigger'

)
.defines(function(){

        EntityEscalator = ig.Entity.extend({

            _wmDrawBox: true,
            _wmBoxColor: 'rgba(196, 255, 0, 0.7)',
            size: {x:480,y:416},
            triggers: null,
            timer: null,
            treadCount: 20,
            direction: null,
            facing: null,
            spawnPoint:null,
            init: function( x, y, settings ) {
                this.parent( x, y, settings );


                if(!ig.global.wm) {

                    if(this.facing == "left") {
                        ig.game.spawnEntity(EntityPinTrigger, x, y+5, {size: {x:32,y:4},name: settings.name + "_t1"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 64, y+5, {size: {x:32,y:4},name: settings.name + "_t2"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 416, y + 384, {size: {x:32,y:4},name: settings.name + "_t3"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 448, y + 384, {size: {x:32,y:4},name: settings.name + "_t4"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 448, y + 412, {size: {x:32,y:4},name: settings.name + "_t5"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 352, y + 412, {size: {x:32,y:4},name: settings.name + "_t6"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 352, y + 384, {size: {x:32,y:4},name: settings.name + "_t7"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 64, y + 64, {size: {x:32,y:4},name: settings.name + "_t8"});
                        ig.game.spawnEntity(EntityPinTrigger, x, y + 32, {size: {x:32,y:4},name: settings.name + "_t9"});
                        this.spawnPoint = {x:x,y:y};
                    } else {
                        ig.game.spawnEntity(EntityPinTrigger, x + 448, y+5, {size: {x:32,y:4},name: settings.name + "_t1"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 384, y+5, {size: {x:32,y:4},name: settings.name + "_t2"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 32, y + 384, {size: {x:32,y:4},name: settings.name + "_t3"});
                        ig.game.spawnEntity(EntityPinTrigger, x, y + 384, {size: {x:32,y:4},name: settings.name + "_t4"});
                        ig.game.spawnEntity(EntityPinTrigger, x, y + 412, {size: {x:32,y:4},name: settings.name + "_t5"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 108, y + 412, {size: {x:32,y:4},name: settings.name + "_t6"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 108, y + 364, {size: {x:32,y:4},name: settings.name + "_t7"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 384, y + 64, {size: {x:32,y:4},name: settings.name + "_t8"});
                        ig.game.spawnEntity(EntityPinTrigger, x + 448, y + 32, {size: {x:32,y:4},name: settings.name + "_t9"});
                        this.spawnPoint = {x:x + 448, y:y};
                    }



                };

                if(this.direction == 'down') {
                    this.triggers = {
                        1: settings.name + "_t1",
                        2: settings.name + "_t2",
                        3: settings.name + "_t3",
                        4: settings.name + "_t4",
                        5: settings.name + "_t5",
                        6: settings.name + "_t6",
                        7: settings.name + "_t7",
                        8: settings.name + "_t8",
                        9: settings.name + "_t9"
                    }
                } else {
                    this.triggers = {
                        9: settings.name + "_t1",
                        8: settings.name + "_t2",
                        7: settings.name + "_t3",
                        6: settings.name + "_t4",
                        5: settings.name + "_t5",
                        4: settings.name + "_t6",
                        3: settings.name + "_t7",
                        2: settings.name + "_t8",
                        1: settings.name + "_t9"
                    }
                }



                this.timer = new ig.Timer();

            },


            update: function(){




                if (this.timer.delta() >= 0 && this.treadCount > 0) {
                    ig.game.spawnEntity(EntityEscalatorTread, this.spawnPoint.x, this.spawnPoint.y, {target: this.triggers});
                    this.timer.set(0.65);
                    this.treadCount--;
                }



                this.parent();
            }



        });


        EntityEscalatorTread = EntityMover.extend({

            _wmDrawBox: true,
            _wmBoxColor: 'rgba(196, 255, 0, 0.7)',
            size: {x:32,y:4}

        });






});
