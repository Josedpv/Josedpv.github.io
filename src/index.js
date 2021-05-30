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
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
});

// document.querySelector('table tbody').addEventListener('click', function(event) {
//     if (event.target.className === "delete-row-btn") {
//         deleteRowById(event.target.dataset.ID);
//     }
//     if (event.target.className === "edit-row-btn") {
//         handleEditRow(event.target.dataset.ID);
//     }
// });

// const updateBtn = document.querySelector('#update-row-btn');

const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function() {
    const tableSection = document.querySelector('#table');
    tableSection.hidden = false;
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5000/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

// function deleteRowById(ID) {
//     fetch('http://localhost:5000/delete/' + ID, {
//         method: 'DELETE'
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             location.reload();
//         }
//     });
// }

// function handleEditRow(ID) {
//     const updateSection = document.querySelector('#update-row');
//     updateSection.hidden = false;
//     document.querySelector('#update-name-input').dataset.ID = ID;
// }

// updateBtn.onclick = function() {
//     const updateNameInput = document.querySelector('#update-name-input');


//     console.log(updateNameInput);

//     fetch('http://localhost:5000/update', {
//         method: 'PATCH',
//         headers: {
//             'Content-type' : 'application/json'
//         },
//         body: JSON.stringify({
//             ID: updateNameInput.dataset.ID,
//             name: updateNameInput.value
//         })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             location.reload();
//         }
//     })
// }


// const addBtn = document.querySelector('#add-name-btn');

// addBtn.onclick = function () {
//     const nameInput = document.querySelector('#name-input');
//     const name = nameInput.value;
//     nameInput.value = "";

//     fetch('http://localhost:5000/insert', {
//         headers: {
//             'Content-type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({ name : name})
//     })
//     .then(response => response.json())
//     .then(data => insertRowIntoTable(data['data']));
// }

// function insertRowIntoTable(data) {
//     console.log(data);
//     const table = document.querySelector('table tbody');
//     const isTableData = table.querySelector('.no-data');

//     let tableHtml = "<tr>";

//     for (var key in data) {
//         if (data.hasOwnProperty(key)) {
//             if (key === 'dateAdded') {
//                 data[key] = new Date(data[key]).toLocaleString();
//             }
//             tableHtml += `<td>${data[key]}</td>`;
//         }
//     }

//     tableHtml += `<td><button class="delete-row-btn" data-id=${data.ID}>Delete</td>`;
//     tableHtml += `<td><button class="edit-row-btn" data-id=${data.ID}>Edit</td>`;

//     tableHtml += "</tr>";

//     if (isTableData) {
//         table.innerHTML = tableHtml;
//     } else {
//         const newRow = table.insertRow();
//         newRow.innerHTML = tableHtml;
//     }
// }
var porfin;

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({ID, name, address}) {
		porfin = ID;
		buscar(ID-1);
        tableHtml += "<tr>";
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${address}</td>`;
        // tableHtml += `<td><button class="delete-row-btn" data-id=${ID}>Delete</td>`;
        // tableHtml += `<td><button class="edit-row-btn" data-id=${ID}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;}
//import { porfin } from './coneccion';

const THREE = require('three');
// CommonJS:
const dat = require('dat.gui');
const Stats = require('stats.js');
 /*****************************START ADDED CODE***************/
      //import { Examples, ParticleEngine } from 'js/ParticleEngine.js';
     /*****************************FINISH ADDED CODE**************/

	 import  TweenUmd, {  Tween, TWEEN } from './client/js/TWEEN/Tween.umd.js';


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
	total:250000,
	blending:  true,
	depthTest: true,
	radio: 10,
	grado: 6,
	totales:1,
	
};
var buscado = null;
var scaleVector = new THREE.Vector3();
var geometry = new THREE.BufferGeometry();

var textureLoader = new THREE.TextureLoader();

		
var sprite2 = textureLoader.load( "../client/js/images/particle2.png");
	
vertices.push( 0, 0, 0);
var sprite_1=null;
var sprite_2=null ;
var sprite_3=null ;
var sprite_1_buscado;
var sprite_2_buscado ;
var sprite_3_buscado ;
var to_look_outside;
//var to_look_go = 0;
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



var easing	=  TweenUmd.Easing.Quadratic.InOut ;
var delay= 0;// cuanto tiempo tarda en iniciar el movimiento
var duration=2500;//cuanto tiempo dura el movimiento
var range=8;

