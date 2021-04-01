

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
var spotLight, light, hemisLight;
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
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    spotLight.position.set( obj.posX, obj.posY, obj.posZ );
	scene.add( spotLight );
	spotLightHelper = new THREE.SpotLightHelper( spotLight );
	scene.add( spotLightHelper );
	//fireworklight
	var light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);
}

function addGUI() 
{
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );
	var guiALL= gui.addFolder('Light');
	var guiSL = guiALL.addFolder('SpotLight');
	guiSL.add(obj, 'helpSpot').onChange(function (val) {
		spotLightHelper.visible = val;
	});
	guiSL.add(obj, 'posX').onChange(function (val) {
		spotLight.position.x = val;
		spotLightHelper.update();
	});
	guiSL.add(obj, 'posY').onChange(function (val) {
		spotLight.position.y = val;
		spotLightHelper.update();

	});
	guiSL.add(obj, 'posZ').onChange(function (val) {
		spotLight.position.z = val;
		spotLightHelper.update();

	});
	//Ambient Light
	var guiAL = guiALL.addFolder('AmbientLight');
	guiAL.addColor(obj, 'color0').onChange(function (val) {
		light.color.set(val);
		hemisLight.color.set(val);
	});
	guiAL.add(obj, 'intAmbien').min(0).max(1).step(0.1).onChange(function (val) {
		light.intensity = val;
	}).name('Intensity');

	//Hemisphere Light
	var guiHL = guiALL.addFolder('HemisphereLight');
	guiHL.addColor(obj, 'colorg').onChange(function (val) {
		hemisLight.groundColor.set(val);
	});
	guiHL.add(obj, 'intHemis').min(0).max(1).step(0.1).onChange(function (val) {
		hemisLight.intensity = val;
	}).name('Intensity');
	

	
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

	addLights();

	/*
    loadGLTFF('../client/js/images/free_stylized_textures_tiles_with_sand/scene.gltf', [0,  12, 0], [0.05, 0.05, 0.05]).then(function(gltf){
		console.log('termine gltf!');
		mixerCap = new THREE.AnimationMixer( gltf.scene );
		var action = mixerCap.clipAction( gltf.animations[ 0 ] );
		action.play();
		
	}).catch(function (err) { 
		console.log(err);
	});
	loadGLTFF('../client/js/images/a.i._angel/scene.gltf', [0,  12, 0], [0.05, 0.05, 0.05]).then(function(gltf){
		console.log('termine gltf!');
		mixerCap = new THREE.AnimationMixer( gltf.scene );
		var action = mixerCap.clipAction( gltf.animations[ 0 ] );
		action.play();
		
	}).catch(function (err) {
		console.log(err);
	});*/
	

 material[0] = new THREE.MeshMatcapMaterial();

matcapTexture [0]= new THREE.TextureLoader().load("../client/js/images/free_stylized_textures_tiles_with_sand/textures/material_2_baseColor.png")
material[0].matcap = matcapTexture [0];
const cube = new THREE.Mesh(boxGeometry, material[0])
cube.position.x = 5
cube.position.y = 2 
scene.add(cube)

material[1] = new THREE.MeshMatcapMaterial();
matcapTexture[1] = new THREE.TextureLoader().load("../client/js/images/DarkSea-xpos.jpg")
material[1].matcap = matcapTexture[1];
const sphere= new THREE.Mesh(sphereGeometry, material[1])
sphere.position.x = 3
sphere.position.y = 2 
scene.add(sphere)

material[2] = new THREE.MeshMatcapMaterial();
matcapTexture[2] = new THREE.TextureLoader().load("../client/js/images/free_stylized_textures_tiles_with_sand/textures/material_3_baseColor.png")
material[2].matcap = matcapTexture[2]
const icosahedron = new THREE.Mesh(icosahedronGeometry, material[2])
icosahedron.position.x = 0
icosahedron.position.y = 2 
scene.add(icosahedron)

