/* global app, THREE */

(function () {

    'use strict';

    var ScatteredPlane,
        defaults = {
            resolution: 10,
            size: 30,
            span: 5,
            material: new THREE.MeshNormalMaterial({ wireframe: true })
        };

    ScatteredPlane = function (environment, options) {
        var conf = $.extend(true, {}, defaults, options);

        this.environment = environment;
        this.resolution = conf.resolution;
        this.size = conf.size;
        this.span = conf.span;
        this.material = conf.material;
        this.offsets = [];

        this.init();
    };

    ScatteredPlane.prototype.init = function () {
        var geometry = new THREE.PlaneGeometry(this.size, this.size, this.resolution, this.resolution);

        this.mesh = new THREE.Mesh(geometry, this.material);
        this.mesh.rotation.x = app.helpers.math.degToRad(-90);

        for (var i = 0; i < this.mesh.geometry.vertices.length; i += 1) {
            this.offsets.push(Math.random() * 2 - 1);
        }

        this.environment.scene.add(this.mesh);
    };

    ScatteredPlane.prototype.update = function () {
        this.mesh.geometry.verticesNeedUpdate = true;
        this.mesh.geometry.normalsNeedUpdate = true;
        
        for (var i = 0; i < this.mesh.geometry.vertices.length; i += 1) {
            this.mesh.geometry.vertices[i].z = this.offsets[i] * this.span;
        }

        this.mesh.geometry.computeCentroids();
        this.mesh.geometry.computeFaceNormals();
        this.mesh.geometry.computeVertexNormals();
    };

    app.ScatteredPlane = ScatteredPlane;

}());