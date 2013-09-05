/* global app, Stats, THREE, jQuery */

(function ($) {

    'use strict';

    var Environment,
        cameraDefaults = {
            angle: 60,
            near: 0.1,
            far: 10000
        };

    Environment = function (el, cameraOptions) {
        var cameraConf = $.extend(true, {}, cameraDefaults, cameraOptions);

        this.el = el;
        this.stage = new app.Stage(this.el);
        this.aspect = this.stage.width / this.stage.height;
        this.renderer = new THREE.WebGLRenderer();
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(cameraConf.angle, this.aspect, cameraConf.near, cameraConf.far);

        this.updateCallbacks = [];
    };

    Environment.prototype.init = function () {
        this.scene.add(this.camera);
        this.stage.setRenderer(this.renderer);
        this.renderer.setSize(this.stage.width, this.stage.height);
        this.animate();
    };

    Environment.prototype.animate = function () {
        var self = this;

        this.renderer.render(this.scene, this.camera);
        this.update();

        window.requestAnimationFrame(function () {
            self.animate();
        });
    };

    Environment.prototype.update = function () {
        var i;

        if (this.stats) {
            this.stats.update();
        }

        for (i = 0; i < this.updateCallbacks.length; i += 1) {
            this.updateCallbacks[i](this);
        }
    };

    Environment.prototype.addStats = function () {
        this.stats = new Stats();
        $('body').append(this.stats.domElement);
    };

    Environment.prototype.onUpdate = function (cb) {
        if (typeof cb === 'function') {
            this.updateCallbacks.push(cb);
        }
    };

    app.Environment = Environment;

}(jQuery));