import * as Three from "three";
import "./style.css";
import bg from "./red-wave.jpg";

const container = document.querySelector(".three_bg");
const loader = new Three.TextureLoader();

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new Three.WebGL1Renderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const geometry = new Three.PlaneGeometry(17, 9, 16, 9);
const maeterial = new Three.MeshBasicMaterial({
  map: loader.load(bg),
});

const mesh = new Three.Mesh(geometry, maeterial);
scene.add(mesh);
camera.position.z = 5;

const count = geometry.attributes.position.count;
const clock = new Three.Clock();

function animate() {
  const time = clock.getElapsedTime();
  for (let index = 0; index < count; index++) {
    const x = geometry.attributes.position.getX(index);
    const y = geometry.attributes.position.getY(index);

    const anim1 = 0.25 * Math.sin(x + time * 0.7);
    const anim2 = 0.35 * Math.sin(x * 1 + time * 0.7);
    const anim3 = 0.1 * Math.sin(y * 15 + time * 0.7);

    geometry.attributes.position.setZ(index, anim1 + anim2 + anim3);
    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
