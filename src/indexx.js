

//Dependencies Webpack  and threeJS, npm install webpack webpack-cli, npm install threeJS
// npm run-script build to compile, work on this file.
// dont change package.json
 

//Llamada de la librerias
const THREE = require('three');
// CommonJS:
const dat = require('dat.gui');
const Stats = require('stats.js');
import CameraControls from 'camera-controls';
import { random } from 'lodash';
CameraControls.install({THREE : THREE});

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


//Model loaders
const cameraM = new THREE.PerspectiveCamera(40, window.innerWidth/window.innerHeight, 0.1, 1000);
cameraM.position.set(5000, 5000, 5000);
//variable for camera change (future implementation)
let activeCamera = cameraM


//movement speed variable
let speedMovement = 300;
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;


// CameraControls.install( { THREE: THREE } );
const canvas = document.getElementById('canvas');
const clock = new THREE.Clock();
 // Optional: Pre-fetch Draco WASM/JS module.
// dracoLoader.preload();
//Scene and render
var renderer, scene, scene2, bgScene, camera;
renderer = new THREE.WebGLRenderer({ canvas , antialias: true});
const cameraControls = new CameraControls( activeCamera, renderer.domElement );
cameraControls.setLookAt( 200000, 200000, 200000, 0.0001, 2, 0, false );
cameraControls.maxDistance = 0.0001;
cameraControls.minDistance = 0;
cameraControls.truckSpeed = 2.0;


var controls;

//Lights
var spotLight, light, hemisLight;

//Skybox
var materiall;
var Skybox;
var video=[];

//Interface
var gui;
var obj;
var stats;

//Info-sphere
var sphere_cant_compound = [];// cantidad de spheres
var sphere_cant_exchange = [];// cantidad de spheres
var Date_number=0;//cantidad de fechas
var planets = [];
var mouse = new THREE.Vector2(1, 1);
var intersects = [];
var INTERSECTED = null;
var raycaster = new THREE.Raycaster();
var radii;
var timestamp;timestamp=0;
var timestamp2;timestamp2=0;
var scaleVector = new THREE.Vector3();
var planet_x;
var planet_y;
var planet_z;
var bars_x;
var bars_z;
var orbit=[];
var colors_array_1=[];
var info_bars= [[]];
var colors_array_2=[];
var sprite= [];
var sprite_2= [];
var camera_position_x;
var camera_position_y;
var camera_position_z;
var Sumarry; 
var mat= [];
var action= false;
var x;var y;

function init() 
{
	
	//DAT GUI
	gui = new dat.gui.GUI();
	obj = {
		explode: function () {
		alert('Bang!');
		},
	
		//spotlight
		posX: 0, 
		posY: 2000, 
		posZ: 2000,
		colorL: "#ffffff", // RGB array
		penunmbra: 5,
		helpSpot:true,
		intSpot:0,
		
		intAmbien:0,
		color0: "#443333", 
		intHemis:0,
		colorg: "#111122", 
	};
	
	//first scene where everything is
	scene = new THREE.Scene();
	//second scene where are the matrix with the currency
	scene2= new THREE.Scene();
    
	// set in up the camera 
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2,
	 FAR = 200000;// FAR of the camera
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
    
	
	
	//Lights
	light = new THREE.AmbientLight( obj.color0 ); // soft white light
	// hemispherelight
	hemisLight = new THREE.HemisphereLight( obj.color0, obj.colorg,0);
	

	stats = new Stats();
}

function addLights() 
{
	
	scene.add( hemisLight );
	spotLight = new THREE.SpotLight();
    spotLight.angle = Math.PI / 16;
    spotLight.penumbra = 5;
    spotLight.castShadow = true;
    spotLight.position.set( obj.posX, obj.posY, obj.posZ );
	scene.add( spotLight );
	
	var light = new THREE.PointLight(0xffffff,1);
	light.position.set(0,2000,2000);// pointlight in this position to create te effect on the spheres
	scene.add(light);
}
// change the camera position to near far o resetting the position to initial
function NEAR() 
{
	camera.position.x = 200;
	camera.position.y = 200;
	camera.position.z = 200;
	}
function FAR() 
{
	camera.position.x = 3000;
	camera.position.y = 3000;
	camera.position.z = 3000;
	}
function RESET() 
{
	controls.reset();
}


