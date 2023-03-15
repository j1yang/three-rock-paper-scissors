import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js";
import { BoxLineGeometry } from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/geometries/BoxLineGeometry.js";
import { Sphere } from "./Sphere.js";
import { TextGeometry} from"https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/geometries/TextGeometry.js";
import {FontLoader} from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/FontLoader.js";
//scene, camera and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
);
camera.position.set(1.5, 0.5, 2);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);










var particle = new THREE.Object3D();

scene.add(particle);

var geometry = new THREE.TetrahedronGeometry(0.0085, 0);

var material = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  shading: THREE.FlatShading
});

for (var i = 0; i < 1000; i++) {
  var mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
  mesh.position.multiplyScalar(1.5 + (Math.random() * 2));
  mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
  particle.add(mesh);
}







window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
});










//lights
const light = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(light);
const light2 = new THREE.AmbientLight(0xffffff, 0.9);
light2.position.set(0, 0, 0);
scene.add(light2);









let room = new THREE.LineSegments(
  new BoxLineGeometry(1, 1, 1, 1, 1, 1),
  new THREE.LineBasicMaterial({ color: 0x808080 })
);
scene.add(room);


const textureLoader = new THREE.TextureLoader();
const rockTex = textureLoader.load('../res/imgs/rock.png');
const paperTex = textureLoader.load('../res/imgs/paper.png');
const scissorsTex = textureLoader.load('../res/imgs/scissors.png');


//create ball
const recRad = 0.5;
for (let i = 0; i < 50; i++) {
  const sphere = new Sphere(recRad, "red", "rock", room, rockTex);
  room.add(sphere);
}
for (let i = 0; i < 50; i++) {
  const sphere = new Sphere(recRad, "orange", "paper", room, paperTex);
  room.add(sphere);
}
for (let i = 0; i < 50; i++) {
  const sphere = new Sphere(recRad, "green", "scissors", room, scissorsTex);
  room.add(sphere);
}






const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
controls.enableRotate = true;
controls.update();

renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);



let rock, paper, scissors;
const texts = ['rock', 'paper', 'scissors'];

const fontLoader = new FontLoader();
const font = fontLoader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/fonts/helvetiker_regular.typeface.json', (font) => {
  let space = 0;
  let rot = 8
  texts.forEach((t)=>{
    const textGeometry = new TextGeometry(t, {
      font: font,
      size: 0.05,
      height: 0.05,
      curveSegments: 12,
      bevelEnabled: false,
      bevelThickness: 0,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 0,
    });
  
    const material = new THREE.MeshBasicMaterial({ color: new THREE.Color('black').getHex() });
    const textMesh = new THREE.Mesh(textGeometry, material);
    textMesh.position.set(camera.projectionMatrix.elements[5]-0.48 + space, -0.5,0);
    space+=0.2;
    textMesh.rotation.set(camera.rotation.x,camera.rotation.y -Math.PI/rot,camera.rotation.z-Math.PI/16)
  rot-1
    scene.add(textMesh);
  })
});

let iSize = 0.4;
const redBoxGeo= new THREE.PlaneGeometry(iSize, iSize);
const redMat = new THREE.MeshBasicMaterial({color: new THREE.Color('red').getHex()});
const redMesh = new THREE.Mesh(redBoxGeo, redMat);
scene.add(redMesh)

const orangeBoxGeo= new THREE.PlaneGeometry(iSize, iSize);
const orangeMat = new THREE.MeshBasicMaterial({color: new THREE.Color('orange').getHex()});
const orangeMesh = new THREE.Mesh(orangeBoxGeo, orangeMat);
scene.add(orangeMesh)

const greenBoxGeo= new THREE.PlaneGeometry(iSize, iSize);
const greenMat = new THREE.MeshBasicMaterial({color: new THREE.Color('green').getHex()});
const greenMesh = new THREE.Mesh(greenBoxGeo, greenMat);
scene.add(greenMesh)


function count() {
  rock = 0;
  paper = 0;
  scissors = 0;
  //console.time("for loop");
  for (let i = 0; i < room.children.length; i++) {
    const o = room.children[i];
    switch (o.name) {
      case "rock":
        rock++;
        break;
      case "paper":
        paper++;
        break;
      case "scissors":
        scissors++;
        break;
    }
  }
// get the camera's right and top vectors
console.log(camera)
console.log(redMesh)
  redMesh.scale.set(iSize,2*(rock / 150),10)
  redMesh.position.set(camera.projectionMatrix.elements[5]-0.4,0.4 *(rock/150) -0.4,0); //0,5,10,14

  orangeMesh.scale.set(iSize,2*(paper / 150),10)
  orangeMesh.position.set(camera.projectionMatrix.elements[5] - 0.2,0.4 *(paper/150)-0.4,0);

  greenMesh.scale.set(iSize,2*(scissors / 150),10)
  greenMesh.position.set(camera.projectionMatrix.elements[5],0.4 *(scissors/150)-0.4,0);

  // redMesh.rotation.set(0, Math.PI /6 ,Math.PI /2)
  // orangeMesh.rotation.set(0, Math.PI /6,Math.PI /2)
  // greenMesh.rotation.set(0, Math.PI /6,Math.PI /2)
  // redMesh.quaternion.set(camera.quaternion.x,camera.quaternion.y,camera.quaternion.z ,camera.quaternion.w)
  // orangeMesh.quaternion.set(camera.quaternion.x,camera.quaternion.y,camera.quaternion.z ,camera.quaternion.w)
  // greenMesh.quaternion.set(camera.quaternion.x,camera.quaternion.y,camera.quaternion.z ,camera.quaternion.w)

  redMesh.rotation.set(0,0,0)
  orangeMesh.rotation.set(0,0,0)
  greenMesh.rotation.set(0,0,0)

  // const scoreDiv = document.querySelector(".score");
  // scoreDiv.innerHTML =
  //   "rock(red): " +
  //   (rock /150 *100).toFixed(0) + "%"+
  //   "\npaper(orange): " +
  //   (paper /150 *100).toFixed(0) + "%"+
  //   "\nscissors(green): " +
  //   (scissors /150 *100).toFixed(0) + "%";

  if (rock == 150) {
    stopBalls(room.children);
    // scoreDiv.innerHTML = "Rock Won!";
  } else if (paper == 150) {
    stopBalls(room.children);
    // scoreDiv.innerHTML = "Paper Won!";
  } else if (scissors == 150) {
    stopBalls(room.children);
    // scoreDiv.innerHTML = "Scissors Won!";
  }
}

function collissionEvent() {
  for (let i = 0; i < room.children.length; i++) {
    let mainBall = room.children[i];
    for (let j = i + 1; j < room.children.length; j++) {
      let subBall = room.children[j];
      mainBall.collide(subBall);
    }
  }
}

function stopBalls(balls) {
  balls.forEach((o) => {
    o.stop();
  });
}







// animation
function animation(time) {
  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0040;
  room.rotation.y -= 0.0030;

  renderer.clear();

  count();

  collissionEvent();

  room.children.forEach((o) => {
    o.glitchFree();
  });

  room.children.forEach((o) => {
    o.move();
  });
  

  renderer.render(scene, camera);
}