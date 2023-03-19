import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js";
import { BoxLineGeometry } from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/geometries/BoxLineGeometry.js";
import { Sphere } from "./Sphere.js";
import { TextGeometry} from"https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/geometries/TextGeometry.js";
import {FontLoader} from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/FontLoader.js";
import Stats from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/libs/stats.module.js";

let user_guess = '';
let onGame = false;
let guessBtns = [];

let rock, paper, scissors, winner;
let isGameEnd = false;

const guessTitle = document.querySelector('.guess_title')
const guessRockBtn = document.querySelector('.guess_rock')
const guessPaperBtn = document.querySelector('.guess_paper')
const guessScissorsBtn = document.querySelector('.guess_scissors')
guessBtns.push(guessRockBtn);
guessBtns.push(guessPaperBtn);
guessBtns.push(guessScissorsBtn);
let guesses = ['Rock', 'Paper', 'Scissors'];
const gameResult = document.querySelector('.game_result')

for (let i = 0; i < guessBtns.length; i++) {
  guessBtns[i].addEventListener("click", function() {
    for (let j = 0; j < guessBtns.length; j++) {
      guessBtns[j].classList.remove("active");
    }
    user_guess = guesses[i];
    guessTitle.innerHTML= 'Your guessed {' + user_guess +'}';

    // Add the active class to the clicked button
    this.classList.add("active");
    if(user_guess != ''){
      playBtn.style.display = 'block';
    }
  });
}



const playBtn = document.querySelector('.play');
playBtn.style.display = 'none';
if(user_guess != ''){
  playBtn.style.display = 'block';
  
}
playBtn.addEventListener('click', function() {
  onGame = true;
  for (var i = 0; i < guessBtns.length; i++) {
    guessBtns[i].disabled = true;
    guessBtns[i].style.pointerEvents = 'none';//auto
  }
  playBtn.style.display = 'none';
});

const replayBtn = document.querySelector('.replay');
replayBtn.style.display = 'none';

replayBtn.addEventListener('click', function() {
  for (var i = 0; i < guessBtns.length; i++) {
    guessBtns[i].disabled = false;
    guessBtns[i].style.pointerEvents = 'auto';
    guessBtns[i].classList.remove("active");
  }
  onGame = false;
  isGameEnd = false;
  user_guess = '';
  winner = '';
  rock = 0;
  paper =0;
  scissors = 0;
  while (room.children.length > 0) {
    room.remove(room.children[0]);
  }
  room.position.set(0,0,0)
  room.rotation.set(0,0,0)
  const recRad = 0.5;
  for (let i = 0; i < 50; i++) {
    const sphere = new Sphere(recRad, "red", "rock", room, rockTex, onGame);
    room.add(sphere);
  }
  for (let i = 0; i < 50; i++) {
    const sphere = new Sphere(recRad, "orange", "paper", room, paperTex, onGame);
    room.add(sphere);
  }
  for (let i = 0; i < 50; i++) {
    const sphere = new Sphere(recRad, "green", "scissors", room, scissorsTex, onGame);
    room.add(sphere);
  }

  guessTitle.innerHTML= 'Your guess?';
  gameResult.innerHTML= '{Please guess and play}';
});


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



// const stats = new Stats();
// stats.showPanel( 1 );  // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild( stats.dom );




// Particles
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