// adds the gui to the of the camera and the showpanel
function addGUI() 
{
	stats.showPanel( 0 ); 
	document.body.appendChild( stats.dom );


	
	var gui_camera=gui.addFolder('Camera');
	
	var parameters = 
					{
							Near:function() { NEAR(); },
							Far:function() { FAR(  ); },
							Reset:   function() { RESET(  ); },
					};
					gui_camera.add( parameters, 'Near'   ).name("Near");
					gui_camera.add( parameters, 'Far'   ).name("Far");
					gui_camera.add( parameters, 'Reset'   ).name("Reset");
}

function main() {

	
	//set up renderer
	renderer.setClearColor(0x222222);
	renderer.autoClearColor = false;
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;	
    renderer.gammaFactor = 2.2;
	renderer.autoClear = false;
	
	//Camera first position
	camera.position.x = 3000;
	camera.position.y = 3000;
	camera.position.z = 3000;
	controls = new OrbitControls( camera, renderer.domElement );

	
	//set colors of the spheres and boxes
		var colors=[];
		colors[1]="red";
		colors[2]="blue";
		colors[3]="blueviolet";
		colors[4]="green";
		colors[5]="purple";
		colors[6]="goldenrod";
		colors[7]="orangered";
		colors[8]="orange";
		colors[9]="brown";
		colors[10]="seagreen";
		colors[11]="turquoise";

	for (let index = 1; index < 12; index++) {
		
		colors_array_2[index]= colors[index];
		colors_array_1[index]= colors_array_2[index];
	}
	 
	
	
	 
	// create the floor 
    var floorTexture = new THREE.TextureLoader().load( '../client/js/images/azul.jpg' )
	var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 6000, 6000 ),
		new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010, map: floorTexture, side: THREE.DoubleSide} )
		);

    plane.rotation.x = - Math.PI / 2;
	plane.receiveShadow = true;
	plane.position.set(0,-60,0)
	scene.add( plane );




	
	
	addLights();// all the lights
	addGUI();// all the cameras
	addSkybox(0,false);// skybox 
	video[0].play();
	video[0].muted=true;
	addGUIChooseDate ();// all the date


	const rotationSpace = new THREE.Object3D();

	//create the movement with the arrowkeys
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );

}

function addGUIChooseDate (){
	sphere_cant_exchange[0]=0;
	

	var guiALLF4= gui.addFolder('Date');
	var parameters=[] ;// parameters of each selection
	var Date_elected=[];
	var counter=0;//counter of dates
	
		for (let index = 0; index < info.length; index++) {
			
			if(info[index][0]=="Date:"){
				
					Date_number++;
					Date_elected[index]=Date_number;
					sphere_cant_exchange[Date_number]=1;
					
					counter++;

					
					sphere_cant_compound[Date_number]=counter;
					parameters[index] = 
					{

							Sphere:   function() { Start_Sphere( index, Date_elected[index] ); },//function of each date
					};
					guiALLF4.add( parameters[index], 'Sphere'   ).name("Date:"+info[index][1]);// add selector
			}
			sphere_cant_exchange[Date_number]++;
		}
	
	
  
  
   
}


//receive object that need to detects colisions in the x, z coordinates

