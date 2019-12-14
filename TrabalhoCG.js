import * as THREE from './libs/js/three.js/build/three.module.js';

import { OrbitControls } from './libs/js/three.js/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from './libs/js/three.js/examples/jsm/loaders/FBXLoader.js';

var container, controls;
var camera, scene, renderer,light;

init();
animate();

function init(){
    
    // Colors
    var sky = 0xb3ecff;
    var green = 0x004d00;
    var ground_color = green;
    var bg_color = sky;
    
    
    // Render localization
    container = document.createElement('div');
    document.body.appendChild( container );
    document.addEventListener('keydown',onDocumentKeyDown,false);

    // Camera ajusts
    camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.set( -350, 200, 350 );

    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( bg_color );
    scene.fog = new THREE.Fog( bg_color, 500, 1200 );


    // Create Lights
    light = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    light.position.set( 0, 200, 0 );
    scene.add( light );

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 200, 100 );
    light.castShadow = true;
    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = - 100;
    light.shadow.camera.left = - 120;
    light.shadow.camera.right = 120;
    scene.add( light );

    // ground
    var gt = new THREE.TextureLoader().load("../../src/Ground.png");
    var mesh = new THREE.Mesh( 
        new THREE.PlaneBufferGeometry( 2000, 2000 ), 
        new THREE.MeshPhongMaterial( { color: 0xffffff, 
                                       map: gt 
                                     } ) 
        );
    mesh.rotation.x = - Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add( mesh );
    
    //Pokémons
    var Magikarp = {
        name:'Magikarp',
        rotation:{x:0,y:3.14,z:0},
        translation:{x:15000,y:0,z:0},
        texture:'pm0129_00_Body1.png',
    }    
    loadModelFBX(Magikarp);
    
    var MagikarpShiny = {
        name:'MagikarpShiny',
        rotation:{x:0,y:3.14,z:0},
        translation:{x:15000,y:0,z:0},
        texture:'pm0129_00_Body1.png',
    }    
    loadModelFBX(MagikarpShiny);
    
    var Samurott = {
        name:'Samurott',
        rotation:{x:0,y:3.14,z:0},
        translation:{x:15000,y:0,z:0},
        texture:'pm0503_00_BodyA1.png',
    }    
    loadModelFBX(Samurott);
    
    var SamurottShiny = {
        name:'SamurottShiny',
        rotation:{x:0,y:3.14,z:0},
        translation:{x:15000,y:0,z:0},
        texture:'pm0503_00_BodyA1.png',
    }    
    loadModelFBX(SamurottShiny);

    var Talonflame = {
        name:'Talonflame',
        rotation:{x:0,y:3.14,z:0},
        translation:{x:15000,y:0,z:0},
        texture:'pm0755_00_BodyA1.png',
    }    
    loadModelFBX(Talonflame);

    var TalonShiny = {
        name:'TalonShiny',
        rotation:{x:0,y:3.14,z:0},
        translation:{x:15000,y:0,z:0},
        texture:'pm0755_00_BodyA1.png',
    }    
    loadModelFBX(TalonShiny);

    var Vulpix = {
        name:'Vulpix',
        rotation:{x:0,y:3.14,z:0},
        translation:{x:15000,y:0,z:0},
        texture:'pm0037_00_BodyA1.png',
    }    
    loadModelFBX(Vulpix);   
   
    var VulpixShiny = {
        name:'VulpixShiny',
        rotation:{x:0,y:3.14,z:0},
        translation:{x:15000,y:0,z:0},
        texture:'pm0037_00_BodyA1.png',
    }    
    loadModelFBX(VulpixShiny);  
    
    var Wigglytuff = {
        name:'Wigglytuff',
        rotation:{x:0,y:3.14,z:0},
        translation:{x:15000,y:0,z:0},
        texture:'pm0040_00_Body1.png',
    }    
    loadModelFBX(Wigglytuff);    
    
    var WigglytuffShiny = {
        name:'WigglytuffShiny',
        rotation:{x:0,y:3.14,z:0},
        translation:{x:15000,y:0,z:0},
        texture:'pm0040_00_Body1.png',
    }    
    loadModelFBX(WigglytuffShiny);

    // Audio
    
    // Render Model
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;

    // Include model on Render localization
    container.appendChild( renderer.domElement);

    // Turn on the controls
    controls = new OrbitControls( camera, renderer.domElement );
    controls.keys = {}; // Turn of keyboard camera motion
    controls.target.set( 0, 100, 0 );
    controls.update();
}