var current;

var tweenHead;

var update	;
function Circular(to_look_go){
	tweenHead= new  TweenUmd.Tween(current)
	.to({x:10+allParticles[to_look_go].position.x,y:10+allParticles[to_look_go].position.y,z: 10+allParticles[to_look_go].position.z},  duration)
	.delay( delay)
	.easing(easing)
	.onUpdate(update);

	tweenHead.start();
}

function setupTween()
{

	 update	= function(){
		
			camera.position.x = current.x;
			camera.position.y = current.y;
			camera.position.z = current.z;
			camera.lookAt( current.x ,current.y ,current.z  );
	}
	TweenUmd.removeAll();
	

		 current = { x:  camera.position.x , y: camera.position.y, z:  camera.position.z };// ubicacion inicial de las dos esferas
		 
		 
	
			
			
		
}
 




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
function buscar(to_look){
	to_look_outside=to_look;
	
	if(sprite_1_buscado){scene.remove(sprite_1_buscado);}
	//camera.position.x=10+allParticles[to_look].position.x;
	
	//camera.position.z=10+ allParticles[to_look].position.z;
	//camera.position.y=10+ allParticles[to_look].position.y;
	//camera.lookAt( allParticles[to_look].position.x, allParticles[to_look].position.y, allParticles[to_look].position.z );
	sprite_1_buscado= makeTextSprite( " "+(to_look +1)+ "  ", { fontsize: 24}  );//( " "+(partic.index +1)+ "  ");
	sprite_2_buscado=makeText(link_href);
	sprite_3_buscado=makeText( "  "+nombre+" ");
	//if((0<=partic.index)&&partic.index<=params.total){	
		//console.log( 'got a click on particle', partic.index  );
		sprite_1_buscado.position.x= allParticles[to_look].position.x;
		sprite_1_buscado.position.y= 1;
		sprite_1_buscado.position.z= allParticles[to_look].position.z;
		sprite_2_buscado.position.x= allParticles[to_look].position.x;
		sprite_2_buscado.position.y= 2;
		sprite_2_buscado.position.z= allParticles[to_look] .position.z;
		sprite_3_buscado.position.x= allParticles[to_look].position.x;
		sprite_3_buscado.position.y= 3;
		sprite_3_buscado.position.z= allParticles[to_look] .position.z;
		var scaleFactor = 9;
		var scale = scaleVector.subVectors(allParticles[to_look].position, camera.position).length() / scaleFactor;

		sprite_1_buscado.scale.set(scale, scale, 1);
		sprite_2_buscado.scale.set(scale, scale, 1);
		sprite_3_buscado.scale.set(scale, scale, 1);
		Circular(to_look_outside);//movimiento circular
		
//	}


scene.add(sprite_1_buscado);
}
function addGUI() 
{
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );
	
	//particulas sphere
	var guiparameters = gui.addFolder('Particle System');

				
			
				guiparameters.add( params, 'totales' ).min(0).max(500000).step(1).onChange( function ( value ) {
					console.log(porfin);
					buscar(value-1);
					

				} );
				
			
			

			guiparameters.open();	
	
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
	//camera.lookAt( 0, 0.1, 0 );
    controls = new OrbitControls( camera, renderer.domElement );
	addLights();
	addGUI() ;
	
    particulas();
	setupTween();
	
	

	 /*****************************START ADDED CODE***************/
	 

	 
	 
	 renderer.domElement.addEventListener( 'click', onMouseClick );

	renderer.domElement.addEventListener( 'dblclick', onMousedblClick );
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
	
	
	//renderer.setSize(w, h);
	
	//camera.aspect = w / h;
	//camera.updateProjectionMatrix();
	
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );

}


window.addEventListener("resize", displayWindowSize);

