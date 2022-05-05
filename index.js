
console.log("OrbitControls", THREE.OrbitControls);

const backgroundColor = 0x000000;

/*////////////////////////////////////////*/

var renderCalls = [];
function render() {
  requestAnimationFrame(render);
  renderCalls.forEach(callback => {
    callback();
  });
}
render();

/*////////////////////////////////////////*/

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  800
);
camera.position.set(5, 5, 5);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(backgroundColor); //0x );

renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = Math.pow(0.94, 5.0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

window.addEventListener(
  "resize",
  function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  },
  false
);

document.body.appendChild(renderer.domElement);

function renderScene() {
  renderer.render(scene, camera);
}
renderCalls.push(renderScene);

/* ////////////////////////////////////////////////////////////////////////// */
    var controls = new THREE.ArcballControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.05;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = false;
renderCalls.push(function() {
  controls.update();
});

/* ////////////////////////////////////////////////////////////////////////// */

var light = new THREE.PointLight(0xffffcc, 20, 200);
light.position.set(3, 30, -20);
scene.add(light);

var light2 = new THREE.AmbientLight(0x20202a, 20, 100);
light2.position.set(300, -10, 30);
scene.add(light2);

/* ////////////////////////////////////////////////////////////////////////// */

var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;
loader.load(
  "19-BUMPS.glb",
  //"https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf",
  function(data) {
    var object = data.scene;
    var geometry = object.children[0].geometry
    var newMaterial = new THREE.MeshStandardMaterial({color: 0x00FFFF});
    geometry.computeVertexNormals(false)
    object = new THREE.Mesh(geometry, newMaterial)
    object.position.set(0, -10, -0.75);
    object.scale.set(0.5,0.5,0.5)
    //     object.rotation.set(Math.PI / -2, 0, 0);

    //     TweenLite.from( object.rotation, 1.3, {
    //       y: Math.PI * 2,
    //       ease: 'Power3.easeOut'
    //     });

    /*TweenMax.from( object.position, 3, {
      y: -8,
      yoyo: true,
      repeat: -1,
      ease: 'Power2.easeInOut'
    });*/
    //object.position.y = - 95;
    scene.add(object);
    //, onProgress, onError );
  }
);

/*// Instantiate a loader
import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";

console.log("three", THREE, GLTFLoader);
var loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
var dracoLoader = new THREE.DRACOLoader();

dracoLoader.setDecoderPath("/examples/js/libs/draco");
loader.setDRACOLoader(dracoLoader);

// Load a glTF resource
loader.load(
  // resource URL
  "models/gltf/duck/duck.gltf",
  // called when the resource is loaded
  function(gltf) {
    scene.add(gltf.scene);

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Scene
    gltf.scenes; // Array<THREE.Scene>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
  },
  // called while loading is progressing
  function(xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  // called when loading has errors
  function(error) {
    console.log("An error happened");
  }
);
*/
/*import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`;
*/
