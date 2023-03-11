import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js";

const radius = 0.025;
const widthSegments = 32;
const heightSegments = 32;
const phiStart = 0;
const phiLength = Math.PI * 2;
const thetaStart = 0;
const thetaLength = Math.PI;

const geometry = new THREE.SphereGeometry(
  radius,
  widthSegments,
  heightSegments,
  phiStart,
  phiLength,
  thetaStart,
  thetaLength
);

const vVal = 0.003;//0.0008

let box = new THREE.Box3();

function collisionEvent(ball) {
  if (box.intersectsSphere(ball)) {
    // Collision detected!
    // Do something here, like remove the ball or apply a force
  }
}

export class Sphere extends THREE.Mesh
{
  constructor(roomRadius, color, name,room) {
    const material = new THREE.MeshLambertMaterial({ color: color });
    super(geometry, material)
    this.respondZone = roomRadius - 0.05;
    this.color = color;
    this.name = name;
    this.room = room;
    box = new THREE.Box3().setFromObject(this.room);
    this.position.copy(new THREE.Vector3(
      Math.random() < 0.5 ? -Math.random() * (this.respondZone) : Math.random() * (this.respondZone),
      Math.random() < 0.5 ? -Math.random() * (this.respondZone) : Math.random() * (this.respondZone),
      Math.random() < 0.5 ? -Math.random() * (this.respondZone) : Math.random() * (this.respondZone)
    ))
    this.velocity = new THREE.Vector3(
      Math.random() < 0.5 ? -vVal: vVal,
      Math.random() < 0.5 ? -vVal: vVal,
      Math.random() < 0.5 ? -vVal: vVal
    );
  }
  
  move(){
    this.position.copy(new THREE.Vector3(
      this.position.x + this.velocity.x,
      this.position.y + this.velocity.y,
      this.position.z + this.velocity.z
    ))

    if ((this.position.x - radius) < box.min.x || (this.position.x + radius) > box.max.x) {
      this.velocity.x = -this.velocity.x;
    }
    if((this.position.y - radius) < box.min.y || (this.position.y + radius) > box.max.y){
      this.velocity.y = -this.velocity.y;
    }
    if((this.position.z - radius) < box.min.z || (this.position.z + radius) > box.max.z){
      this.velocity.z = -this.velocity.z;
    }
  }

  
}
