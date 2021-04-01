

//Dependencies Webpack  and threeJS, npm install webpack webpack-cli, npm install threeJS
// npm run-script build to compile, work on this file.
// dont change package.json
 

//Llamada de la librerias
const THREE = require('three');
// CommonJS:
const dat = require('dat.gui');
const Stats = require('stats.js');




import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
//Model loaders
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import  TweenUmd, {  Tween, TWEEN } from './client/js/TWEEN/Tween.umd.js';



// CameraControls.install( { THREE: THREE } );
const canvas = document.getElementById('canvas');
const clock = new THREE.Clock();
 // Optional: Pre-fetch Draco WASM/JS module.
// dracoLoader.preload();
//Scene and render
var renderer, scene, bgScene, camera, cameraControls;
var bgMesh;
var engine;
var controls;
var mixer, mixer2,mixerCap;
//Lights
var spotLight,hemisLight, light,plight2, plight=[];
var spotLightHelper;
var materiall;
//Interface
var gui;
var obj;
var stats;
var childd;
var childdd;
const boxGeometry = new THREE.BoxGeometry();
const sphereGeometry = new THREE.SphereGeometry();
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);

const torusKnotGeometry = new THREE.TorusKnotGeometry();

var material = [];
var matcapTexture = [];
var materialFolder = [];
var meshMatcapMaterialFolder =[];
var data = [];

//******************************************************************************************fireflies Tween

var camera, scene, renderer, stats;
var cube = [],cube2= [];
var easing	=  TweenUmd.Easing.Quadratic.InOut ;
var delay= 0;// cuanto tiempo tarda en iniciar el movimiento
var duration=2500;//cuanto tiempo dura el movimiento
var range=8;

var current= [];
var total=17;
var tweenHead= [];
var tweenHead1= [];
var tweenHead2= [];
var tweenHead3= [];
var tweenHead4= [];
var tweenBack= [];
var update	;
function Circular(index){
	tweenHead[index]	= new  TweenUmd.Tween(current[index])
	.to({x:24 },  duration)
	.delay( delay)
	.easing(easing)
	.onUpdate(update);

	tweenBack[index]	= new  TweenUmd.Tween(current[index])
		.to({x:-24},  duration)
		.delay( delay)
		.easing(easing)
		.onUpdate(update);

	tweenHead1[index]	= new  TweenUmd.Tween(current[index])
	.to({y: 0},  duration/2)
	.delay( delay)
	.easing(easing)
	.onUpdate(update);
	tweenHead3[index]	= new  TweenUmd.Tween(current[index])
	.to({y: ( 52)},  duration/2)
	.delay( delay)
	.easing(easing)
	.onUpdate(update);
	
		
	tweenHead2[index]	= new  TweenUmd.Tween(current[index])
	.to({y:  26},  duration/2)
	.delay( delay)
	.easing(easing)
	.onUpdate(update);

	tweenHead4[index]	= new  TweenUmd.Tween(current[index])
	.to({y:  26},  duration/2)
	.delay( delay)
	.easing(easing)
	.onUpdate(update);





	
	tweenHead1[index].chain(tweenHead4[index]);
	tweenHead4[index].chain(tweenHead3[index]);
	tweenHead3[index].chain(tweenHead2[index]);
	tweenHead2[index].chain(tweenHead1[index]);
	
	tweenHead[index].chain(tweenBack[index]);
	tweenBack[index].chain(tweenHead[index]);
	tweenHead1[index].start();
	tweenHead[index].start();
}
function Vertical(index){
	tweenHead[index]	= new  TweenUmd.Tween(current[index])
			.to({y:50},  duration)
			.delay( delay)
			.easing(easing)
			.onUpdate(update);

			tweenBack[index]	= new  TweenUmd.Tween(current[index])
				.to({y:  26},  duration)
				.delay( delay)
				.easing(easing)
				.onUpdate(update);

			tweenHead[index].chain(tweenBack[index]);
			tweenBack[index].chain(tweenHead[index]);
			
			tweenHead[index].start();
}
function Horizontal(index){
	tweenHead[index]	= new  TweenUmd.Tween(current[index])
			.to({x: 24},  duration)
			.delay( delay)
			.easing(easing)
			.onUpdate(update);

			tweenBack[index]	= new  TweenUmd.Tween(current[index])
				.to({x:-24},  duration)
				.delay( delay)
				.easing(easing)
				.onUpdate(update);

			tweenHead[index].chain(tweenBack[index]);
			tweenBack[index].chain(tweenHead[index]);
			
			tweenHead[index].start();
}
function Virolante(index){
	tweenHead[index]	= new  TweenUmd.Tween(current[index])
			.to({x: 24},  duration*3)
			.delay( delay)
			.easing(easing)
			.onUpdate(update);

			tweenBack[index]	= new  TweenUmd.Tween(current[index])
				.to({x:-24},  duration*3)
				.delay( delay)
				.easing(easing)
				.onUpdate(update);
				tweenHead1[index]	= new  TweenUmd.Tween(current[index])
				.to({y: 27},  duration/3)
				.delay( delay)
				.easing(TweenUmd.Easing.Bounce.InOut)
				tweenHead2[index]	= new  TweenUmd.Tween(current[index])
				.to({y: 26},  duration/3)
				.delay( delay)
				.easing(TweenUmd.Easing.Bounce.InOut)
			tweenHead[index].chain(tweenBack[index]);
			tweenBack[index].chain(tweenHead[index]);
			tweenHead1[index].chain(tweenHead2[index]);
			tweenHead2[index].chain(tweenHead1[index]);
			tweenHead1[index].start();
			tweenHead[index].start();
}
function setupTween()
{

	 update	= function(){
		for (let index = 1; index < total; index++) {
			cube[index].position.x = current[index].x;
			cube[index].position.y = current[index].y;
			cube[index].position.z = current[index].z;

			cube2[index].position.x = current[index].x;
			cube2[index].position.y = current[index].y;
			cube2[index].position.z = current[index].z;
		}


	}
	TweenUmd.removeAll();
	for (let index = 1; index < total; index++) {

		 current	[index]= { x:  -24, y:  26, z:  -range*index };// ubicacion inicial de las dos esferas
		 
		 
		if(index<5)
		{
			Circular(index);//movimiento circular
			
		}else if(index<9)
		{		
			Horizontal(index);//movimiento horizontal
			
		}
		else if(index<13)
		{
			Vertical(index);//movimiento vertical
			
		}
		else if(index<17)
		{
			Virolante(index);//movimiento vertical
		}
	}
}
 

 
/*

init();



animate();



 

 

function buildGui(options, callback)
{
 


	var easings	= {};
	Object.keys( TweenUmd.Easing).forEach(function(family){
		Object.keys( TweenUmd.Easing[family]).forEach(function(direction){
			var name	= family+'.'+direction;
			easings[name]	= name;
		});
	});
 


	var change	= function(){
		callback(options)
	}
 


	var gui = new dat.GUI({ height	: 4 * 32 - 1 });
	gui.add(options, 'range').name('Range coordinate').min(64).max(1280)	.onChange(change);
	gui.add(options, 'duration').name('Duration (ms)').min(100).max(4000)	.onChange(change);
	gui.add(options, 'delay').name('Delay (ms)').min(0).max(1000)		.onChange(change);
	gui.add(options, 'easing').name('Easing Curve').options(easings)	.onChange(change);
}
 

function init() {
 


	//if ( ! Detector.webgl )	Detector.addGetWebGLMessage();


	camera	= new THREE.Camera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;
 


	scene	= new THREE.Scene();
 


	buildGui(userOpts, function(){
		console.log("userOpts", userOpts)
		setupTween();
	});
 


	setupTween();
 


	cube	= new THREE.Mesh( new THREE.SphereGeometry( 200, 48, 32 ), new THREE.MeshNormalMaterial() );
	cube.position.x = - range;
 


	scene.add( cube );
 


	container = document.createElement( 'div' );
	document.body.appendChild( container );
 


	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	
 


	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild( stats.domElement );
}
 

function animate() {
 


	render();
 


	requestAnimationFrame( animate );


	stats.update();
 


	 TweenUmd.update();
}
 

function render() {
 


	renderer.render( scene, camera );
}*/

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
 
       var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
	var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 2, FAR = 5000;
	camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
     
		
	
	
	

	stats = new Stats();
}

