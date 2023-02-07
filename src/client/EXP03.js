// Import the necessary three.js modules
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

document.getElementById('beamCount').addEventListener('change', regenBeams)
document.getElementById('waveCount').addEventListener('change', regenBeams)
document.getElementById('waveHeight').addEventListener('change', regenBeams)
document.getElementById('speedSlider').addEventListener('change', regenBeams)
document.getElementById('patternA').addEventListener('click',selPatternA)
document.getElementById('patternB').addEventListener('click',selPatternB)

const mouse = new THREE.Vector2(), raycaster = new THREE.Raycaster();
// Set up the scene

const scene = new THREE.Scene();
scene.background=new THREE.Color("white")
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 4000);


camera.position.set(40,20,0)

const renderer = new THREE.WebGLRenderer( { antialias: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=.6
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
scene.add(camera);

let controls = new OrbitControls( camera,  renderer.domElement  );
          controls.minDistance = 10;
          controls.maxDistance = 600;
          controls.update()

const loader = new GLTFLoader()



let directionalLight= new THREE.DirectionalLight("white",1)
directionalLight.position.y=5
directionalLight.position.x=30
directionalLight.position.z=30
directionalLight.castShadow=true
const helper = new THREE.DirectionalLightHelper( directionalLight, 1 ); 
directionalLight.shadow.camera.left = 50;
directionalLight.shadow.camera.right = -50;
directionalLight.shadow.camera.top = 50;
directionalLight.shadow.camera.far=100
directionalLight.shadow.camera.near=-100
directionalLight.shadow.bias = -0.005;
const helpe2r = new THREE.CameraHelper( directionalLight.shadow.camera );


//scene.add( helpe2r );
//scene.add( helper );
let ambientLight= new THREE.AmbientLight("white",.1)
scene.add(ambientLight)
scene.add(directionalLight)

let textureLoad= new THREE.TextureLoader()
const woodTexture=textureLoad.load("./oak.jpg")

woodTexture.wrapS = THREE.RepeatWrapping;
woodTexture.wrapT = THREE.RepeatWrapping;
woodTexture.repeat.set(5, 1);


new RGBELoader().load(
  './venice_sunset_1k.hdr', function ( texture ) {

    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
    scene.backgroundBlurriness=.15
  })


let beamsAnimate=true
function animate(){
  requestAnimationFrame(animate);
  sculpture.rotation.y+=0.01
  
    if(beamsAnimate==true){
      if(beamPattern=="A"){
        for(let i=0;i<beams.length;i++){
          if(beams[i].direction=="up"){
            beams[i].position.y+=speed
            if(beams[i].position.y>beam.position.y+maxHeight){
              beams[i].direction="down"
          }
        }
        if(beams[i].direction=="down"){
          beams[i].position.y-=speed
          if(beams[i].position.y<beam.position.y){
            beams[i].position.y=beam.position.y
            beams[i].direction="up"
        }
      }
         
      }
    }
    else if(beamPattern=="B"){
      for(let i=0;i<beams.length;i++){
        if(beams[i].count>set2.length-1){
          beams[i].count=0
        }

        beams[i].position.y=map(set2[beams[i].count],[Math.min(...set),Math.max(...set)],[0,maxHeight])+beam.position.y
        

        beams[i].count+=1
       

      }
    }
      }

 
  


  renderer.render(scene,camera)
}
let sculpture
let floor
let wall1
let wall2
let cap1,cap2,base
let wallLength=492.7
var beamLength
let beam
let beams=[]
let waveCount
let beamCount=50
let maxHeight=1
let speed
var beamPattern="A"
let set2,set
document.getElementById("speedSlider").value=.02
console.log(maxHeight)

document.getElementById('beamCount').value=50
document.getElementById('waveHeight').value=1

function regenBeams(){
  for(let u=0;u<beams.length;u++){
    scene.remove(beams[u])
  }
  woodTexture.repeat.set(5,12/beamCount)
  console.log(12/beamCount)
  console.log(scene)
  beamCount=document.getElementById('beamCount').value
  beamsAnimate=false
  speed=Number(document.getElementById("speedSlider").value)
  beamLength=(492.7/beamCount)/12
  beam=new THREE.Mesh(new THREE.BoxGeometry(419.30/12,8/12,beamLength),new THREE.MeshStandardMaterial({map:woodTexture}))
  beam.position.set(0,168/12+8/12,wallLength/24)
  beams=[]
  maxHeight=Number(document.getElementById("waveHeight").value)
  console.log(maxHeight)
  waveCount=document.getElementById("waveCount").value
  set=[]
  for(let i=0;i<beamCount;i++){
    set.push(maxHeight*Math.sin(map(i,[0,beamCount],[0,Math.PI*2])*waveCount))
  }
  //scene.add(beam)
  set2=[]
  for(let i=0;i<beamCount;i+=speed){
    set2.push(maxHeight*Math.sin(map(i,[0,beamCount],[0,Math.PI*2])*waveCount))
  }

  for(let i=0;i<beamCount;i++){
    let beamClone=beam.clone()
    beamClone.position.z=beam.position.z+beamLength*-i
    beamClone.direction="up"
    beamClone.count=Math.trunc(map(i,[0,beamCount],[0,set2.length]))

    

    beamClone.position.y=beam.position.y+map((maxHeight*Math.sin(map(i,[0,beamCount],[0,Math.PI*2])*waveCount)),[Math.min(...set),Math.max(...set)],[0,maxHeight])

    
  
    beamClone.material=new THREE.MeshStandardMaterial({map:woodTexture})
    beamClone.castShadow=true
    beamClone.receiveShadow=true
    beams.push(beamClone)
    scene.add(beamClone)
  }
  updateTextures(beams)
  beamsAnimate=true
}

function selPatternA(){
  beamPattern="A"
  document.getElementById("speedSlider").min=.01
  document.getElementById("speedSlider").max=.03
  document.getElementById("speedSlider").step=.01
  regenBeams()
}
function selPatternB(){
  beamPattern="B"
  document.getElementById("speedSlider").min=.05
  document.getElementById("speedSlider").max=.3
  document.getElementById("speedSlider").step=.05
  regenBeams()
}
updateTextures(beams)
document.addEventListener("DOMContentLoaded", function(event) {
  loader.load(
    './scene_0004.gltf',
    function(gltf){
      scene.add(gltf.scene);
  
      gltf.animations; // Array<THREE.AnimationClip>
      gltf.scene; // THREE.Group
      gltf.scenes; // Array<THREE.Group>
      gltf.cameras; // Array<THREE.Camera>
      gltf.asset; // Object
      var max=scene.children.length-1
      floor=scene.children[max].children[0].children[3]
      sculpture=scene.children[max].children[0].children[0]
      wall1=scene.children[max].children[0].children[2]
      wall2=scene.children[max].children[0].children[1]
      cap1=scene.children[max].children[0].children[4]
      cap2=scene.children[max].children[0].children[5]
      base=scene.children[max].children[0].children[6]
      floor.receiveShadow=true
      sculpture.castShadow=true
      sculpture.receiveShadow=true
      wall1.castShadow=true
      wall2.castShadow=true
      wall1.receiveShadow=true
      wall2.receiveShadow=true
      cap1.receiveShadow=true
      cap2.receiveShadow=true
      cap1.castShadow=true
      cap2.castShadow=true
      base.castShadow=true
      base.receiveShadow=true
      
      var center = new THREE.Vector3();
      sculpture.geometry.computeBoundingBox();
      sculpture.geometry.boundingBox.getCenter(center);
      sculpture.geometry.center();
      sculpture.position.copy(center);
      
      document.getElementById("wrapper").style.opacity=0;
      setTimeout(() => document.getElementById("wrapper").remove(), 1000);
      regenBeams()

      
      animate()
    }
    )

});

function updateTextures(meshes) {
  for (let i = 0; i < meshes.length; i++) {
      let cloneTexture = meshes[i].material.map.clone();
      cloneTexture.needsUpdate = true;
      let r1 = getRandomValue(0, 100);
      let r2 = getRandomValue(0, 100);
      cloneTexture.offset = new THREE.Vector2(r1, r2);
      meshes[i].material.map = cloneTexture;
      meshes[i].material.map.needsUpdate = true;
  }
}

function getRandomValue(min, max) {
  return Math.random() * (max - min + 1) + min;
}

function map (value, oldRange, newRange) {
  var newValue = (value - oldRange[0]) * (newRange[1] - newRange[0]) / (oldRange[1] - oldRange[0]) + newRange[0];
  return Math.min(Math.max(newValue, newRange[0]) , newRange[1]);
}
