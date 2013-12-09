ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.entities.player',
    'game.levels.main',
    'game.levels.room1',
    'game.levels.room2',
    'game.levels.room3'
    ,'game.levels.room4'
    ,'game.levels.room5'
    ,'balmain.camera'
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
    hudText: new ig.Font('media/font.png'),
    bagImage: new ig.Image('media/bagHud.png'),
    gameTimer: null,
    welcomeTimer: null,
	
    init: function() {
            ig.screen = "Main";
            ig.changeScreen();
            
            
        /*if(ig.ua.mobile) {
            $("#controls").show();
        }; */   
            
        this.welcomeTimer = new ig.Timer();
        //$(".message").show();
        this.welcomeTimer.set(10);
		// Initialize your game here; bind keys etc.
        ig.input.bind(ig.KEY.LEFT_ARROW, "left");
        ig.input.bind(ig.KEY.RIGHT_ARROW, "right");
        ig.input.bind(ig.KEY.SPACE, "jump");
        ig.input.bind(ig.KEY.UP_ARROW, "jump");

       /* ig.input.bindTouch( '#jump', 'jump' );
        ig.input.bindTouch( '#left', 'left' );
        ig.input.bindTouch( '#right', 'right' );*/


        this.gameTimer = ig.gameTimer = new ig.Timer();
       

        // Ready to Rock!
       // ig.music.play();
        ig.music.volume = 0;

        this.camera = new Camera( ig.system.width/4, ig.system.height/3, 5 );
        this.camera.trap.size.x = ig.system.width/10;
        this.camera.trap.size.y = ig.system.height/3;
        this.camera.lookAhead.x = ig.ua.mobile ? ig.system.width/6 : 0;
        this.loadLevel(this.currentLevel);
        
        var ElevatorDelay = ig.game.getEntityByName("delay1");
        if(ElevatorDelay) {
            if(!ig.Sound.enabled) {
                ElevatorDelay.delay = 1;
            }
            
        }

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
                    //$(".message").hide();
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
            
            console.log(secs);
    }
});


