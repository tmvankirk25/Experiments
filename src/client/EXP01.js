// Import the necessary three.js modules
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


import dink from "../../resources/EXP01-ORBS/audio/dink.wav"
import dunes from "../../resources/EXP01-ORBS/audio/dunes-7115.mp3"
import whooshBell from "../../resources/EXP01-ORBS/audio/composedWooshBell.wav"
// import { EffectComposer } from '/postprocessing/EffectComposer.js';
// import { RenderPass } from '/postprocessing/RenderPass.js';
// import { ShaderPass } from '/postprocessing/ShaderPass.js';
// import { UnrealBloomPass } from '/postprocessing/UnrealBloomPass.js';

// Import the necessary three.js modules

window.addEventListener("load",function(){
  document.getElementById("wrapper").style.opacity=0;
  setTimeout(() => document.getElementById("wrapper").remove(), 1000);
  document.getElementById("prompt").style.opacity=1;
  if(window.innerWidth>850){
    tutorialWeb()
  }
  else{
    tutorialMobile()
  }
  
  
});

function tutorialWeb(){
  document.getElementById('sound').style.border="solid white 2px"
  document.getElementById('prompt').innerHTML="Toggle sound on/off"
  setTimeout(function(){document.getElementById('sound').style.border=""
  document.getElementById('prompt').innerHTML="Adjust brightness until spheres are barely visible"
  document.getElementById('brightness').style.border="solid white 2px"
  document.getElementById('brightness').style.opacity=1
  setTimeout(function(){document.getElementById('brightness').style.border=""
  document.getElementById('brightness').style.opacity=""
  document.getElementById('prompt').innerHTML="Left click and drag to rotate"
  document.addEventListener("click",function(){document.getElementById("prompt").innerHTML="Right click and drag to pan"
  document.addEventListener("contextmenu",function(){document.getElementById("prompt").innerHTML="Click a sphere to begin"
  document.addEventListener( 'click', onClick );
},{once:true})
},{once:true})
 
},4000)
},4000)

  
  

  
}

function tutorialMobile(){
  document.getElementById('sound').style.border="solid white 2px"
  document.getElementById('prompt').innerHTML="Toggle sound on/off"
  setTimeout(function(){document.getElementById('sound').style.border=""
  document.getElementById('prompt').innerHTML="Adjust brightness until spheres are barely visible"
  document.getElementById('brightness').style.border="solid white 2px"
  document.getElementById('brightness').style.opacity=1
  setTimeout(function(){document.getElementById('brightness').style.border=""
  document.getElementById('brightness').style.opacity=""
  document.getElementById('prompt').innerHTML="Touch and drag to rotate"
  document.addEventListener("touchstart",function(){document.getElementById("prompt").innerHTML="Two finger touch and drag to pan"
  document.addEventListener("touchstart",function(){
      document.getElementById("prompt").innerHTML="Click a sphere to begin"
      document.addEventListener( 'click', onClick );
    
    
 
},{once:true})
},{once:true})
 
},4000)
},4000)

  
  

  
}

document.getElementById('sound').addEventListener('click',soundFunction)
document.getElementById('mute').addEventListener('click',soundFunction)

document.getElementById("reset").addEventListener("click",reset)
document.getElementById('brightness').addEventListener('click',adjustBrightness)

let backgroundTrack= new Audio()
backgroundTrack.src=dunes
backgroundTrack.loop= true
console.log(backgroundTrack)

let track=.40
function adjustBrightness(){
  ambientLight.intensity+=.015
  track+=.20
  console.log(ambientLight.intensity)
  console.log(track)
  document.getElementById('brightness').style.opacity=track
  if(ambientLight.intensity>.075){
    ambientLight.intensity=.015
    document.getElementById('brightness').style.opacity=.25
    track=.20
  }
}

function soundFunction(){
  if(backgroundTrack.muted==true){
    backgroundTrack.muted=false
    audio.muted=false
    successAudio.muted=false
    document.getElementById('sound').style.visibility='visible'
    document.getElementById('mute').style.visibility='hidden'
  }
  else{
    backgroundTrack.muted=true
    audio.muted=true
    successAudio.muted=true
    document.getElementById('sound').style.visibility='hidden'
    document.getElementById('mute').style.visibility='visible'
  }
  
}

