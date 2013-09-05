/* global app */

(function () {

    'use strict';

    var Stage;

    Stage = function (el) {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.el = el;
        this.init();
    };

    Stage.prototype.init = function () {
        this.el.css({
            width: this.width,
            height: this.height
        });
    };

    Stage.prototype.setRenderer = function (renderer) {
        this.renderer = renderer;
        this.el.append(renderer.domElement);
    };

    app.Stage = Stage;

}());