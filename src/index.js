//Dependencies Webpack  and threeJS, npm install webpack webpack-cli, npm install threeJS
// npm run-script build to compile, work on this file.
// dont change package.json
/*
 const  {config} = require('../src/config');

const rest = new (require('rest-mssql-nodejs'))({
    user: config.user,
    password: config.password,
    server: config.server,
    database:  config.database,
    encrypt:  true,
    
})

 setTimeout(async() => {
	 const resultado = await rest.executeQuery('select * from prueba');
	 console.log(resultado.data);
 },1500 );*/
 
 
//Llamada de la librerias

//import { porfin } from './coneccion';

const THREE = require('three');
// CommonJS:
const dat = require('dat.gui');
const Stats = require('stats.js');
 /*****************************START ADDED CODE***************/
      //import { Examples, ParticleEngine } from 'js/ParticleEngine.js';
     /*****************************FINISH ADDED CODE**************/




import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//Model loaders

//import {} from "./rain";
//import CameraControls from 'camera-controls';
//import {initRainParticle} from "./rain";
// CameraControls.install( { THREE: THREE } );
const canvas = document.getElementById('canvas');
const clock = new THREE.Clock();
 // Optional: Pre-fetch Draco WASM/JS module.
// dracoLoader.preload();
//Scene and render
var renderer, camera, cameraControls;
 var scene;
var bgMesh;
var engine;
var controls;
var mixer, mixer2,mixerCap;
//Lights
var spotLight, light, hemisLight;
var spotLightHelper;
//Skybox
var materiall;
var Skybox;
var video;
//Interface
var gui;
var obj;
var stats;
var childd=[];
var childdd;
//DownLoader
var INTERSECTED = null;
var raycaster = new THREE.Raycaster();

raycaster.params.Points.threshold = 0.9;
var imageData = '../client/js/images/particle2.png';

var partic;
var interactables = [];
var particleSystem;
var link_href ="https://www.google.com/";
				
				var nombre = "Jose Perez";

var mouse = new THREE.Vector2( Infinity, Infinity );
const group = new THREE.Object3D();
var Gltf_number=0;
var indexmodel=0;
var particles_mine=[];
//var particles=[];
var vertices = [];
var puede= false;
const params = {
	texture: true,
	visible:true,
	total:1000000,
	blending:  true,
	depthTest: true,
	radio: 10,
	grado: 6

};
var scaleVector = new THREE.Vector3();
var geometry = new THREE.BufferGeometry();

var textureLoader = new THREE.TextureLoader();

		
var sprite2 = textureLoader.load( "../client/js/images/particle2.png");
	
vertices.push( 0, 0, 0);
var sprite_1;
var sprite_2 ;
var sprite_3 ;
/*puede= true;
for ( let j = 0; j < params.total; j ++ ) {
	cant_cir++;
	params.radio[cant_cir]=params.radio[cant_cir-1]*cant_cir;
	
	for ( let i = 0; i < (params.radio[cant_cir]*2) && (j <  params.total) ; i ++ ) {

	
		const x = Math.cos(Math.PI*i/params.radio[cant_cir] ) * params.radio[cant_cir];//6 params.grado
		
		const z =Math.sin(Math.PI*i/params.radio[cant_cir] ) *  params.radio[cant_cir];
		vertices.push( x, 0, z );
		j++;
	}
	
}*/


geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

