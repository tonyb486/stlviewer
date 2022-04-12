
function STLViewerEnable(classname, stl_name, col) {
    var models = document.getElementsByClassName(classname);
    for (var i = 0; i < models.length; i++) {
        STLViewer(models[i], stl_name, col);
    }
}

function STLViewer(elem, model, color_hx) {

    if (!WEBGL.isWebGLAvailable()) {
        elem.appendChild(WEBGL.getWebGLErrorMessage());
        return;
    }

    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    var camera = new THREE.PerspectiveCamera(70, elem.clientWidth / elem.clientHeight, 1, 1000);
    renderer.setSize(elem.clientWidth, elem.clientHeight);
    elem.appendChild(renderer.domElement);

    window.addEventListener('resize', function () {
        renderer.setSize(elem.clientWidth, elem.clientHeight);
        camera.aspect = elem.clientWidth / elem.clientHeight;
        camera.updateProjectionMatrix();
    }, false);

    var controls = new ArcballControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.05;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = .75;

    var scene = new THREE.Scene();
    bg_col = new THREE.Color("6A6060");
    scene.background =  bg_col
    scene.add(new THREE.HemisphereLight(0xffffff, 0x080820, 1.5));

    controls.addEventListener( 'change', function () {
	    renderer.render( scene, camera );
    } );
    var slide_geo = "un_cahced_slide.stl";
    (new THREE.STLLoader()).load(slide_geo, function (geometry) {
        var slide_mat = new THREE.MeshPhongMaterial({ color: 0x877348, specular: 100, shininess: 95 });
        var slide = new THREE.Mesh(geometry, slide_mat);
        scene.add(slide);
        //slide.position.z += 40;
        //slide.scale.x -= .2;
        slide.rotation.z += 3.14159;
    });
    var parts_geo = "parts.stl";
    (new THREE.STLLoader()).load(parts_geo, function (geometry) {
        var parts_mat = new THREE.MeshPhongMaterial({ color: 0x171616, specular: 55, shininess: 95 });
        var parts = new THREE.Mesh(geometry, parts_mat);
        scene.add(parts);

        //slide.position.z += 40;
        //slide.scale.x -= .2;
        parts.rotation.z += 3.14159;
    });
    (new THREE.STLLoader()).load(model, function (geometry) {
        var material = new THREE.MeshPhongMaterial({ color: color_hx, specular: 100, shininess: 65 });
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
        // Compute the middle
        var middle = new THREE.Vector3();
        geometry.computeBoundingBox();
        geometry.boundingBox.getCenter(middle);

        // Center it
        mesh.position.x = -1 * middle.x;
        mesh.position.y = -1 * middle.y;
        mesh.position.z = -1 * middle.z;

        mesh.rotation.z += 3.14159;

        // Pull the camera away as needed
        var largestDimension = Math.max(geometry.boundingBox.max.x,
            geometry.boundingBox.max.y, geometry.boundingBox.max.z)
        camera.position.z = largestDimension * 1.5;


        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }; animate();

    });
}
