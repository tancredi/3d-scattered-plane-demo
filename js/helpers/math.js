/* global app */

(function () {

    'use strict';

    app.helpers.math = {

        radToDeg: function (rad) {
            return rad * 180 / Math.PI;
        },

        degToRad: function (rad) {
            return rad * Math.PI / 180;
        }

    };

}());