// Function to run all render
function animate() {
    requestAnimationFrame( animate );
    if(scene.rotation.y >= -3.16){
        scene.rotation.y -= 100* Math.PI/180;
    }
    renderer.render( scene, camera );
}

function loadModelFBX(model){
    var loader = new FBXLoader();
    loader.load( './src/models/'+model.name+'/'+model.name+'.FBX', function ( object ) {
            object.name = model.name;
        //Translation
            object.translateX(model.translation.x);
            object.translateY(model.translation.y);
            object.translateZ(model.translation.z);
        //Rotations
            object.rotateX(model.rotation.x);
            object.rotateY(model.rotation.y);
            object.rotateZ(model.rotation.z);
        //Textures
            var texture = new THREE.TextureLoader().load('./src/models/'+model.name+'/'+model.texture);
            object.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.material = new THREE.MeshBasicMaterial( { map: texture } );
                    child.receiveShadow = true;
                    child.castShadow = true;
                }
            } );

        scene.add( object );
    } );
}

function callPokeBall(){
    setTimeout(function(){
        Pokeball.translateY(50);
        Pokeball.rotateY(1);
        setTimeout(function(){
            Pokeball.rotateY(-2);
            setTimeout(function(){
                Pokeball.rotateY(1);
            }, 150);
            Pokeball.translateY(-50);                
        }, 150);        
    }, 500);
    setTimeout(function(){
        Pokeball.rotateY(1);
        setTimeout(function(){
            Pokeball.rotateY(-2);
            setTimeout(function(){
                Pokeball.rotateY(1);
            }, 150);
        }, 150);
    }, 500);
}

