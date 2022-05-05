
//console.log("OrbitControls", THREE.OrbitControls);
function color_update(){
            var color_hx = document.getElementById("color").value;
            var material = new THREE.MeshPhongMaterial({ color: color_hx, specular: 100, shininess: 65 });
            hold_frame.material = material
            
}
function scene_load_wrapper(){
document.getElementById("app").innerHTML = ""
const backgroundColor = 0x6A6060;
model = document.getElementById("frame").value;


let use_glb = true;
if(use_glb){
      //console.log()
      char = "glb"
      model = model.substring(0, model.length - char.length);
      model += char;
    }
console.log(model)

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
elem = document.getElementById("app")
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(backgroundColor); //0x );
renderer.setSize(elem.clientWidth, elem.clientHeight);
elem.appendChild(renderer.domElement);
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

//document.body.appendChild(renderer.domElement);

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

//var light = new THREE.PointLight(0xffffcc, 20, 200);
//light.position.set(3, 30, -20);
//scene.add(light);

//var light2 = new THREE.HemisphereLight(0x);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x080820, 2.5));
//light2.position.set(300, -10, 30);
//scene.add(light2);

/* ////////////////////////////////////////////////////////////////////////// */

    var slide_geo = "un_cahced_slide.stl";
    (new THREE.STLLoader()).load(slide_geo, function (geometry) {
        var x = document.getElementById("slide").value;
        //x = "FDEEAGLE";
        //sl_material = new THREE.objectBasicMaterial( { color: 0xffff00 , fog: false} );
        //slide_mat = new THREE.objectPhongMaterial({ color: 0xffff00, wireframe: false});
        if(x.indexOf("FDE") != -1){
            slide_mat =new THREE.MeshPhongMaterial({ color:   0x877348, specular: 100, shininess: 65 });
        }
        if(x.indexOf("BLK")!= -1){
   
            slide_mat =new THREE.MeshPhongMaterial({ color:  0x0f0f0f, specular: 100, shininess: 65 });
        }
        if(x.indexOf("SGR")!= -1){
            slide_mat =new THREE.MeshPhongMaterial({ color:  0x5e5b4a, specular: 100, shininess: 65 });
        }
        if(x.indexOf("GRY")!= -1){
            slide_mat =new THREE.MeshPhongMaterial({ color:  0x666970, specular: 100, shininess: 65 });
        }
        //new_geometry = geometry.scene.children[0].geometry;
        var slide = new THREE.Mesh(geometry, slide_mat);
        //slide = geometry.scene;
        //slide = geometry.scene
        scene.add(slide);
        //slide.position.z += 40;
        //slide.scale.x -= .2;
        slide.rotation.z += 3.14159;
        //rotate to look better
        /*
        slide.rotation.y  -= Math.PI/8;
        slide.rotation.z  -= Math.PI/4;
        slide.rotation.x  -= Math.PI/4;
        */
    });
    var parts_geo = "parts.stl";
    (new THREE.STLLoader()).load(parts_geo, function (geometry) {
        var parts_mat = new THREE.MeshPhongMaterial({ color: 0x171616, specular: 100, shininess: 65 });
        //var parts = new THREE.object(geometry, parts_mat);
        //new_geometry = geometry.scene.children[0].geometry;
        var parts = new THREE.Mesh(geometry, parts_mat);
        scene.add(parts)
        parts.rotation.z += 3.14159;
        //parts.rotation.x  -= Math.PI/2;
        //rotate to look better
        /*
        parts.rotation.y  -= Math.PI/8;
        parts.rotation.z  -= Math.PI/4;
        */
   });
   var has_run = false

var color_hx = document.getElementById("color").value;
var loader = new THREE.GLTFLoader();
loader.crossOrigin = true;
loader.load(
  model,
  //"https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf",
  function(data) {
    var object = data.scene;
    var geometry = object.children[0].geometry
    var newMaterial = new THREE.MeshStandardMaterial({color: 0x00FFFF,});
    newMaterial = new THREE.MeshPhongMaterial({ color: color_hx, specular: 100, shininess: 65 });
    geometry.computeVertexNormals(false)
    object = new THREE.Mesh(geometry, newMaterial)
    hold_frame = object
    object.position.set(0, -10, -0.75);
        var middle = new THREE.Vector3();
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(middle);

        // Center it
        object.position.x = -1 * middle.x;
        object.position.y = -1 * middle.y;
        object.position.z = -1 * middle.z;

        object.rotation.z += Math.PI;
        if(model.indexOf("BIGGUS-DICKUS") != -1){
        //console.log(model.indexOf("BIGGUS"))
            object.rotation.z += Math.PI/2;
            object.position.z += -39;
            object.position.x += 17;
            object.position.y += -5;

        }
        console.log(model.indexOf("9 "));
        console.log(model);
        if(model.indexOf("9 ") != -1){
            object.rotation.z += Math.PI/2;
            console.log(model.indexOf("19 "))
            //object.position.z += -39;
            object.position.x += 16;
            object.position.y += -16;

        }
        if(model.indexOf("glong19") != -1){
            //pass the glong bro
            
            object.rotation.y -= Math.PI/2;
            object.rotation.x -= Math.PI/2;
            console.log(model.indexOf("19 "))
            object.position.z += -30;
            object.position.x += 6;
            object.position.y += 22;
            scene.background = bgTexture;

        }
        if(model.indexOf("INVADER" ) != -1){
            object.position.z += 20;
            object.position.y -= 14;
        }
        if(model.indexOf("DNL" ) != -1){
            object.position.z += 1;
            object.position.y += 2;
        }
        var largestDimension = Math.max(geometry.boundingBox.max.x,
            geometry.boundingBox.max.y, geometry.boundingBox.max.z)
        camera.position.z = largestDimension * 3.3;
        camera.position.x = largestDimension/2 ;
    scene.add(object);
    //, onProgress, onError );
  }
);
}
scene_load_wrapper()
/*// Instantiate a loader
import * as THREE from "three";
import GLTFLoader from "three-gltf-loader";

console.log("three", THREE, GLTFLoader);
var loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed object data
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