/*for ( let j = 0; j < params.total; j ++ ) {
geometry[j];
geometry[j].link = document.createElement('a');

geometry[j].link.href = "https://www.youtube.com/";
}*/
/*

parameters = [
	[[ 1.0, 0.2, 0.5 ], sprite2, 20 ],
	[[ 0.95, 0.1, 0.5 ], sprite3, 15 ],
	[[ 0.90, 0.05, 0.5 ], sprite1, 10 ],
	[[ 0.85, 0, 0.5 ], sprite5, 8 ],
	[[ 0.80, 0, 0.5 ], sprite4, 5 ]
];*/
parameters = [
	[[ 1.0, 0.2, 0.5 ], sprite2, 4 ]/*,
	[[ 0.95, 0.1, 0.5 ], sprite3, 5 ],
	[[ 0.90, 0.05, 0.5 ], sprite1, 5 ],
	[[ 0.85, 0, 0.5 ], sprite5, 5 ],
	[[ 0.80, 0, 0.5 ], sprite4, 5 ]*/
];
//raycaster.params.Points.threshold = parameters[ 0 ][ 2 ];
var color = parameters[ 0 ][ 0 ];
//var sprite = parameters[ 0 ][ 1 ];
	var size = parameters[ 0 ][ 2 ];

function init() 
{
	
	//DAT GUI
	gui = new dat.gui.GUI();
	obj = {
		explode: function () {
		alert('Bang!');
		},
	
		//spotlight
		posX: -25, 
		posY: 8, 
		posZ: 7,
		colorL: "#ffffff", // RGB array
		penunmbra: 0.2,
		helpSpot:true,
		intSpot:1,
		
		intAmbien:1,
		color0: "#443333", 
		intHemis:1,
		colorg: "#111122", 
	};
	
	renderer = new THREE.WebGLRenderer({ canvas });
	scene = new THREE.Scene();
    // scene.fog = new THREE.Fog( 0x443333, 1, 4 );
 /*****************************START ADDED CODE***************/
       var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2, FAR = 1000000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
     /*****************************FINISH ADDED CODE**************/
		
	
	
	//Lights
	// spotLight = new THREE.SpotLight( 0xffff00 );
	light = new THREE.AmbientLight( obj.color0 ); // soft white light
	hemisLight = new THREE.HemisphereLight( obj.color0, obj.colorg, 1 );
	

	stats = new Stats();
}

function addLights() 
{
	
	//Hemisphere light
	
	scene.add( hemisLight );
	spotLight = new THREE.SpotLight();
    spotLight.angle = Math.PI / 16;
    //spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    spotLight.position.set( obj.posX, obj.posY, obj.posZ );
	//scene.add( spotLight );
	spotLightHelper = new THREE.SpotLightHelper( spotLight );
	//scene.add( spotLightHelper );
	//fireworklight
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	//scene.add(light);
}

function addGUI() 
{
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );
	
	//particulas sphere
	var guiparameters = gui.addFolder('Particle System');

				/*
			
				guiparameters.add( params, 'total' ).min(0).max(1100000).step(1).onChange( function ( value ) {
					for ( let j = 0; j < params.total; j++ ) {
					
						
					
						scene.remove( allParticles[j] );
						
						
						
				}
				
				
    
				
				scene.remove( particleSystem );
				
					
					
					
				
					//vertices.pop;
					particulas();

				} );
				
			
			

			guiparameters.open();	*/
	
}

function main() {

	
	//Renderer
	renderer.setClearColor(0x222222);
	renderer.autoClearColor = false;
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	
    renderer.gammaFactor = 2.2;

document.body.appendChild( renderer.domElement );
	//Camera
	camera.position.x = 1000;
	camera.position.y = 1000;
	camera.position.z = 1000;
	camera.lookAt( 0, 0.1, 0 );
    controls = new OrbitControls( camera, renderer.domElement );
	addLights();
	addGUI() ;
	
    particulas();

	
	

	 /*****************************START ADDED CODE***************/
	 

	 
	 


	renderer.domElement.addEventListener( 'dblclick', onMouseClick );
	renderer.domElement.addEventListener( 'mousemove', onMouseMove );

   
	
}
function makeTextSprite( message, parameters)
{
	//parameters section
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 3;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:0.5 };
	
	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
		parameters["backgroundColor"] : "black";


		
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font =  fontsize + "px " + fontface;
    context.imageSmoothingEnabled=true;
	context.canvas.hidden=true;
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	

	
	var textWidth = metrics.width;
	// background color
	context.fillStyle   ="rgba(" + borderColor.r + "," + borderColor.g + ","
	+ borderColor.b + "," + borderColor.a + ")";
	

	// border color
	context.strokeStyle = "white"; 

	context.lineWidth = borderThickness;
	
	roundRect(context, 128/2,44/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);


	context.lineWidth = 4;
	context.fillStyle = "white";
	
	context.fillText( message, 66, 44);
	
	
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture } );
		spriteMaterial.sizeAttenuation = true;
		spriteMaterial.transparent=true;//   transparent=true;
		//material.transparent = true;
		
		spriteMaterial.opacity= 0.99;
        spriteMaterial.side= THREE.DoubleSide;
        spriteMaterial.alphaTest= 0.1;
		spriteMaterial.map.minFilter = THREE.NearestFilter;
	  
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.receiveShadow= true;
	sprite.frustumCulled=false;
	return sprite;	
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r) 
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
	ctx.stroke();   
}