var pt = new THREE.TextureLoader().load("../../src/ob0204_01.png");
var geometry = new THREE.SphereGeometry( 30, 32, 32 );
var material = new THREE.MeshPhysicalMaterial( {color: 0xffffff, map: pt} );
var Pokeball = new THREE.Mesh( geometry, material );
Pokeball.translateY(80);
Pokeball.translateX(10);
Pokeball.rotateY(19.8);
scene.add( Pokeball );

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function onDocumentKeyDown(event){
    var Magikarp = scene.getObjectByName( "Magikarp" );
    var MagikarpShiny = scene.getObjectByName("MagikarpShiny");
    var Samurott = scene.getObjectByName( "Samurott" );
    var SamurottShiny = scene.getObjectByName( "SamurotShiny" );
    var Talonflame= scene.getObjectByName( "Talonflame" );
    var TalonShiny= scene.getObjectByName( "TalonShiny" );
    var Vulpix= scene.getObjectByName( "Vulpix" );
    var VulpixShiny = scene.getObjectByName( "VulpixShiny" );
    var Wigglytuff= scene.getObjectByName( "Wigglytuff" );
    var WigglytuffShiny = scene.getObjectByName( "WigglytuffShiny" );
    var num;

    var audio = scene.getObjectByName( "bg" );
    event = event || window.event;
    var keycode = event.keyCode;
    console.log(keycode); // Get keycode from pressed keys
    
    if(keycode == 32){
            num = getRandomInt(0,5);
            //num = 4
            //Magikarp
            if(num == 0){
                var shiny = getRandomInt(0,2);
                //var shiny = 0
                if(!shiny){
                    callPokeBall();
                    setTimeout(function(){
                    Magikarp.translateX(15000);
                    Pokeball.translateX(-15000);
                    }, 1300);

                    setTimeout(function(){
                    Magikarp.translateX(-15000);
                    Pokeball.translateX(15000);
                    }, 6000);   
                    setTimeout(function(){
                        swal({title:'MAGIKARP',})
                    }, 3500);
                    
                }
                else{
                    callPokeBall();
                    setTimeout(function(){
                        MagikarpShiny.translateX(15000);
                        Pokeball.translateX(-15000);
                    }, 1300);

                    setTimeout(function(){
                        MagikarpShiny.translateX(-15000);
                        Pokeball.translateX(15000);
                    }, 3500);
                    setTimeout(function(){
                        swal('MAGIKARP SHINY','Parabéns, o pokemón brilhou!','warning')
                    }, 3500);
                }
            }
            //Samurott
            if(num == 1){
                var shiny = getRandomInt(0,10);
                if(shiny == 0){
                    callPokeBall();
                    setTimeout(function(){
                        SamurottShiny.translateX(15000);
                        Pokeball.translateX(-15000);
                    }, 1300);
        
                    setTimeout(function(){
                        SamurottShiny.translateX(-15000);
                        Pokeball.translateX(15000);
                    }, 3500);        
                    setTimeout(function(){
                        swal('SAMUROTT SHINY','Parabéns, o pokemón brilhou!','warning')
                    }, 3500);                
                }
                else{
                    callPokeBall();
                    setTimeout(function(){
                        Samurott.translateX(15000);
                        Pokeball.translateX(-15000);
                    }, 1300);

                    setTimeout(function(){
                        Samurott.translateX(-15000);
                        Pokeball.translateX(15000);
                    }, 3500);
                }
               setTimeout(function(){
                    swal({title:'SAMUROTT',})
                }, 3500);

            }
            //Talon
            if(num == 2){
                var shiny = getRandomInt(0,10);
                if(shiny == 1){
                    callPokeBall();
                    setTimeout(function(){
                        TalonShiny.translateX(15000);
                        Pokeball.translateX(-15000);
                    }, 1300);
        
                    setTimeout(function(){
                        TalonShiny.translateX(-15000);
                        Pokeball.translateX(15000);
                    }, 3500);
                    setTimeout(function(){
                        swal('TALONFLAME SHINY','Parabéns, o pokemón brilhou!','warning')
                    }, 3500);
                }
                else{
                    callPokeBall();
                    setTimeout(function(){
                        Talonflame.translateX(15000);
                        Pokeball.translateX(-15000);
                    }, 1300);
            
                    setTimeout(function(){
                        Talonflame.translateX(-15000);
                        Pokeball.translateX(15000);
                    }, 3500);
                    setTimeout(function(){
                        swal({title:'TALONFLAME',})
                    }, 3500);
                }
            }
            //Vulpix
            if(num == 3){
                var shiny = getRandomInt(0,10);
                if(shiny == 1){
                    callPokeBall();
                    setTimeout(function(){
                        VulpixShiny.translateX(15000);
                        Pokeball.translateX(-15000);
                    }, 1300);
        
                    setTimeout(function(){
                        VulpixShiny.translateX(-15000);
                        Pokeball.translateX(15000);
                    }, 3500);
                    setTimeout(function(){
                        swal('VULPIX SHINY','Parabéns, o pokemón brilhou!','warning')
                    }, 3500);
                }
                else{
                    callPokeBall();
                    setTimeout(function(){
                        Vulpix.translateX(15000);
                        Pokeball.translateX(-15000);
                    }, 1300);
                
                    setTimeout(function(){
                        Vulpix.translateX(-15000);
                        Pokeball.translateX(15000);
                    }, 3500);    
                    setTimeout(function(){
                        swal({title:'VULPIX',})
                    }, 3500);                    
                }
            }
            //Wigglytuff
            if(num == 4){
                var shiny = getRandomInt(0,10);
                if(shiny == 1){
                    callPokeBall();
                    setTimeout(function(){
                        WigglytuffShiny.translateX(15000);
                        Pokeball.translateX(-15000);
                    }, 1300);
        
                    setTimeout(function(){
                        WigglytuffShiny.translateX(-15000);
                        Pokeball.translateX(15000);
                    }, 3500);
                    setTimeout(function(){
                        swal('WIGGLYTUFF SHINY','Parabéns, o pokemón brilhou!','warning')
                    }, 3500);
                }
                else{
                    callPokeBall();
                    setTimeout(function(){
                        Wigglytuff.translateX(15000);
                        Pokeball.translateX(-15000);
                    }, 1300);

                    //Audio
                    setTimeout(function(){
                        var loader = new THREE.AudioLoader();
                    
                        loader.load('./libs/audio/wigglytuff.mp3',
                        function ( audioBuffer ) {
                                ambientSound.name = 'bg';
                                ambientSound.setBuffer( audioBuffer );
                                ambientSound.setVolume(0.5).setLoop(false);
                                ambientSound.play();
                        }, );   

                        var ambientSound = new THREE.Audio( new THREE.AudioListener() );
                        scene.add( ambientSound );
                    }, 1700);

                    setTimeout(function(){
                        Wigglytuff.translateX(-15000);
                        Pokeball.translateX(15000);
                    }, 7800);

                    setTimeout(function(){
                        swal({title:'WIGGLYTUFF',})
                    }, 3500);
                }
            }
        }        
    
}