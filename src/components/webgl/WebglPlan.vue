<template>
    <div class="WebglPlan">
        <div id="SceneContainer"></div>
    </div>
</template>
<script>
    import {TweenMax} from "gsap";
    import Vertice from './Vertice';

    //const THREE = require('THREE');
    import * as THREE from 'three';

    /*import {Scene} from 'three';
     import {PerspectiveCamera} from 'three';
     import {Vector3} from 'three';
     import {WebGLRenderer} from 'three';
     import {PointLight} from 'three';
     import {MeshPhongMaterial} from 'three';
     import {MeshBasicMaterial} from 'three';
     import {TorusKnotGeometry} from 'three';
     import {Mesh} from 'three';
     import {Material} from 'three';

     const THREE = {Scene, PerspectiveCamera, Vector3, WebGLRenderer, PointLight, MeshPhongMaterial, MeshBasicMaterial, TorusKnotGeometry, Mesh, Material};*/

    const OrbitControls = require('three-orbit-controls')(THREE);

    // La liste des vertices.
    let vertices = [];

    // Create a scene which will hold all our meshes to be rendered
    let scene = new THREE.Scene();
    //scene.fog = new THREE.FogExp2( 0x000000, 0.001 );

    // Create and position a camera
    let camera = new THREE.PerspectiveCamera(
        60,                                   // Field of view
        window.innerWidth / window.innerHeight, // Aspect ratio
        0.1,                                  // Near clipping pane
        1000                                  // Far clipping pane
    );

    // Reposition the camera
    //camera.position.set(10, 10, 0);
    camera.position.set(3.4, 5.4, 0);

    // Point the camera at a given coordinate
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Create a renderer
    let renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    renderer.sortObjects = false;

    // Lights
    let lights = [];
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    // Materials
    let phongMat = new THREE.MeshPhongMaterial({
        color: 0x156289,
        emissive: 0x072534,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading,
        polygonOffset: true,
        polygonOffsetFactor: 1, // positive value pushes polygon further away
        polygonOffsetUnits: 1
    });
    let lineMat = new THREE.MeshBasicMaterial({
        color: 0x156289,
        wireframe: true,
        wireframeLinewidth: 1
    });


    // Geometies
    let geometry = new THREE.PlaneGeometry(15, 15, 23, 23);
    //let geometry = new THREE.TorusKnotGeometry(15, 3, 290, 30);
    //let geometry = new THREE.SphereGeometry(8, 30, 30);
    //let geometry = new THREE.OctahedronGeometry(4, 3);
    let meshPlane = new THREE.Mesh(geometry, phongMat);

    // On stocke les vertices.
    meshPlane.geometry.vertices.forEach((item) => {
        vertices.push(new Vertice(item));
    });

    meshPlane.rotateX(Math.PI / 2);

    // On clone le mesh du plan pour faire un plan en filaire.
    let meshPlaneWire = meshPlane.clone();
    meshPlaneWire.material = lineMat;

    // On créer des particules et on les positionne sur les vertices.
    let particles = new THREE.Points(meshPlane.geometry, new THREE.PointsMaterial({
        color: 0x156289,
        size: 6,
        sizeAttenuation: false,
        /*alphaTest: 0.5,
         transparent: true*/
    }));
    particles.rotateX(Math.PI / 2);


    // On ajoute les mesh à la scène
    scene.add(meshPlane);
    scene.add(meshPlaneWire);
    scene.add(particles);

    // Controls de la caméra.
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
    }); // add this only if there is no animation loop (requestAnimationFrame)


    // On map le ticker du navigateur avec celui de TweenMaw.
    TweenMax.ticker.addEventListener("tick", render);

    // On anim les vertices.
    vertices.forEach((item) => {
        item.animateMe();
    });

    // Ecoute le tick et fait le rendu.
    function render() {
        meshPlane.geometry.verticesNeedUpdate = true;
        //console.log(camera.position);
        renderer.render(scene, camera);
    }


    export default {
        name: 'webgl-plan',
        props: ['texture'],
        data (){
            return {}
        },
        beforeCreate: function () {
            console.log('--> beforeCreate');
        },
        created: function () {
            console.log('--> created');

        },
        beforeMount: function () {
            console.log('--> beforeMount');
        },
        mounted: function () {
            console.log('--> mounted!');

            // Append to the document
            document.querySelector('#SceneContainer').appendChild(renderer.domElement);
        },
        beforeUpdate: function () {
            console.log('--> beforeUpdate');
        },
        updated: function () {
            console.log('--> updated');
        },
        beforeDestroy: function () {
            console.log('--> beforeDestroy');
        },
        destroyed: function () {
            console.log('--> destroyed');
        },
    }
</script>
<style scoped lang="less" rel="stylesheet/less">
    .WebglPlan {

    }
</style>
