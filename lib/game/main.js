ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.entities.player',
    'game.levels.room5',
    'balmain.camera'
    //,'impact.debug.debug'
)
.defines(function(){

MyGame = ig.Game.extend({


    gravity: 500,
    camera: null,
    spawnPointName: 'door_A',
    collectedGiftBags: [],
    canExit: false,
    currentLevel: LevelRoom5,
    hudText: new ig.Font('content/media/font.png'),
    bagImage: new ig.Image('content/media/bagHud.png'),
    gameTimer: null,
    welcomeTimer: null,
	
    init: function() {
            ig.screen = "Main";
                        
        if(ig.ua.mobile) {
            $("#controls").show();
        };  
            
        this.welcomeTimer = new ig.Timer();
        $(".xmas-message").show();
        this.welcomeTimer.set(10);
		// Initialize your game here; bind keys etc.
        ig.input.bind(ig.KEY.LEFT_ARROW, "left");
        ig.input.bind(ig.KEY.RIGHT_ARROW, "right");
        ig.input.bind(ig.KEY.SPACE, "jump");
        ig.input.bind(ig.KEY.UP_ARROW, "jump");

        ig.input.bindTouch( '#jump', 'jump' );
        ig.input.bindTouch( '#left', 'left' );
        ig.input.bindTouch( '#right', 'right' );


        this.gameTimer = ig.gameTimer = new ig.Timer();
       $("#slider").hide();
       $(".full-width-slider").royalSlider('next');
       $(".wrapper").height("auto");
       ig.global._gaq.push(['_trackEvent', 'xmas', 'start', 'Started game', 0, false]);

        // Ready to Rock!
       // ig.music.play();
        ig.music.volume = 0;

        this.camera = new Camera( ig.system.width/4, ig.system.height/3, 5 );
        this.camera.trap.size.x = ig.system.width/10;
        this.camera.trap.size.y = ig.system.height/3;
        this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
        this.loadLevel(this.currentLevel);
             

	},
    loadLevel: function( level ) {
        
        this.parent( level );

        // spawn the player at the correct door
        var spawnPoint = ig.game.getEntityByName(this.spawnPointName);
        if(spawnPoint) {
            ig.game.spawnEntity(EntityPlayer, spawnPoint.pos.x,spawnPoint.pos.y);
        }
        this.setupCamera();

        //stops bags that have already been collected showing on re-entering a room
        if(this.collectedGiftBags.length > 0) {
            for(var i = 0; i < this.collectedGiftBags.length; i++) {
                var collectedbag = this.collectedGiftBags[i];
                var bagOnLevel = ig.game.getEntityByName(collectedbag.name);
                if (bagOnLevel)
                    bagOnLevel.kill();

            }
        }


        ig.music.volume = 0.5;

        ig.game.sortEntitiesDeferred();



    },


    update: function() {
        // Update all entities and backgroundMaps
	   this.parent();
        if(this.player.inElevator || ig.mute )
            ig.music.volume = 0;
        else
            ig.music.volume = 0.5;

        this.camera.follow( this.player );
            
         if(this.welcomeTimer.delta() >= 0) {
            $(".xmas-message").hide();
         }
        

	},

    setupCamera: function() {
        this.player = this.getEntitiesByType( EntityPlayer )[0];

        // Set camera max and reposition trap
        this.camera.max.x = this.collisionMap.width * this.collisionMap.tilesize - ig.system.width;
        this.camera.max.y = this.collisionMap.height * this.collisionMap.tilesize - ig.system.height;

        this.camera.set( this.player );
    },

	draw: function() {
		// Draw all entities and backgroundMaps
            this.parent();
            
            this.bagImage.draw(20,20)
            var numBags = this.collectedGiftBags.length;
            this.hudText.draw(numBags + "/20", 80, 40, ig.Font.ALIGN.LEFT );
            
            var time = Math.round(ig.gameTimer.delta());
            
            var mins = Math.floor(time/60);
            mins = mins < 10 ? "0" + mins : mins;
            
            var secs = time - mins*60;
            var secs = secs < 10 ? "0" + secs : secs;
           
            var timeDisplay = mins + ":" + secs ;
            
            this.hudText.draw(timeDisplay, ig.system.width - 120, 40, ig.Font.ALIGN.LEFT );
            
            
    }
});


StartScreen = ig.Game.extend({
            
            bgtuneEnd: new ig.Sound( 'content/media/sfx/JingleBells.*', false ),
            
            bgtune: new ig.Sound( 'content/media/sfx/chase.*', false ),
            bgImage: new ig.Image('content/media/titlescreen/background.jpg'),
            Text: new ig.Font('content/media/font.png'),
            Text_mobile: new ig.Font('content/media/font_12.png'),
            
            init: function(){
                ig.screen = "Start";
                ig.input.bind(ig.KEY.SPACE, "start");
                ig.input.bindTouch("#slider", "start");
                ig.input.bind("#slider","start");
                // Now add the file to the playlist
                ig.music.add( this.bgtuneEnd );
                ig.music.add( this.bgtune );
                
                // Ready to Rock!
                //ig.music.play();
                ig.music.loop = true;
                
            },

            update: function() {
                if(ig.input.pressed('start')) {

                    ig.system.setGame(MyGame);
                    ig.music.next();

                }

                if(ig.mute )
                    ig.music.volume = 0;
                else
                    ig.music.volume = 0.5;


                this.parent();
            },
            draw: function() {
                this.parent();
                         
               
            }

        });
        EndScreen = ig.Game.extend({
            bgImage: new ig.Image('content/media/titlescreen/background.jpg'),
            Text: new ig.Font('content/media/font.png'),
            Text_mobile: new ig.Font('content/media/font_12.png'),
            init: function(){
                ig.screen = "End";
                
                $("#slider").show();
                setTimeout(function() {
                    $(".full-width-slider").royalSlider('next');
                    ig.music.fadeOut(5);
                }, 10000);
                
               
                $(".wrapper").height(0);
                 ig.global._gaq.push(['_trackEvent', 'xmas', 'end', 'Finished game', 0, false]);
                ig.input.bind(ig.KEY.SPACE, "start");
                if(ig.ua.mobile) {
                    $("#controls").hide();
                };  
            },

            update: function() {
                if(ig.input.pressed('start')) {
                    ig.system.setGame(StartScreen);
                    ig.music.next();
                    if(ig.mute)
                        ig.music.volume = 0;
                    else
                        ig.music.volume = 0.5;
                }
                this.parent();
            },
            draw: function() {
                this.parent();
                              
            }

        });
        
   
        ig.mute = false;
        ig.paused = false;
        ig.chosenPlayer = "mholm"; //$("input[type='radio']:checked").val();
        ig.screen = "Start";
                
        //$("#title-screen > img.landscape").show();
        //ig.Sound.enabled = false;
        var ratio = 2.4;
        var gameWidth = $(".wrapper").width() > 1152 ? 1152 : $(".wrapper").width();
        var gameHeight = gameWidth/ratio > 768 ? 768 :  gameWidth/ratio;
        $("#controls").hide();
        if( ig.ua.mobile ) {
            // Disable sound for all mobile devices
            ig.Sound.enabled = false;
        }
        
        if( ig.ua.mobile ) {
            // All other mobile devices
            gameWidth = $(window).width();
            gameHeight = $(window).outerHeight();
           
            ig.main('#canvas', StartScreen, 60,  gameWidth, gameHeight, 1);
        } else if (ig.ua.iPhone) {
           
            gameWidth = $(window).width();
            gameHeight = $(window).outerHeight();
            ig.main('#canvas', StartScreen, 60,  gameWidth, gameHeight, 1);
            
        }
        else {
            // Desktop browsers
            ig.main('#canvas', StartScreen, 60, gameWidth, gameHeight, 1);
            
             $("#title-screen").width(gameWidth).height(gameHeight);
            window.onresize = function() {
                var gameWidth = $(".wrapper").width() > 1152 ? 1152 : $(".wrapper").width();
                var gameHeight = gameWidth/ratio > 768 ? 768 :  gameWidth/ratio;
                $("#canvas").height(gameWidth/ratio).width(gameWidth);
               
            };

        }



       

        $("#mute").click(function () {
            ig.mute = !ig.mute;
            if(ig.mute) {
                $(this).text("UN-MUTE");
            } else {
                $(this).text("MUTE");

            }
            
        });
        $("#slider").click(function(){
            
            ig.system.setGame(MyGame);
             ig.music.next();
        });

        $("#play-pause").click(function(){

                if (ig.system) {
                    if(ig.paused) {
                        
                        ig.music.play();
                        ig.system.startRunLoop();
                        $(this).text("PAUSE");
                    } else {
                       
                        ig.music.stop();
                        ig.system.stopRunLoop();
                        $(this).text("RESUME");
                    }
                    ig.paused = !ig.paused;

                }


        });


            $('input[type="radio"]').click(function () {
                ig.chosenPlayer = $(this).val();
                ig.changeScreen();
            });
                
                
                $('a.restart').click(function (){
                    ig.system.setGame(StartScreen);
                    $(".xmas-message").hide();
                })


});