material[3] = new THREE.MeshMatcapMaterial();
matcapTexture[3] = new THREE.TextureLoader().load("../client/js/images/free_stylized_textures_tiles_with_sand/textures/material_baseColor.png")
material[3].matcap = matcapTexture[3]
const torusKnot = new THREE.Mesh(torusKnotGeometry, material[3])
torusKnot.position.x = -5
torusKnot.position.y = 2 
scene.add(torusKnot)


var options = {
    side: {
        "FrontSide": THREE.FrontSide,
        "BackSide": THREE.BackSide,
        "DoubleSide": THREE.DoubleSide,
    }
}
const materialFolder1 = gui.addFolder('THREE.Material')

for (let index = 0; index < material.length; index++) {
	
	materialFolder[index] = materialFolder1.addFolder('THREE.Material '+ (index+1))	
	materialFolder[index].add(material[index], 'transparent')
	materialFolder[index].add(material[index], 'opacity', 0, 1, 0.01)
	materialFolder[index].add(material[index], 'depthTest')
	materialFolder[index].add(material[index], 'depthWrite')
	materialFolder[index].add(material[index], 'alphaTest', 0, 1, 0.01).onChange(() => updateMaterial(material,index))
	materialFolder[index].add(material[index], 'visible')
	materialFolder[index].add(material[index], 'side', options.side).onChange(() => updateMaterial(material,index))
	materialFolder[index].open()


	
	data [index] = {
		color: material[index].color.getHex()
	};

	
	meshMatcapMaterialFolder[index] = materialFolder[index].addFolder('THREE.MeshMatcapMaterial');
	meshMatcapMaterialFolder[index].addColor(data[index], 'color').onChange(() => { material[index].color.setHex(Number(data[index].color.toString().replace('#', '0x'))) });
	meshMatcapMaterialFolder[index].add(material[index], 'flatShading').onChange(() => updateMaterial(material,index));
	meshMatcapMaterialFolder[index].open();

	
}
function updateMaterial(material,index) {
	material[index].side = Number(material[index].side);
	material[index].needsUpdate = true;
}
        var floorTexture = new THREE.TextureLoader().load( '../client/js/images/checkerboard.jpg' )
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	
	var plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 30, 30 ),
		new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010, map: floorTexture, side: THREE.DoubleSide} )
		);
    plane.rotation.x = - Math.PI / 2;
    plane.receiveShadow = true;
	scene.add( plane );




	
	

	
	addSkybox();
	//addGUI();
	

	//addGUISkybox();
     
	
	
}
 
        function addGUISkybox(){//Create animated sky
	
	
	
	var guiSLSky = gui.addFolder('Skybox');
	guiSLSky.add(materiall, 'roughness').min(0).max(1).step(0.1).onChange(function (val) {
		materiall.roughness = val;
		//materiall.update();
	});
	guiSLSky.add(materiall, 'metalness').min(0).max(1).step(0.1).onChange(function (val) {
		materiall.metalness = val;
		//materiall.update();

	});
	

}
function addSkybox(){//Create animated sky

	//create video
	var video= document.createElement('video');
	video.load();
	video.autoplay= true;
	video.needsUpdate= true;
	video.loop	= true;
	//choose the video
	video.src	= "../client/js/images/Sky.mp4";
	//video.src	= "../client/js/images/Lluvia.mp4";
	//video.src	= "../client/js/images/Amanecer.mp4";
	
	var texture = new THREE.VideoTexture( video );

    var skyGeo;
    //add sphere
	skyGeo=	new THREE.SphereGeometry( 300, 30, 30 );
	
	//adding the video to the sphere
 	//var material = new THREE.MeshBasicMaterial({ map: texture,});
     materiall = new THREE.MeshStandardMaterial( {

    //color: 0xffffff,

    roughness: 1,
    metalness: 1,
    map: texture,

    } );
	var Skybox = new THREE.Mesh(skyGeo, materiall);
	// put the video both sides of the sphere
	Skybox.material.side = THREE.DoubleSide;
	//Skybox.Side = THREE.DoubleSide;
	//add sky
	scene.add(Skybox);
}
    
