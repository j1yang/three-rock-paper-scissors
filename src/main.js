import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js";
import { BoxLineGeometry } from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/geometries/BoxLineGeometry.js";
import { Sphere } from "./Sphere.js";
// init
const loader = new THREE.TextureLoader();
const texture = loader.load(
  "../res/backgrounds/galaxy_starfield.png",
  () => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
    rt.fromEquirectangularTexture(renderer, texture);
    rt.texture.minFilter = THREE.LinearFilter;
    scene.background = rt.texture;
  }
);

//scene, camera and renderer
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  10
);
camera.position.set(0, 0, 1.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

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

//create ball
const recRad = 0.5;
for (let i = 0; i < 50; i++) {
  const sphere = new Sphere(recRad, "red", "rock", room);
  room.add(sphere);
}
for (let i = 0; i < 50; i++) {
  const sphere = new Sphere(recRad, "orange", "paper", room);
  room.add(sphere);
}
for (let i = 0; i < 50; i++) {
  const sphere = new Sphere(recRad, "green", "scissors", room);
  room.add(sphere);
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;
renderer.setAnimationLoop(animation);
controls.update();
document.body.appendChild(renderer.domElement);

function count() {
  let rock = 0;
  let paper = 0;
  let scissors = 0;
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

  const scoreDiv = document.querySelector(".score");
  scoreDiv.innerHTML =
    "counts: \n" +
    "rock(red): " +
    rock +
    "\npaper(orange): " +
    paper +
    "\nscissors(green): " +
    scissors +
    "\ntotal: " +
    (parseInt(rock) + parseInt(paper) + parseInt(scissors));
  if (rock == 150) {
    stopBalls(room.children);
    scoreDiv.innerHTML = "Rock Won!";
  } else if (paper == 150) {
    stopBalls(room.children);
    scoreDiv.innerHTML = "Paper Won!";
  } else if (scissors == 150) {
    stopBalls(room.children);
    scoreDiv.innerHTML = "Scissors Won!";
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
function checkGameOver(rock, paper, scissors, balls) {
  if (rock == 150) {
    stopBalls(balls);
    return "Rock Won!";
  } else if (paper == 150) {
    stopBalls(balls);
    return "Paper Won!";
  } else if (scissors == 150) {
    stopBalls(balls);
    return "Scissors Won!";
  }
}
// animation
function animation(time) {
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