function onMouseClick( event ) {

	if(sprite_1_buscado){scene.remove(sprite_1_buscado);to_look_outside=null}
}
function onMousedblClick( event ) {

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
var salto= true;
var numero_espacio = 0;
			for ( let j = 0; j < params.total; j ++ ) {
					cant_cir++;
					/*if(cant_cir%espacio==0){
						params.radio=params.radio+espacio;
						espacio=espacio*2;

					}*/
					params.radio=params.radio+30;
					salto = true;
				//for ( let i = 0; i < (params.radio*2) && (j <  params.total); i ++) {
				//for ( let i = 0; i < salto && (j <  params.total); i ++) {

				for ( let i = 0; salto &&( (i < (params.radio*2) )&& (j <  params.total)); i ++) {
				
					
					
					//if(435001 > i && i> 0){var uniqueColor = new THREE.Color( "fuchsia" );}

					
				 allParticles[j] = { name: j, position: new THREE.Vector3(  Math.cos(Math.PI*i/params.radio ) * params.radio, 0, Math.sin(Math.PI*i/params.radio ) *  params.radio ),link : document.createElement('a') };
				 allParticles[j].link.href = link_href;
				 allParticles[j].link.target = "_blank";
				 if(j== 499749||j== 499499||j== 497499||j== 494999||j== 469999||j== 434999||j== 374999||j== 299999||j== 199999){salto = false;
					espacio=100;params.radio=params.radio+espacio;
				}
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
						vertexColors: THREE.VertexColors,
						blending: THREE.AdditiveBlending,
						 depthTest: false,
					});
		
					particleSystem = new THREE.Points( particles, pMaterial );
					particleSystem.name = "cumeda";
					particleSystem.userData.particles = []; // to keep track of particles
					var color_particle = 1;
					allParticles.forEach( function( particle ) {
						
						if(color_particle>= 499751){var uniqueColor = new THREE.Color( "green" );}
						if(499750 >= color_particle && color_particle>= 499501){var uniqueColor = new THREE.Color( "yellow" );}
						if(499500 >= color_particle && color_particle>= 497501){var uniqueColor = new THREE.Color( "fuchsia" );}
						if(497500 >= color_particle && color_particle>= 470001){var uniqueColor = new THREE.Color( "yellow" );}
						if(470000 >= color_particle && color_particle>= 435001){var uniqueColor = new THREE.Color( "fuchsia" );}
						if(435000 >= color_particle && color_particle>= 375001){var uniqueColor = new THREE.Color( "yellow" );}
						if(375000 >= color_particle && color_particle>= 300001){var uniqueColor = new THREE.Color( "fuchsia" );}
						if(300000 >= color_particle && color_particle>= 200001){var uniqueColor = new THREE.Color( "yellow" );}
						if(200000 >= color_particle){var uniqueColor = new THREE.Color( "fuchsia" );}
						particles.vertices.push( particle.position );
						// Give each particle its own unique colour ... (we could
						// do this on-demand as a refinement, perhaps temporarily give
						// it a different THREE.Color on hover, for example)
						//pMaterial.map = texture;
						particle.map = texture;
						particles.colors.push( uniqueColor );
						//particle.uniqueColor = uniqueColor;
						// Make sure we can later find our particle again
						particleSystem.userData.particles.push( particle );
						color_particle++;
					});
					//particleSystem.userData.particles[10].map = texture;
					scene.add( particleSystem );
				});
		
		

	

			}

		

			function render() {

				TweenUmd.update();//********************************************************************************************************************** */
			
				raycast();
				renderer.render( scene, camera );

			}

 
function raycast() {     
	raycaster.setFromCamera( mouse, camera );	
	var intersects  ;
	
	
	var scaleFactor = 9;
	if(to_look_outside){var scale = scaleVector.subVectors(allParticles[to_look_outside].position, camera.position).length() / scaleFactor;
		controls.update();
		camera.lookAt( allParticles[to_look_outside].position.x, allParticles[to_look_outside].position.y, allParticles[to_look_outside].position.z );
		sprite_1_buscado.scale.set(scale, scale, 1);
		sprite_2_buscado.scale.set(scale, scale, 1);
		sprite_3_buscado.scale.set(scale, scale, 1);
	}
	  
	
	
  
	
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
					 scaleFactor = 9;
					var scale = scaleVector.subVectors(allParticles[partic.index].position, camera.position).length() / scaleFactor;

					sprite_1.scale.set(scale, scale, 1);
					sprite_2.scale.set(scale, scale, 1);
					sprite_3.scale.set(scale, scale, 1);
			//	}

			
			
			if(INTERSECTED.children[0]){INTERSECTED.remove(INTERSECTED.children[0]);}
			
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
			  //buscado= null;
			  //partic=null;
			  
			}
		  
			
  
  
  }
init();
main();
animate();