let onKeyDown = function ( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = true;
			movement(moveForward, speedMovement);
			break;
		case 37: // left
		case 65: // a
			moveLeft = true;
			movement(moveLeft, speedMovement);
			break;
		case 40: // down
		case 83: // s
			moveBackward = true;
			movement(moveBackward, speedMovement);
			break;
		case 39: // right
		case 68: // d
			moveRight = true;
			movement(moveRight, speedMovement);
			break;


			
		}

};
//event function that works when a key is released
let onKeyUp = function ( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = false;
			break;
		case 37: // left
		case 65: // a
			moveLeft = false;
			break;
		case 40: // down
		case 83: // s
			moveBackward = false;
			break;
		case 39: // right
		case 68: // d
			moveRight = false;
			break;
		case 67:
			blueSphere.getObjectByName('audio').setVolume(0);
			break;
		}
};
//the delta factor will divide the movement speed by 100 but will make it feel smoother to the controler
function movement(direction, speed){
	let delta = clock.getDelta()
	let moveZ = Number(moveForward) -Number(moveBackward);
  	let moveX = Number(moveRight) - Number(moveLeft);
  	
  	if (moveForward || moveBackward) {
  		cameraControls.forward(speed*delta*moveZ,true);
  	}
  	if (moveLeft || moveRight) {
	  	cameraControls.truck(speed*delta*moveX,0,true);
  	}
  	
}
// make a sprite with text in a canvas
function makeTextSprite( message, parameters,index, esfera )
{
	//parameters section
	if ( parameters === undefined ) parameters = {};
	
	var fontface = parameters.hasOwnProperty("fontface") ? 
		parameters["fontface"] : "Arial";
	
	var fontsize = parameters.hasOwnProperty("fontsize") ? 
		parameters["fontsize"] : 18;
	
	var borderThickness = parameters.hasOwnProperty("borderThickness") ? 
		parameters["borderThickness"] : 4;
	
	var borderColor = parameters.hasOwnProperty("borderColor") ?
		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
	
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
	if (esfera){context.fillStyle   =colors_array_2[index]; }else {context.fillStyle   =colors_array_2[index];}
	

	// border color
	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
								  + borderColor.b + "," + borderColor.a + ")";

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

function createwrittensphere(sphere_price, sphere_size,sphere_cant, colors,index){

	var geometry = new THREE.SphereGeometry(sphere_size, 34, 24);
	var material = new THREE.MeshStandardMaterial({
		color:colors, 
	
	opacity:0.7,
	roughness: 0.5, metalness: 0.7,
	emissiveIntensity:1,

	
	});
//adding an texture to the sphere
	var image = document.createElement('img');
	var envMap = new THREE.Texture(image);
	image.onload = function()  {
		envMap.needsUpdate = true;
	};
	image.src = '../client/js/images/azul.jpg';// 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMTc1M2NlNy1iZGRlLTY4NGEtODY1Mi0yZDc0MGJmODNiMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDI0MzgwNDJCNTU0MTFFNkJGMkNBMDkxMUNCMUMwRjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDI0MzgwNDFCNTU0MTFFNkJGMkNBMDkxMUNCMUMwRjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzE3NTNjZTctYmRkZS02ODRhLTg2NTItMmQ3NDBiZjgzYjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxNzUzY2U3LWJkZGUtNjg0YS04NjUyLTJkNzQwYmY4M2IyNiIv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';
	envMap.mapping = THREE.SphericalReflectionMapping;
	material.envMap = envMap;

// roughnessMap
	var image = document.createElement('img');
	var roughnessMap = new THREE.Texture(image);
	image.onload = function()  {
		roughnessMap.needsUpdate = true;
	};
	image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYzNjk1NjkxQjY0MjExRTY4QTg3RDcxOTNDQkE1RkRGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYzNjk1NjkyQjY0MjExRTY4QTg3RDcxOTNDQkE1RkRGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjM2OTU2OEZCNjQyMTFFNjhBODdENzE5M0NCQTVGREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjM2OTU2OTBCNjQyMTFFNjhBODdENzE5M0NCQTVGREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WU2ohAAAAH0lEQVR42mJgoDVg/P//P0kamBgGHRj1w0jxA0CAAQBKrgwBw+YutwAAAABJRU5ErkJggg==';

	roughnessMap.magFilter = THREE.NearestFilter;
	material.roughnessMap = roughnessMap;

//setting planet position
	var planet = new THREE.Mesh(geometry, material);
	var orbit = 1500;
	planet.position.y=200;
	planet.position.x = Math.cos(60*timestamp ) ;
	planet.position.z = Math.sin(60*timestamp );
	bars_z=planet.position.z;
	planet_y=sphere_size;
	bars_x=planet.position.x;
	planet.receiveShadow= true;
	planet.position.x = planet.position.x  * orbit;
	planet.position.z = planet.position.z * orbit;
	planet_z=planet.position.z;
	planet_y=sphere_size;
	planet_x=planet.position.x;
	planet.userData.orbit = orbit;
	planet.userData.speed = sphere_size;

//setting name label
		sprite_2[index] =makeTextSprite(  sphere_price, { fontsize: 24},index,true );// new THREE.Sprite(spriteMat);
		var scaleFactor = 9;

//label scale
		var scale = scaleVector.subVectors(planet.position, camera.position).length() / scaleFactor;
		sprite_2[index].scale.set(scale, scale, 1);
		sprite_2[index].position.y= 200;
		planet.add(sprite_2[index]);

//setting currency label
		info_bars[index] = makeTextSprite(  sphere_cant , { fontsize: 16},index,true  );
		info_bars[index].position.x = planet_x ;
		info_bars[index].position.z = planet_z;
	

		planet.name=sphere_cant;
		planet.esfera=false;
		info_bars[index] [0]= makeTextSprite(  sphere_cant , { fontsize: 18},index,true );
		info_bars[index][0].visible=false;
// label position
		info_bars[index][0].position.x =planet_x;
		info_bars[index][0].position.y =planet.position.y+sprite_2[index].position.y;
		info_bars[index][0].position.z = planet_z;
		info_bars[index][0].name=sphere_cant;
//label scale
		info_bars[index][0].scale.set(scale, scale, 1);
		scene.add(info_bars[index][0]);
		scene2.add(info_bars[index][0]);
		planets.push(planet);
		scene.add(planet);
		timestamp++;
}
 
function createwrittensphere2( sphere_price, sphere_size, orbit, material,sphere_name,indice,index,jndex){

	var geometry =  new THREE.BoxGeometry(32,sphere_size ,24);

//adding an texture to the sphere
	var image = document.createElement('img');
	var envMap = new THREE.Texture(image);
	image.onload = function()  {
		envMap.needsUpdate = true;
	};
	image.src ='../client/js/images/azul.jpg';// 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAIAAADTED8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozMTc1M2NlNy1iZGRlLTY4NGEtODY1Mi0yZDc0MGJmODNiMjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MDI0MzgwNDJCNTU0MTFFNkJGMkNBMDkxMUNCMUMwRjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MDI0MzgwNDFCNTU0MTFFNkJGMkNBMDkxMUNCMUMwRjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzE3NTNjZTctYmRkZS02ODRhLTg2NTItMmQ3NDBiZjgzYjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjMxNzUzY2U3LWJkZGUtNjg0YS04NjUyLTJkNzQwYmY4M2IyNiIv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';
	envMap.mapping = THREE.SphericalReflectionMapping;
	material.envMap = envMap;

// roughnessMap
	var image = document.createElement('img');
	var roughnessMap = new THREE.Texture(image);
	image.onload = function()  {
		roughnessMap.needsUpdate = true;
	};
	image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjYzNjk1NjkxQjY0MjExRTY4QTg3RDcxOTNDQkE1RkRGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjYzNjk1NjkyQjY0MjExRTY4QTg3RDcxOTNDQkE1RkRGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjM2OTU2OEZCNjQyMTFFNjhBODdENzE5M0NCQTVGREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjM2OTU2OTBCNjQyMTFFNjhBODdENzE5M0NCQTVGREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WU2ohAAAAH0lEQVR42mJgoDVg/P//P0kamBgGHRj1w0jxA0CAAQBKrgwBw+YutwAAAABJRU5ErkJggg==';
	roughnessMap.magFilter = THREE.NearestFilter;
	material.roughnessMap = roughnessMap;

//setting box position
	var planet = new THREE.Mesh(geometry, material);
	planet.receiveShadow= true;
	planet.position.y=sphere_size/2;
	planet.position.x = planet_x +(Math.cos(timestamp2 * 20) * orbit);
	planet.position.z = planet_z +( Math.sin(timestamp2 * 20) * orbit);
	planet.userData.orbit = orbit;
	planet.userData.speed = sphere_size;

//setting name label
	sprite[indice] = makeTextSprite(  sphere_name , { fontsize: 18},jndex,false ); 
	sprite[indice].visible=true;
	
	sprite[indice].position.y = -sphere_size/2;
	var scaleFactor = 9;
	var scale = scaleVector.subVectors(planet.position, camera.position).length() / scaleFactor;

//label scale
	sprite[indice].scale.set(scale, scale, 1);
	planet.add(sprite[indice]);

//setting currency label
	info_bars[index][jndex]= makeTextSprite( sphere_price, { fontsize: 18},jndex,false  );

// label position
	info_bars[index][jndex].position.y=0;
	info_bars[index][jndex].visible=false;
	info_bars[index][jndex].position.x = planet.position.x;
	info_bars[index][jndex].position.z =planet.position.z;

//label scale
	info_bars[index][jndex].scale.set(scale, scale, 1);
	
	planet.name=indice;
	planet.esfera=true;
	info_bars[index][jndex].name=indice;
	scene.add(info_bars[index][jndex]);
	scene2.add(info_bars[index][jndex]);
	planets.push(planet);
	scene.add(planet);

	timestamp2++;
	  
}
var INTERSECTED=null;

function raycast() {     
  raycaster.setFromCamera( mouse, camera );	
  var intersects = raycaster.intersectObjects(planets );
  var esfera=true;
		  if ( intersects.length > 0 ) {
			  if(INTERSECTED != intersects[ 0 ].object){
					if(INTERSECTED){// intersected has an object but the user is not hovering an object anymore
					
						INTERSECTED.children[0].visible=true;// turn visible the name
						info_bars[x][y].visible=false;// turn invisible the currency
						INTERSECTED.scale.set(1,1, 1);// turn to normal the scale
						
					}
				//looking for the object.name that match the label with the currency in the matrix
				INTERSECTED = intersects[ 0 ].object;
				
				for(let kndex=0 ; kndex < info_bars.length; kndex++)
				{
					for(let index=0 ; index < info[0].length-1; index++)
					{
						if(INTERSECTED.name==info_bars[kndex][index].name)
						{
							INTERSECTED.scale.set(1.1, 1.1, 1.1);//turn to another the scale
							INTERSECTED.children[0].visible=false;// turn invisible the name
							info_bars[kndex][index].visible=true;// turn visible the currency
							x=kndex;y=index;// saving the coordenates of the matrix
						}					
					}		
				}	
			  }
			  
	
		  } else {
			
			if(INTERSECTED){// intersected has an object but the user is not hovering an object anymore
			
				INTERSECTED.children[0].visible=true;// turn visible the name
				info_bars[x][y].visible=false;// turn invisible the currency
				INTERSECTED.scale.set(1,1, 1);// turn to normal the scale
			}
			INTERSECTED=null;
			
		  }
		  
	

}
function onMouseMove( event ) {
      
	event.preventDefault();
  
		  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function exchange_sphere(where_to_start, register_number){
	 action= true;// entering to the scale section
	
//important counters
	timestamp=0;
	radii=0;
	var number=0;

	// big orbit 
	var shape = new THREE.Shape();
		shape.moveTo(200, 0);
		shape.absarc(0, 0, 1500, 0, 2 * Math.PI, false);
		var spacedPoints = shape.createSpacedPointsGeometry(128);
		spacedPoints.rotateX(THREE.Math.degToRad(-90));
		 orbit [0]= new THREE.Line(spacedPoints, new THREE.LineBasicMaterial({
		
		}));
		orbit [0].visible=false;// big orbit invisible
		scene.add(orbit [0]);
// index of the main matrix
	var index = where_to_start+2;
	var nombres= where_to_start+1;

		var biggest=0;
		var actual=0;
		var biggest_hijo=0;
		var actual_hijo=0;
		// creating the materias of each esphere
		for (let jndex=1 ; jndex < info[0].length-1; jndex++){
			mat[jndex] = new THREE.MeshStandardMaterial({
				color:colors_array_2[jndex], 
		  emissiveIntensity:0.5,
		 opacity:1,
		  roughness: 1, metalness: 0.7,
		   emissiveIntensity:1,
		 
			});
			
		}
	//create the geometries boxes anf spheres
	for (let indexx=0 ; indexx < sphere_cant_exchange[register_number]-4; indexx++) {
		
			var counter=0;//geometries counter
			var first;// if first geometry it is sphere else, boxes
			timestamp2=0;
			counter++;
			first= counter;
			//setting up the currency taking of the "," and "$"
				var regex=/,/gi;
				var sphere_size= info[index][ info[0].length-1].replace(regex, '') ;
				var $='$';
				regex = $ ;
				sphere_size= sphere_size.replace(regex, '') ;
			// setting the size of the sphere	
				for (let indexxx=1 ; indexxx < 12; indexxx++) {
					
					sphere_size=sphere_size/10;
					
					if (sphere_size<10){
					
						sphere_size=(indexxx-1)*20;
						
						indexxx=12;
					}
			
				}
			
				
				//create the sphere
				createwrittensphere( info[index][0], sphere_size,  info[index][ info[0].length-1],colors_array_1[indexx],indexx);
		
		//Create the small orbits in white	
		var shape = new THREE.Shape();
		shape.moveTo(planet_x, planet_y);
		shape.absarc(planet_x, planet_z, 400, 0, 2 * Math.PI, false);
		var spacedPoints = shape.createSpacedPointsGeometry(128);
		spacedPoints.rotateX(THREE.Math.degToRad(90));
		 orbit [indexx]= new THREE.Line(spacedPoints, new THREE.LineBasicMaterial({
		
		}));
		 scene.add(orbit[indexx]);
		  

		 
					//create the boxes
					for (let jndex=1 ; jndex < info[0].length-1; jndex++){
						//setting up the currency taking of the "," and "$"
						var regex=/,/gi;
						timestamp2++;
						var sphere_size= info[index][jndex].replace(regex, '') ;
						var $='$';
						regex = $ ;
						sphere_size= sphere_size.replace(regex, '') ;
						// setting the size of the sphere
						sphere_size=sphere_size/200000;

						//create the boxes
						createwrittensphere2( info[index][jndex], sphere_size, 400,mat[jndex],info[nombres][jndex],number,indexx,jndex);
						
						number++;
							
					}
					

					index++;
	}
	//reverting the camera changes
	camera.position.x = camera_position_x;
	camera.position.y = camera_position_y;
	camera.position.z = camera_position_z;
	
}

function Start_Sphere(where_to_start, register_number)
{
//resetting camera
	camera_position_x = camera.position.x ;
	camera_position_y = camera.position.y;
	camera_position_z = camera.position.z;
	camera.position.x = 0;
	camera.position.y = 5000;
	camera.position.z = 0;
//resetting all	
	planets.forEach( function(planet){
    
		scene.remove( planet);
	
	
		
		
		
	  });
	 
	  for(let kndex=0 ; kndex < orbit.length; kndex++)
	  {
		if( orbit!= []){ scene.remove( orbit[kndex]);}
	  }
	  for(let kndex=0 ; kndex < sprite.length; kndex++)
	  {
		if( sprite!= []){ scene.remove( sprite[kndex]);}
	  }
	  for(let kndex=0 ; kndex < sprite_2.length; kndex++)
	  {
		if( sprite_2!= []){ scene.remove( sprite_2[kndex]);}
	  }
	 
	 
	 planets = [];
	 video[0].play();
	 video[0].muted=true;
	exchange_sphere(where_to_start, register_number);
 	
	
}



     

function displayWindowSize(){
	
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	
	
	renderer.setSize(w, h);
	
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}


window.addEventListener("resize", displayWindowSize);

function animate() 
{
	raycast();

  requestAnimationFrame(animate);
  if(action){
	for(let kndex=0 ; kndex < info_bars.length; kndex++)
	{
		for(let index=0 ; index < info[0].length-1; index++)
		{
		
		
			var scaleFactor = 9;
			
			
			var scale = scaleVector.subVectors(info_bars[kndex][index].position, camera.position).length() / scaleFactor;//caculate the scale
			info_bars[kndex][index].scale.set(scale*2, scale*2, 1);// scale view of the info labels
			
		}
			
			
		
	}
  }
  render();
  renderer.clear();                     // clear buffers
  renderer.render( scene, camera );     // render scene 1
  renderer.clearDepth();                // clear depth buffer
  renderer.render( scene2, camera );    // render scene 2
  controls.update();
  stats.update();
  var dt = clock.getDelta();
  
}


function addSkybox(num,	isnotfirsttime){//Create animated sky

	
		video[0]= document.createElement('video');
		video[0].load();
		video[0].autoplay= true;
		video[0].needsUpdate= true;
		video[0].loop	= true;
	   

	var texture;
	
	//choose the video
	if (num== 0){
		
		video[0].src	= "../client/js/images/stars.mp4";
		video[0].autoplay= true;	
		
		 texture = new THREE.VideoTexture( video[0] );
	} 
	
	
	
	

    var skyGeo;
    //add sphere
	skyGeo=	new THREE.SphereGeometry( 100000, 120, 120 );
	
	//adding the video to the sphere
 	
     materiall = new THREE.MeshStandardMaterial( {

    

    roughness: 1,
    metalness: 1,
    map: texture,

	} );
	if (isnotfirsttime){
		scene.remove( Skybox );
	}
	
	 Skybox = new THREE.Mesh(skyGeo, materiall);
	// put the video both sides of the sphere
	Skybox.material.side = THREE.DoubleSide;
	
	//add sky
	scene.add(Skybox);
}
function render() 
{
	renderer.domElement.addEventListener( 'mousemove', onMouseMove );

	const delta = clock.getDelta();
	
	
}

init();
main();
animate();