function loadGLTFF(path, pos,scale) {
	
	return new Promise((resolve, reject)=>{

		// Instantiate a loader
		var loader = new GLTFLoader();
	
		// Optional: Provide a DRACOLoader instance to decode compressed mesh data
		var dracoLoader = new DRACOLoader();
		// dracoLoader.setDecoderPath( '/examples/js/libs/draco/' );
		dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
		loader.setDRACOLoader( dracoLoader );
	
		// Load a glTF resource
		loader.load(
			// resource URL
			path,
			// called when the resource is loaded
			function ( gltf ) {
				//Transformations
				gltf.scene.scale.set(scale[0], scale[1], scale[2]);
				gltf.scene.position.set(pos[0], pos[1], pos[2]);
				gltf.scene.castShadow = true;
				gltf.scene.receiveShadow = true;
				gltf.scene.traverse( function ( child ) {
					
					if ( child.isMesh ) {
						child.castShadow = true;
						child.receiveShadow = true;
					}
					if(child instanceof THREE.Mesh){
						child.material.emissiveIntensity = 0.2;
					
					}childdd=child;
				} );
				scene.add( gltf.scene );
				childd=gltf.scene;
				console.log(gltf);
				addGUIGLTF();
				gltf.animations; // Array<THREE.AnimationClip>
				gltf.scene; // THREE.Group
				gltf.scenes; // Array<THREE.Group>
				gltf.cameras; // Array<THREE.Camera>
				gltf.asset; // Object

				
				resolve(gltf);
	
			},
			// called while loading is progressing
			function ( xhr ) {
	
				console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	
			},
			// called when loading has errors
			function ( error ) {
	
				console.log( 'An error happened' );
				reject(error);
			});	
	});
}
function addGUIGLTF(){//Create animated sky
	
	
	
	var guigltf = gui.addFolder('GLTF');
	guigltf.add(childdd.material, 'emissiveIntensity').min(0).max(1).step(0.1).onChange(function (val) {
		
		childd.traverse( function ( child ) {
					
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
			if(child instanceof THREE.Mesh){
				
				
				child.material.emissiveIntensity = val;
			}
		});
	}).name('Intensity');
	guigltf.addColor(childdd.material, 'emissive').onChange(function (val) {
		
		childd.traverse( function ( child ) {
					
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
			if(child instanceof THREE.Mesh){
				
				child.material.emissive=val;
				
			}
		});
	}).name('Emissive');

	
	guigltf.add(childdd.material,'emissiveIntensity').min(0).max(1).step(0.1).onChange(function (val) {
		
		
		childd.traverse( function ( child ) {
					
			if ( child.isMesh ) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
			if(child instanceof THREE.Mesh){
				
				
				child.material.matcap = val;
			}
		});
	}).name('Map');
	
	
}

function displayWindowSize(){
	// Get width and height of the window excluding scrollbars
	var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	
	// Display result inside a div element
	// console.log("Width: " + w + ", " + "Height: " + h);
	renderer.setSize(w, h);
	// camera.fov = Math.atan(window.innerHeight / 2 / camera.position.z) * 2 * THREE.Math.RAD2DEG;
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}

// Attaching the event listener function to window's resize event
window.addEventListener("resize", displayWindowSize);
// document.addEventListener( 'keydown', onKeyDown, false );
// document.addEventListener( 'keyup', onKeyUp, false );

function animate() 
{
	

  requestAnimationFrame(animate);
  render();
  renderer.render(scene, camera);
  controls.update();
  stats.update();
  var dt = clock.getDelta();
  
  //controls.update();
}


function render() 
{
	const delta = clock.getDelta();
	//Para la animacion
	if ( mixer ) mixer.update( delta );
	if ( mixer2 ) mixer2.update( delta );
	if ( mixerCap ) mixerCap.update( delta );
	
	
}

init();
main();
animate();
