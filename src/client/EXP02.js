
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import rhino from "../../resources/EXP02-RGBXYZ/images/rhino.png"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 4000);
const renderer = new THREE.WebGLRenderer( { antialias: true });
scene.background=new THREE.Color('#f0f0f0')
renderer.setSize(window.innerWidth/2, window.innerHeight/2);
renderer.toneMapping = THREE.ReinhardToneMapping;
document.body.appendChild(renderer.domElement);
scene.add(camera);

THREE.Object3D.DefaultUp.set(0, 0, 1);

let controls = new OrbitControls( camera,  renderer.domElement  );
          controls.minDistance = 120;
          controls.maxDistance = 600;
          controls.update()


const canvas = document.createElement("canvas");
document.body.appendChild(canvas)
const ctx = canvas.getContext("2d");

let image = new Image(); // Using optional size for image
; // Draw when image has loaded
image.onload=drawImageActualSize
// Load an image of intrinsic size 300x227 in CSS pixels

document.getElementById("img").addEventListener('change',(e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        image.src = e.target.result;
    };
 reader.readAsDataURL(file);
})



//image.src = rhino;

function drawImageActualSize() {
// Use the intrinsic size of image in CSS pixels for the canvas element
canvas.width = this.naturalWidth;
canvas.height = this.naturalHeight;

ctx.drawImage(this, 0, 0);
console.log(this.naturalHeight)
for(let y=0;y<this.naturalHeight;y+=25){
    for(let x=0;x<this.naturalWidth;x+=25){
        let data=ctx.getImageData(x,y,1,1).data
        let sphereGeo=new THREE.SphereGeometry(3,40,40)
        console.log(String(rgbToHex(data[0],data[1],data[2])))
        let sphere= new THREE.Mesh(sphereGeo, new THREE.MeshStandardMaterial({color: new THREE.Color(String("rgb("+data[0]+","+data[1]+","+data[2]+")"))}))
        sphere.position.set(data[0],data[1],data[2])
        scene.add(sphere)
        // let geometryP= new THREE.BufferGeometry();
        // let pointDraw=[data[0],data[1],data[2]]
        // console.log(data[0],data[1],data[2])
        // geometryP.position= new THREE.Float32BufferAttribute( pointDraw, 3 );
        // geometryP.computeBoundingSphere()
        // console.log(geometryP)
        // let materialP= new THREE.PointsMaterial({ size: 20, color: "red"})
        // let pointP= new THREE.Points(geometryP,materialP)
        // scene.add(pointP)
        //console.log(x,y)
    }
}
}
let ambientLight= new THREE.AmbientLight(0xffffff,1)
scene.add(ambientLight)
//scene.add(new THREE.Mesh(new THREE.SphereGeometry(40,32,32),new THREE.MeshPhongMaterial({color:"red"})))

let dirLight= new THREE.DirectionalLight( 0xffffff, 1 )
let dirLight2= new THREE.DirectionalLight( 0xffffff, 1 )
let dirLight3= new THREE.DirectionalLight( 0xffffff, .5 )
dirLight2.position.set(-.5,.5,0)
dirLight3.position.set(.5,-.5,.5)
scene.add(dirLight)
scene.add(dirLight2)
scene.add(dirLight3)

function animate() {
    requestAnimationFrame(animate);




    renderer.render(scene,camera)
}
animate()

function rgbToHex(r, g, b) {

    return(valueToHex(r) + valueToHex(g) + valueToHex(b));
  
  }

  function valueToHex(c) {

    var hex = c.toString(16);
  
    return hex
  
  }