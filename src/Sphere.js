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

const vVal = 0.005;//0.0008 0.005

let box = new THREE.Box3();


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

    if ((this.position.x - (radius-0.003)) < box.min.x || (this.position.x + (radius+0.003)) > box.max.x) {
      this.velocity.x = -this.velocity.x;
    }
    if((this.position.y - (radius-0.003)) < box.min.y || (this.position.y + (radius+0.003)) > box.max.y){
      this.velocity.y = -this.velocity.y;
    }
    if((this.position.z - (radius-0.003)) < box.min.z || (this.position.z + (radius+0.003)) > box.max.z){
      this.velocity.z = -this.velocity.z;
    }
  }

  collide(subBall){
    const o1 = new THREE.Box3().setFromObject(this);
    const o2 = new THREE.Box3().setFromObject(subBall);
  if (o1.intersectsBox(o2)) {
    // console.log('hit')
    const normal = new THREE.Vector3().subVectors(subBall.position, this.position).normalize();
    const v1 = this.velocity.clone();
    const v2 = subBall.velocity.clone();
    this.velocity = v1.sub(normal.clone().multiplyScalar(v1.dot(normal) - v2.dot(normal)));
    subBall.velocity = v2.sub(normal.clone().multiplyScalar(v2.dot(normal) - v1.dot(normal)));

    if(this.name != subBall.name){
      if(this.name == 'rock'){
        if(subBall.name == 'paper'){//lose
          this.name = 'paper';
          this.color = 'orange';
          this.material.color.set(new THREE.Color('orange').getHex());
        } else{//win
          subBall.name = 'rock';
          subBall.color = 'red';
          subBall.material.color.set(new THREE.Color('red').getHex());
        }
      }else if(this.name == 'paper'){
        if(subBall.name == 'scissors'){//lose
          this.name = 'scissors';
          this.color = 'green';
          this.material.color.set(new THREE.Color('green').getHex());
        } else{//win
          subBall.name = 'paper';
          subBall.color = 'orange';
          subBall.material.color.set(new THREE.Color('orange').getHex());
        }
      }else if(this.name == 'scissors'){
        if(subBall.name == 'rock'){//lose
          this.name = 'rock';
          this.color = 'red';
          this.material.color.set(new THREE.Color('red').getHex());
        } else{//win
          subBall.name = 'scissors';
          subBall.color = 'green';
          subBall.material.color.set(new THREE.Color('green').getHex());
        }
      }
    }
  }
}
}