function addLights() 
{
	for (let index = 1; index < total; index++) {

		plight[index]=new THREE.PointLight(0xffffff,1);

		plight[index].penumbra = 0.5;
		plight[index].castShadow = true;

		cube[index].add(plight[index]);
	}
	
}

function addGUI() 
{
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );


	
}

function main() {

	
	//Renderer
	renderer.setClearColor(0x222222);
	renderer.autoClearColor = false;
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.outputEncoding = THREE.sRGBEncoding;
	//renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;
   // renderer.shadowMap.enabled = true;
//	renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
	
	//Camera
	camera.position.x = 14;
	camera.position.y = 2;
	camera.position.z = 6;
	camera.lookAt( 0, 0.1, 0 );
    controls = new OrbitControls( camera, renderer.domElement );
	
	


        var floorTexture = new THREE.TextureLoader().load( '../client/js/images/checkerboard.jpg' )
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	
	var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 140, 140 ),
		new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010, map: floorTexture, side: THREE.DoubleSide} )
		);
    plane.rotation.x = - Math.PI / 2;
    plane.receiveShadow = true;
	scene.add( plane );
/******************************************************************************************************************************** */
for (let index = 1; index < total; index++) {
	
	cube[index]	= new THREE.Mesh( new THREE.SphereGeometry( 1, 10, 10 ), new THREE.MeshBasicMaterial() );
	
	scene.add( cube[index] );

	cube2[index]	= new THREE.Mesh( new THREE.SphereGeometry( 1.5, 10, 10 ), new THREE.MeshBasicMaterial({ color: "white", transparent:true, opacity:0.50 }) );
	
	scene.add( cube2[index] );
}
setupTween();
addLights();
/*********************************************************************************************************** */	
	
	


	
	
	addGUI();
	

	
	
}
 

    

function displayWindowSize(){
	// Get width and height of the window excluding scrollbars
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	
	
	renderer.setSize(w, h);
	
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}

// Attaching the event listener function to window's resize event
window.addEventListener("resize", displayWindowSize);


function animate() 
{
	

  requestAnimationFrame(animate);
  render();
  renderer.render(scene, camera);
  controls.update();
  stats.update();
  var dt = clock.getDelta();
  
 
}


function render() 
{
	const delta = clock.getDelta();
	//Para la animacion
	
	TweenUmd.update();//********************************************************************************************************************** */
	
}

init();
main();
animate();