//window resize
window.addEventListener('resize', function() {
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//lights
const light = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(light);
const light2 = new THREE.AmbientLight(0xffffff, 0.9);
light2.position.set(0, 0, 0);
scene.add(light2);

//create room
let room = new THREE.LineSegments(
  new BoxLineGeometry(1, 1, 1, 1, 1, 1),
  new THREE.LineBasicMaterial({ color: 0x808080 })
);
scene.add(room);
console.log(room)
//load texture (rps)
const textureLoader = new THREE.TextureLoader();
const rockTex = textureLoader.load('../res/imgs/rock.png');
const paperTex = textureLoader.load('../res/imgs/paper.png');
const scissorsTex = textureLoader.load('../res/imgs/scissors.png');


//create ball
const recRad = 0.5;
for (let i = 0; i < 50; i++) {
  const sphere = new Sphere(recRad, "red", "rock", room, rockTex, onGame);
  room.add(sphere);
}
for (let i = 0; i < 50; i++) {
  const sphere = new Sphere(recRad, "orange", "paper", room, paperTex, onGame);
  room.add(sphere);
}
for (let i = 0; i < 50; i++) {
  const sphere = new Sphere(recRad, "green", "scissors", room, scissorsTex, onGame);
  room.add(sphere);
}

//orbit control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enableRotate = false;
controls.update();

renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);





//display texture (rps)
var rockMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(0.16, 0.16),
  new THREE.MeshBasicMaterial({
    map: rockTex,
    alphaTest: 0.1
}
));
scene.add(rockMesh)

var paperMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(0.16, 0.16),
  new THREE.MeshBasicMaterial({
    map: paperTex,
    alphaTest: 0.1
}
));
scene.add(paperMesh)

var scissorsMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(0.16, 0.16),
  new THREE.MeshBasicMaterial({
    map: scissorsTex,
    alphaTest: 0.1
}
));
scene.add(scissorsMesh)

//img relocation
rockMesh.position.set(camera.projectionMatrix.elements[5]-0.4,-0.5,0); //0,5,10,14
paperMesh.position.set(camera.projectionMatrix.elements[5]-0.2,-0.5,0); //0,5,10,14
scissorsMesh.position.set(camera.projectionMatrix.elements[5],-0.5,0); //0,5,10,14

//graphs
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
  redMesh.scale.set(iSize,2*(rock / 150),10)
  redMesh.position.set(camera.projectionMatrix.elements[5]-0.4,0.4 *(rock/150) -0.4,0); //0,5,10,14

  orangeMesh.scale.set(iSize,2*(paper / 150),10)
  orangeMesh.position.set(camera.projectionMatrix.elements[5] - 0.2,0.4 *(paper/150)-0.4,0);

  greenMesh.scale.set(iSize,2*(scissors / 150),10)
  greenMesh.position.set(camera.projectionMatrix.elements[5],0.4 *(scissors/150)-0.4,0);


  redMesh.rotation.set(0,0,0)
  orangeMesh.rotation.set(0,0,0)
  greenMesh.rotation.set(0,0,0)
  if (rock == 150 ) {
    isGameEnd = true;
    winner ='Rock'
    stopBalls(room.children);
  }else if (paper == 150) {
    isGameEnd = true;
    winner ='Paper'
    stopBalls(room.children);
  }else if (scissors == 150) {
    isGameEnd = true;
    winner ='Scissors'
    stopBalls(room.children);
  }

  if(!isGameEnd){//false
    if (rock > paper && rock > scissors) {
      gameResult.innerHTML= `Rock is winning!`;
    } else if (paper > rock && paper > scissors) {
      gameResult.innerHTML = "Paper is winning!";
    } else if (scissors > rock && scissors > paper) {
      gameResult.innerHTML = "Scissors is winning!";
    }
    replayBtn.style.display = 'none';
  }else{//true
    if(user_guess != ''){
      if(user_guess === winner){
        gameResult.innerHTML = 'You Won!';
      }else{
        gameResult.innerHTML = 'You Lost!';
      }
    }
    replayBtn.style.display = 'block';
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
  //rotations
  particle.rotation.x += 0.0000;
  particle.rotation.y -= 0.0040;
  renderer.clear();

  //count ball and update result
  count();
  room.children.forEach((o) => {
    o.material.color.set(new THREE.Color(onGame? o.color : 'skyblue').getHex())
  });

  if(onGame){
    room.rotation.y -= 0.0030;

  //collision event
  collissionEvent();

  //glitch bug rollback
  room.children.forEach((o) => {
    o.glitchFree();
  });

  //ball move
  room.children.forEach((o) => {
    o.move();
  });
  
  }
  
  renderer.render(scene, camera);
  // stats.update()
}