StartScreen = ig.Game.extend({
            
            bgtune: new ig.Sound( 'media/sfx/JingleBells.*', false ),
            bgtuneStart: new ig.Sound( 'media/sfx/LittleDrummerBoy.*', false ),
            bgtuneEnd: new ig.Sound( 'media/sfx/MerryChristmas.*', false ),
            bgImage: new ig.Image('media/titlescreen/background.jpg'),
            Text: new ig.Font('media/font.png'),
            Text_mobile: new ig.Font('media/font_12.png'),
            
            init: function(){
                ig.screen = "Start";
                ig.changeScreen();
                if(gameWidth < gameHeight) {
                    $("#title-screen > img.portrait").show();
                    $("#title-screen > img.landscape").hide();
                } else {
                    $("#title-screen > img.portrait").hide();
                    $("#title-screen > img.landscape").show();
                }  
                $("#title-screen").show();
                $("#choosePlayerWrap").show();
                ig.input.bind(ig.KEY.SPACE, "start");
                //ig.input.bindTouch("#title-screen", "start");
                // Now add the file to the playlist
                ig.music.add( this.bgtuneStart );
                // Now add the file to the playlist
                ig.music.add( this.bgtune );
                ig.music.add( this.bgtuneEnd );
                // Ready to Rock!
                ig.music.play();
                ig.music.loop = true;
                
            },

            update: function() {
                if(ig.input.pressed('start')) {
                     $("#title-screen").hide();
                     $("#choosePlayerWrap").hide();
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
                this.bgImage.draw(0,0);
                
                if(ig.ua.mobile) {
                     this.Text_mobile.draw("TOUCH THE SCREEN TO START", ig.system.width/2, ig.system.height - 30, ig.Font.ALIGN.CENTER );
                    
                } else {
                    this.Text.draw("PRESS SPACEBAR TO START", ig.system.width/2, ig.system.height - 50, ig.Font.ALIGN.CENTER );
                }
               
            }

        });
        EndScreen = ig.Game.extend({
            bgImage: new ig.Image('media/titlescreen/background.jpg'),
            Text: new ig.Font('media/font.png'),
            Text_mobile: new ig.Font('media/font_12.png'),
            init: function(){
                ig.screen = "End";
                ig.changeScreen();
                 if(gameWidth < gameHeight) {
                    $("#title-screen > img.portrait").show();
                    $("#title-screen > img.landscape").hide();
                } else {
                    $("#title-screen > img.portrait").hide();
                    $("#title-screen > img.landscape").show();
                }  
                $("#title-screen").show();
                
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
                
                this.bgImage.draw(0,0);
                
                if(ig.ua.mobile) {
                     this.Text_mobile.draw("TOUCH THE SCREEN TO PLAY AGAIN", ig.system.width/2, ig.system.height - 30, ig.Font.ALIGN.CENTER );
                    
                } else {
                    this.Text.draw("PRESS SPACEBAR TO PLAY AGAIN", ig.system.width/2, ig.system.height - 50, ig.Font.ALIGN.CENTER );
                }
            }

        });
        
        
        
        
/*var imgradams = new ig.Image( 'media/titlescreen/radams_front_h.png' ); 
var imgxalpatova = new ig.Image( 'media/titlescreen/xalpatova_front_h.png' ); 
var imgjarnold = new ig.Image( 'media/titlescreen/jarnold_front_h.png' ); 
var imggatsalakis = new ig.Image( 'media/titlescreen/gatsalakis_front_h.png' ); 
var imgcbaker = new ig.Image( 'media/titlescreen/cbaker_front_h.png' ); 
var imgnbeckett = new ig.Image( 'media/titlescreen/nbeckett_front_h.png' ); 
var imgpblanc = new ig.Image( 'media/titlescreen/pblanc_front_h.png' ); 
var imglbooth = new ig.Image( 'media/titlescreen/lbooth_front_h.png' ); 
var imgpbritt = new ig.Image( 'media/titlescreen/pbritt_front_h.png' ); 
var imgsbudd = new ig.Image( 'media/titlescreen/sbudd_front_h.png' ); 
var imgjbudzynski = new ig.Image( 'media/titlescreen/jbudzynski_front_h.png' ); 
var imgnbullick = new ig.Image( 'media/titlescreen/nbullick_front_h.png' ); 
var imgmcaleite = new ig.Image( 'media/titlescreen/mcaleite_front_h.png' ); 
var imgmcastle = new ig.Image( 'media/titlescreen/mcastle_front_h.png' ); 
var imgjchilds = new ig.Image( 'media/titlescreen/jchilds_front_h.png' ); 
var imgmchow = new ig.Image( 'media/titlescreen/mchow_front_h.png' ); 
var imgpcleary = new ig.Image( 'media/titlescreen/pcleary_front_h.png' ); 
var imgmcostello = new ig.Image( 'media/titlescreen/mcostello_front_h.png' ); 
var imgacox = new ig.Image( 'media/titlescreen/acox_front_h.png' ); 
var imgacrestani = new ig.Image( 'media/titlescreen/acrestani_front_h.png' ); 
var imgccrocker = new ig.Image( 'media/titlescreen/ccrocker_front_h.png' ); 
var imgpcunningham = new ig.Image( 'media/titlescreen/pcunningham_front_h.png' ); 
var imgbdavis = new ig.Image( 'media/titlescreen/bdavis_front_h.png' ); 
var imgsday = new ig.Image( 'media/titlescreen/sday_front_h.png' ); 
var imgtdooney = new ig.Image( 'media/titlescreen/tdooney_front_h.png' ); 
var imggdrummond = new ig.Image( 'media/titlescreen/gdrummond_front_h.png' ); 
var imgcdunn = new ig.Image( 'media/titlescreen/cdunn_front_h.png' ); 
var imgtdynon = new ig.Image( 'media/titlescreen/tdynon_front_h.png' ); 
var imgdfarrant = new ig.Image( 'media/titlescreen/dfarrant_front_h.png' ); 
var imgrfazzolari = new ig.Image( 'media/titlescreen/rfazzolari_front_h.png' ); 
var imgmfazzolari = new ig.Image( 'media/titlescreen/mfazzolari_front_h.png' ); 
var imgjfield = new ig.Image( 'media/titlescreen/jfield_front_h.png' ); 
var imgmfinlayson = new ig.Image( 'media/titlescreen/mfinlayson_front_h.png' ); 
var imgwfoster = new ig.Image( 'media/titlescreen/wfoster_front_h.png' ); 
var imgafurfaro = new ig.Image( 'media/titlescreen/afurfaro_front_h.png' ); 
var imgdgallen = new ig.Image( 'media/titlescreen/dgallen_front_h.png' ); 
var imgggigliotti = new ig.Image( 'media/titlescreen/ggigliotti_front_h.png' ); 
var imgagriffin = new ig.Image( 'media/titlescreen/agriffin_front_h.png' ); 
var imgdhancock = new ig.Image( 'media/titlescreen/dhancock_front_h.png' ); 
var imgwhann = new ig.Image( 'media/titlescreen/whann_front_h.png' ); 
var imgrharbidge = new ig.Image( 'media/titlescreen/rharbidge_front_h.png' ); 
var imgrhardie = new ig.Image( 'media/titlescreen/rhardie_front_h.png' ); 
var imgthardy = new ig.Image( 'media/titlescreen/thardy_front_h.png' ); 
var imgshindson = new ig.Image( 'media/titlescreen/shindson_front_h.png' ); 
var imgaholloway = new ig.Image( 'media/titlescreen/aholloway_front_h.png' ); 
var imgmholm = new ig.Image( 'media/titlescreen/mholm_front_h.png' ); 
var imgjhoward = new ig.Image( 'media/titlescreen/jhoward_front_h.png' ); 
var imgjilic = new ig.Image( 'media/titlescreen/jilic_front_h.png' ); 
var imgpjenkins = new ig.Image( 'media/titlescreen/pjenkins_front_h.png' ); 
var imgdjones = new ig.Image( 'media/titlescreen/djones_front_h.png' ); 
var imgjkerr = new ig.Image( 'media/titlescreen/jkerr_front_h.png' ); 
var imgdkimmorley = new ig.Image( 'media/titlescreen/dkimmorley_front_h.png' ); 
var imgtleckie = new ig.Image( 'media/titlescreen/tleckie_front_h.png' ); 
var imgaleong = new ig.Image( 'media/titlescreen/aleong_front_h.png' ); 
var imgklihou = new ig.Image( 'media/titlescreen/klihou_front_h.png' ); 
var imgblissington = new ig.Image( 'media/titlescreen/blissington_front_h.png' ); 
var imgjlogan = new ig.Image( 'media/titlescreen/jlogan_front_h.png' ); 
var imgimaljkovic = new ig.Image( 'media/titlescreen/imaljkovic_front_h.png' ); 
var imglmcginn = new ig.Image( 'media/titlescreen/llangley_front_h.png' ); 
var imglmckenzie = new ig.Image( 'media/titlescreen/lmckenzie_front_h.png' ); 
var imgzmircevski = new ig.Image( 'media/titlescreen/zmircevski_front_h.png' ); 
var imgamorgan = new ig.Image( 'media/titlescreen/amorgan_front_h.png' ); 
var imghmunnecke = new ig.Image( 'media/titlescreen/hmunnecke_front_h.png' ); 
var imgdnolan = new ig.Image( 'media/titlescreen/dnolan_front_h.png' ); 
var imgmofford = new ig.Image( 'media/titlescreen/mofford_front_h.png' ); 
var imgaoliveira = new ig.Image( 'media/titlescreen/aoliveira_front_h.png' ); 
var imgdosullivan = new ig.Image( 'media/titlescreen/dosullivan_front_h.png' ); 
var imgapapac = new ig.Image( 'media/titlescreen/apapac_front_h.png' ); 
var imgnpennell = new ig.Image( 'media/titlescreen/npennell_front_h.png' ); 
var imglpham = new ig.Image( 'media/titlescreen/lpham_front_h.png' ); 
var imgvpickles = new ig.Image( 'media/titlescreen/vpickles_front_h.png' ); 
var imghquinn = new ig.Image( 'media/titlescreen/hquinn_front_h.png' ); 
var imgjrana = new ig.Image( 'media/titlescreen/jrana_front_h.png' ); 
var imgjrobles = new ig.Image( 'media/titlescreen/jrobles_front_h.png' ); 
var imgasamuel = new ig.Image( 'media/titlescreen/asamuel_front_h.png' ); 
var imgsscotchmer = new ig.Image( 'media/titlescreen/sscotchmer_front_h.png' ); 
var imgqselden = new ig.Image( 'media/titlescreen/qselden_front_h.png' ); 
var imgvsharma = new ig.Image( 'media/titlescreen/vsharma_front_h.png' ); 
var imgtsherston = new ig.Image( 'media/titlescreen/tsherston_front_h.png' ); 
var imgdsmith = new ig.Image( 'media/titlescreen/dsmith_front_h.png' ); 
var imgesretenovich = new ig.Image( 'media/titlescreen/esretenovich_front_h.png' ); 
var imgjstefanatos = new ig.Image( 'media/titlescreen/jstefanatos_front_h.png' ); 
var imgsstephens = new ig.Image( 'media/titlescreen/sstephens_front_h.png' ); 
var imgrtaylor = new ig.Image( 'media/titlescreen/rtaylor_front_h.png' ); 
var imgctennant = new ig.Image( 'media/titlescreen/ctennant_front_h.png' ); 
var imgmthompson = new ig.Image( 'media/titlescreen/mthompson_front_h.png' ); 
var imgftjia = new ig.Image( 'media/titlescreen/ftjia_front_h.png' ); 
var imgstunley = new ig.Image( 'media/titlescreen/stunley_front_h.png' ); 
var imggvazey = new ig.Image( 'media/titlescreen/gvazey_front_h.png' ); 
var imgkwalsh = new ig.Image( 'media/titlescreen/kwalsh_front_h.png' ); 
var imgbwardley = new ig.Image( 'media/titlescreen/bwardley_front_h.png' ); 
var imgwwescott = new ig.Image( 'media/titlescreen/wwescott_front_h.png' ); 
var imgmwilson = new ig.Image( 'media/titlescreen/mwilson_front_h.png' ); 
var imgoyeung = new ig.Image( 'media/titlescreen/oyeung_front_h.png' ); */
        
        ig.mute = false;
        ig.paused = false;
        ig.chosenPlayer = "mholm"; //$("input[type='radio']:checked").val();
        ig.screen = "Start";
        
        ig.changeScreen = function() {
            var portraitSrc = "";
            var landscapeSrc = "";
            
          if(ig.screen == "Start") {
              portraitSrc = "media/titlescreen/" + ig.chosenPlayer + "_front_v.png";
              landscapeSrc = "media/titlescreen/" + ig.chosenPlayer + "_front_h.png";
             
          } else if (ig.screen == "End") {
              portraitSrc = "media/titlescreen/end_screen_portrait.png";
              landscapeSrc = "media/titlescreen/end_screen.png";
          }
          $("#title-screen > img.portrait").attr("src", portraitSrc);
          $("#title-screen > img.landscape").attr("src", landscapeSrc);
        };
        
        
        //$("#title-screen > img.landscape").show();
        //ig.Sound.enabled = false;
        var ratio = 2.2;
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
            
            $("#title-screen").width(gameWidth).height(gameHeight);
            if(gameWidth < gameHeight) {
                $("#title-screen > img.portrait").show();
                $("#title-screen > img.landscape").hide();
            }
            ig.main('#canvas', StartScreen, 60,  gameWidth, gameHeight, 1);
        } else if (ig.ua.iPhone) {
            
            $(".wrapper").width("100%");
            $(".header, #bottom-section").hide();
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
                $("#title-screen").width(gameWidth).height(gameHeight);
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
                    $(".message").hide();
                })


});