const mouse = new THREE.Vector2(), raycaster = new THREE.Raycaster();
// Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 4000);
const renderer = new THREE.WebGLRenderer( { antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ReinhardToneMapping;
document.body.appendChild(renderer.domElement);
scene.add(camera);



const ENTIRE_SCENE = 0, BLOOM_SCENE = 1;

const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );

const params = {
  exposure: 1,
  bloomStrength: 5,
  bloomThreshold: 0,
  bloomRadius: 0,
};

const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;

const bloomComposer = new EffectComposer( renderer );
bloomComposer.renderToScreen = false;
bloomComposer.addPass( renderScene );
bloomComposer.addPass( bloomPass );

const finalPass = new ShaderPass(
  new THREE.ShaderMaterial( {
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture }
    },
    vertexShader: document.getElementById( 'vertexshader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
    defines: {}
  } ), 'baseTexture'
);
finalPass.needsSwap = true;

const finalComposer = new EffectComposer( renderer );
finalComposer.addPass( renderScene );
finalComposer.addPass( finalPass );




backgroundTrack.addEventListener("canplaythrough", () => {
    backgroundTrack.play().catch(e => {
       window.addEventListener('click', () => {
          backgroundTrack.play()
       })
    })
 });

console.log("hjhjk")
const audio = new Audio();
audio.src = dink;
console.log(dink)

const successAudio = new Audio()
successAudio.src=whooshBell

camera.position.z=-600

// Set up the controls
let controls = new OrbitControls( camera,  renderer.domElement  );
          controls.minDistance = 120;
          controls.maxDistance = 600;
          controls.update()

// Set up the spheres
//const sphereGeometry = new THREE.SphereGeometry(getRandomArbitrary(1, 10), 32, 32);
const darkMaterial = new THREE.MeshBasicMaterial( { color: 'black' } );
const materials = {};
const spheres = [];
for (let i = 0; i < 120; i++) {
  let radius=getRandomArbitrary(10, 60)
  let sphereGeometry= new THREE.SphereGeometry(radius, 32, 32)
  // Generate a random color
  const color = new THREE.Color("white");
  // color.setHSL( Math.random(), 0.7, Math.random() * 0.2 + 0.05 )
  //color.setHSL( 62, 0, .1 )
  // Create the sphere with the random color
  const sphereMaterial = new THREE.MeshStandardMaterial({ color:color, emissive:"white", emissiveIntensity:0});
 
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  //const light = new THREE.PointLight( "#fffaed", 0, radius+50 );
  sphere.position.set(getRandomArbitrary(-400, 400), getRandomArbitrary(-400, 400), getRandomArbitrary(-400, 400));
  //light.position.set(sphere.position.x,sphere.position.y,sphere.position.z );
  sphere.velocity = new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(1.8);
  var randFactor=Math.random()
  if(randFactor<.5){
    sphere.velocity.x*=-1
    sphere.velocity.y*=-1
  }
  sphere.radius=radius
  sphere.bloom=false
  //sphere.attach(light)
  spheres.push(sphere);
  scene.add(sphere);
  console.log(sphere.material)
}
let index=getRandomArbitrary(0,spheres.length)
// spheres[index].children[0].intensity=5
// spheres[index].material.emissiveIntensity=5

let ambientLight= new THREE.AmbientLight ( 0xffffff, .03)
scene.add(ambientLight)
// let dirLight= new THREE.DirectionalLight( 0xffffff, 1 )
// let dirLight2= new THREE.DirectionalLight( 0xffffff, 1 )
// let dirLight3= new THREE.DirectionalLight( 0xffffff, .5 )
// dirLight2.position.set(-.5,.5,0)
// dirLight3.position.set(.5,-.5,.5)
// scene.add(dirLight)
function reset(){
  console.log("reset")
  successToggle=true
  audio.currentTime=0
  audio.play()
  for(const sphere of spheres){
    sphere.layers.disable(1)
    sphere.bloom=false
    sphere.material.emissiveIntensity=0
  }
}
let promptBool=false
function onClick( event ) {
  event.preventDefault();
  console.log("click")
  // controls.enableRotate=false
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    console.log(mouse.x)
    console.log(event.clientX)

    raycaster.setFromCamera( mouse, camera );

    const intersections = raycaster.intersectObjects( spheres, false );
    console.log(spheres.length)
    if ( intersections.length > 0 ) {

      const object = intersections[ 0 ].object;
      console.log(object)
      if (promptBool==false){
        promptBool=true
        document.getElementById("prompt").style.display="none"
      }
      if(object.bloom==true){
        object.layers.disable( 1 )
        object.bloom=false
        object.material.emissiveIntensity=0
      }
      else{
        audio.currentTime=0
        audio.play()
        object.layers.enable( 1 )
        object.material.emissiveIntensity=.1
        object.bloom=true
      }
     
    }
  }