function makeText( name )
{
	//parameters section
	var canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 256;
	var ctx = canvas.getContext("2d");
	ctx.font = "20pt Arial";
	ctx.fillStyle = "white";
	ctx.textAlign = "center";
	ctx.fillText(name, 128, 44);
	//console.log(ctx);
	var tex = new THREE.Texture(canvas);
	tex.needsUpdate = true;
	var spriteMat = new THREE.SpriteMaterial({
	  map: tex
	});
	var sprite = new THREE.Sprite(spriteMat);

	
	sprite.receiveShadow= true;
	sprite.frustumCulled=false;
	return sprite;	
}


function displayWindowSize(){

	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	
	
	renderer.setSize(w, h);
	
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
	
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}


window.addEventListener("resize", displayWindowSize);

function onMouseClick( event ) {

	if ( INTERSECTED !== null )partic.object.userData.particles[ partic.index ].link.click(); 
}
function onMouseMove( event ) {
      
	event.preventDefault();
  
		  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function animate() 
{
	

  requestAnimationFrame(animate);
  
  render();
  renderer.render(scene, camera);
 
  stats.update();
  var dt = clock.getDelta();
 
}

//------------------------------------------------------------download


  var  parameters;
		//	let mouseX = 0, mouseY = 0;

			//let windowHalfX = window.innerWidth / 2;
		//	let windowHalfY = window.innerHeight / 2;

			var  materials = [];

			

			var allParticles = [
				
			];
			function particulas() {

			
				
				
				var cant_cir=0;
				params.radio= 30;

vertices.push( 0, 0, 0);

var material= new THREE.PointsMaterial( { size: 60,map:sprite2  , blending: THREE.AdditiveBlending, depthTest: params.depthTest, transparent: params.visible } );


var center = new THREE.Points( geometry, material );

center.position.x =0;
center.position.y = 0;
center.position.z = 0;
scene.add(center);
var espacio=10;
			for ( let j = 0; j < params.total; j ++ ) {
					cant_cir++;
					if(cant_cir%espacio==0){
						params.radio=params.radio+espacio;
						espacio=espacio*2;

					}
					params.radio=params.radio+10;
					
				for ( let i = 0; i < (params.radio*2) && (j <  params.total); i ++) {


				


					
				 allParticles[j] = { name: j, position: new THREE.Vector3(  Math.cos(Math.PI*i/params.radio ) * params.radio, 0, Math.sin(Math.PI*i/params.radio ) *  params.radio ),link : document.createElement('a') };
				 allParticles[j].link.href = link_href;
		
					j++;
				}
				j--;
					
			}
				
	

				// Create the particles once the texture has loaded
				new THREE.TextureLoader().load( imageData, function( texture ) {
					var particles = new THREE.Geometry();
		
					var pMaterial = new THREE.PointsMaterial({
						map: texture,
						size: 5,
						transparent: false,
						//sizeAttenuation: false,
						//vertexColors: THREE.VertexColors,
						blending: THREE.AdditiveBlending,
						 depthTest: false,
					});
		
					particleSystem = new THREE.Points( particles, pMaterial );
					particleSystem.name = "cumeda";
					particleSystem.userData.particles = []; // to keep track of particles
		
					allParticles.forEach( function( particle ) {
						particles.vertices.push( particle.position );
						// Give each particle its own unique colour ... (we could
						// do this on-demand as a refinement, perhaps temporarily give
						// it a different THREE.Color on hover, for example)
						var uniqueColor = new THREE.Color( 0xFFFFFF );
						particles.colors.push( uniqueColor );
						particle.uniqueColor = uniqueColor;
						// Make sure we can later find our particle again
						particleSystem.userData.particles.push( particle );
					});
					
					scene.add( particleSystem );
				});
		
		

	

			}

		

			function render() {

			
			
				raycast();
				renderer.render( scene, camera );

			}

 
function raycast() {     
	raycaster.setFromCamera( mouse, camera );	
	var intersects  ;
	
	
  
	  
	  
  
  
	
  intersects =  raycaster.intersectObject( particleSystem, true );
  
  
  
  
	
			if ( intersects.length > 0 ) {
				if(INTERSECTED != intersects[ 0 ].object){
					  if(INTERSECTED){// intersected has an object but the user is not hovering an object anymore
						  //intersect=INTERSECTED;
						  
						//  INTERSECTED.remove(INTERSECTED.children[2]);// turn visible the name
						//  INTERSECTED.remove(INTERSECTED.children[1]);// turn visible the name
						 INTERSECTED.remove(INTERSECTED.children[0]);// turn visible the name
						 
						  
  
					  }
				  //looking for the object.name that match the label with the currency in the matrix
					INTERSECTED = intersects[ 0 ].object;
					
					//	console.log( 'got a click on particle',particle.object.userData.particles[ particle.index ].name );
					// create sprites here
						
					

						
					
				}
				intersects = intersects.sort( function( a, b ) {
					return a.distanceToRay - b.distanceToRay;
					});
				 partic = intersects[0];
				sprite_1= makeTextSprite( " "+(partic.index +1)+ "  ", { fontsize: 24}  );//( " "+(partic.index +1)+ "  ");
				sprite_2=makeText(link_href);
				sprite_3=makeText( "  "+nombre+" ");
				//if((0<=partic.index)&&partic.index<=params.total){	
					//console.log( 'got a click on particle', partic.index  );
					sprite_1.position.x= allParticles[partic.index].position.x;
					sprite_1.position.y= 1;
					sprite_1.position.z= allParticles[partic.index].position.z;
					sprite_2.position.x= allParticles[partic.index].position.x;
					sprite_2.position.y= 2;
					sprite_2.position.z= allParticles[partic.index] .position.z;
					sprite_3.position.x= allParticles[partic.index].position.x;
					sprite_3.position.y= 3;
					sprite_3.position.z= allParticles[partic.index] .position.z;
					var scaleFactor = 9;
					var scale = scaleVector.subVectors(allParticles[partic.index].position, camera.position).length() / scaleFactor;

					sprite_1.scale.set(scale, scale, 1);
					sprite_2.scale.set(scale, scale, 1);
					sprite_3.scale.set(scale, scale, 1);
			//	}
				
				partic.object.add(sprite_1);
				//partic.object.add(sprite_2);
				//partic.object.add(sprite_3);
	  
			} else {
			  
			  if(INTERSECTED){// intersected has an object but the user is not hovering an object anymore
				//INTERSECTED.remove(INTERSECTED.children[2]);// turn visible the name
				  //INTERSECTED.remove(INTERSECTED.children[1]);// turn visible the name
				  INTERSECTED.remove(INTERSECTED.children[0]);// turn visible the name
			
				  
				  
			  }
			  //sprite_1=null;
				 // sprite_2=null;
				 // sprite_3=null;
			  INTERSECTED=null;
			  //partic=null;
			  
			}
		  
			
  
  
  }
init();
main();
animate();



