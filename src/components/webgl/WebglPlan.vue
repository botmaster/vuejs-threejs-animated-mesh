<template>
    <div class="WebglPlan">
        <div id="SceneContainer"></div>
    </div>
</template>
<script>

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

            let vertices = [];

            // Create a scene which will hold all our meshes to be rendered
            let scene = new THREE.Scene();

            // Create and position a camera
            let camera = new THREE.PerspectiveCamera(
                60,                                   // Field of view
                window.innerWidth / window.innerHeight, // Aspect ratio
                0.1,                                  // Near clipping pane
                1000                                  // Far clipping pane
            );

            // Reposition the camera
            camera.position.set(10, 10, 0);

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

            // Append to the document
            document.querySelector('#SceneContainer').appendChild(renderer.domElement);

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
                color: 0xffffff,
                wireframe: true
            });


            // Geometies
            //let geometry = new THREE.PlaneGeometry(15, 15, 16, 16);
            //let geometry = new THREE.TorusKnotGeometry(15, 3, 290, 30);
            //let geometry = new THREE.SphereGeometry(8, 30, 30);
            let geometry = new THREE.OctahedronGeometry(4, 3);
            let plane = new THREE.Mesh(geometry, phongMat);
            plane.rotateX(Math.PI / 2);
            let planeWire = plane.clone();
            planeWire.material = lineMat;


            scene.add(plane);
            scene.add(planeWire);


            // Controls de la caméra.
            let controls = new OrbitControls(camera, renderer.domElement);
            controls.addEventListener('change', function () {
                renderer.render(scene, camera);
            }); // add this only if there is no animation loop (requestAnimationFrame)


            // On stocke les vertices.
            for (let i = 0; i < plane.geometry.vertices.length; i++) {
                //geometry.vertices[i].z = Math.random() * (max - min) + min;
                let currentVertice = plane.geometry.vertices[i];
                vertices.push(new Vertice(currentVertice));
            }


            // On écoute le tick de Tweenmax
            TweenMax.ticker.addEventListener("tick", render);

            // On anim les vertices.
            vertices.forEach((item) => {
                //console.log(item)
                //item.randomizeMe();
                item.animateMe();
            });

            // Ecoute le tick et fait le rendu.
            function render() {
                plane.geometry.verticesNeedUpdate = true;
                //console.log(vertice);
                renderer.render(scene, camera);

            }


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