// Render the scene
function animate() {
  requestAnimationFrame(animate);
  // Update the spheres' positions
  for (const sphere of spheres) {
    sphere.velocity.clampLength(.5,10000)
    sphere.position.add(sphere.velocity);

    if (sphere.position.x < -window.innerWidth/2+sphere.radius || sphere.position.x > window.innerWidth/2-sphere.radius) {
        // Reflect the velocity off the x-boundary
        sphere.velocity.x *= -1;
      }
      if (sphere.position.y < -window.innerHeight/2 || sphere.position.y > window.innerHeight/2) {
        // Reflect the velocity off the y-boundary
        sphere.velocity.y *= -1;
      }
      if (sphere.position.z < -400 || sphere.position.z > 400) {
        sphere.velocity.z *= -1;
      }
    // Check for collisions with other spheres
    for (const other of spheres) {
      if (sphere !== other && sphere.position.distanceTo(other.position) <= sphere.radius+5|| sphere !== other && other.position.distanceTo(sphere.position)<=other.radius+5) {
        // Calculate the new velocities
        const v1 = sphere.velocity.clone();
        const v2 = other.velocity.clone();
        const normal = other.position.clone().sub(sphere.position).normalize();
        
        if(sphere.bloom==true || other.bloom==true){
          if(sphere.bloom==false || other.bloom==false){
            audio.currentTime=0
            audio.play()
            if(sphere.bloom==false){
              sphere.layers.enable(1)
              sphere.material.emissiveIntensity=.1

            }
            if(other.bloom==false){
              other.layers.enable(1)
              other.material.emissiveIntensity=.1

            }
            
            sphere.bloom=true
            other.bloom=true
          }
          
          // sphere.children[0].intensity=5
          // other.children[0].intensity=5
          // sphere.material.emissiveIntensity=5
          // other.material.emissiveIntensity=5
          
          sphere.velocity=sphere.velocity.multiplyScalar(.99)
          other.velocity=other.velocity.multiplyScalar(.99)
        }

        // sphere.velocity = v1.sub(normal.multiplyScalar(1 * v1.dot(normal)));
        // other.velocity = v2.sub(normal.multiplyScalar(1* v2.dot(normal)));

        // Move the spheres out of each other
        // sphere.position.add(sphere.velocity);
        // other.position.add(other.velocity);
      }
    }

  }
  var testBool=true
  var count=0
  for(let i=0;i<spheres.length;i++){
    if(spheres[i].bloom==false){
      testBool=false
      count+=1
    }
  }
  //console.log(count)
  if(testBool==true){
    successFunction()
    blinkStep()
  }
  render()
}
animate();
//render();

function renderBloom(){
  scene.traverse( darkenNonBloomed );
  bloomComposer.render()
  scene.traverse( restoreMaterial );
}



function darkenNonBloomed( obj ) {

  if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {

    materials[ obj.uuid ] = obj.material;
    obj.material = darkMaterial;

  }

}

function restoreMaterial( obj ) {

  if ( materials[ obj.uuid ] ) {

    obj.material = materials[ obj.uuid ];
    delete materials[ obj.uuid ];

  }

}

let successToggle=true
function successFunction(){
  if(successToggle==true){
    blink()
    console.log("all spheres are lit!")
    successAudio.currentTime=0
    successAudio.play()
    successToggle=false
  }
}

function blink(){
  for(const sphere of spheres){
    sphere.material.emissiveIntensity=Math.random()* (.1- 0)
    sphere.blink="up"
  }
}

function blinkStep(){
  for(const sphere of spheres){
    if(sphere.blink=="up"){
      sphere.material.emissiveIntensity+=.005
      if(sphere.material.emissiveIntensity>.1){
        sphere.blink="down"
    }
  }
  if(sphere.blink=="down"){
    sphere.material.emissiveIntensity-=.005
    if(sphere.material.emissiveIntensity<0){
      sphere.material.emissiveIntensity=0
      sphere.blink="up"
  }
}
  }
}


function render(){
  renderBloom()
  finalComposer.render()
}

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

