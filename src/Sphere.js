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

const vVal = 0.0005;

export class Sphere extends THREE.Mesh
{
  constructor(roomRadius, color) {
    const material = new THREE.MeshLambertMaterial({ color: color });
    super(geometry, material)
    this.respondZone = roomRadius - 0.05;
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
    //console.log(this)
    this.color = color;
  }
  
  move(){
    this.position.copy(new THREE.Vector3(
      this.position.x + this.velocity.x,
      this.position.y + this.velocity.y,
      this.position.z + this.velocity.z
    ))
  }
}
