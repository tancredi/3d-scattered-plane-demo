/* global app, THREE, jQuery, dat */

(function ($) {

    'use strict';

    var environment,
        controls,
        origin = new THREE.Vector3(0, 0, 0),
        dist = 5,
        scatteredPlane,
        start = new Date().getTime(),
        lights,
        userSettings = {
            lightsIntensity: 2.5,
            lightSpan: -2,
            lightSpread: 5,
            lightsDistance: 10,
            lightsOffsetY: 5,
            wireframe: false
        },
        DEBUG = false;

    function init () {
        environment = new app.Environment($('#stage'));
        environment.addStats();
        environment.init();

        environment.camera.position.z = dist;
        environment.camera.position.y = dist * 2;

        environment.camera.lookAt(origin);

        environment.onUpdate(function () {
            update();
        });
    }

    function update () {
        var elapsed = start - new Date().getTime(),
            phase = Math.cos(elapsed / 100) / 2,
            ls = userSettings.lightSpread;

        controls.update();
        scatteredPlane.update();
        scatteredPlane.mesh.rotation.z += 0.01;
        scatteredPlane.span += phase / 3;

        for (var i = 0; i < lights.length; i += 1) {
            lights[i].intensity = userSettings.lightsIntensity + phase - userSettings.lightSpan;
            lights[i].distance = userSettings.lightsDistance;
        }

        lights[0].position.set(ls, userSettings.lightsOffsetY, ls);
        lights[1].position.set(-ls, userSettings.lightsOffsetY, -ls);
        lights[2].position.set(-ls, userSettings.lightsOffsetY, ls);
        lights[3].position.set(ls, userSettings.lightsOffsetY, -ls);

        scatteredPlane.mesh.material.wireframe = userSettings.wireframe;
    }

    function addAxes () {
        var axes = new THREE.AxisHelper(100);
        environment.scene.add(axes);
    }

    function addControls () {
        controls = new THREE.OrbitControls(environment.camera, environment.renderer.domElement);
    }

    function addGUI () {
        var gui = new dat.GUI();
        gui.add(scatteredPlane, 'span', -10, 10);
        gui.add(userSettings, 'lightsIntensity', 0.3, 4);
        gui.add(userSettings, 'lightSpan', -10, 5);
        gui.add(userSettings, 'lightSpread', 1, 10);
        gui.add(userSettings, 'lightsDistance', 5, 20);
        gui.add(userSettings, 'lightsOffsetY', 5, 20);
        gui.add(userSettings, 'wireframe');
    }

    function addPlane () {
        var material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            shading: THREE.FlatShading,
            overdraw: true,
        });

        scatteredPlane = new app.ScatteredPlane(environment, {
            material: material,
            size: 100,
            resolution: 100,
            span: 0.2
        });
    }

    function addLights () {
        var lightA, lightB, lightC, lightD,
            str = userSettings.lightsIntensity,
            spr = userSettings.lightsDistance;

        lightA = new THREE.PointLight(0xdd8572, str, spr);
        lightB = new THREE.PointLight(0xf3ed90, str, spr);
        lightC = new THREE.PointLight(0x90c6f3, str, spr);
        lightD = new THREE.PointLight(0xf568a7, str, spr);

        environment.scene.add(lightA);
        environment.scene.add(lightB);
        environment.scene.add(lightC);
        environment.scene.add(lightD);

        lights = [ lightA, lightB, lightC, lightD ];
    }

    init();

    addPlane();
    addLights();

    addControls();
    addGUI();

    if (DEBUG) {
        addAxes();
    }

}(jQuery));