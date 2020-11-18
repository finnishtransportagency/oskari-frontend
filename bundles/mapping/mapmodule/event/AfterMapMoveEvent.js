/**
 * @class Oskari.mapframework.event.common.AfterMapMoveEvent
 *
 * Notifies application bundles that a map has moved.
 * See Oskari.mapframework.request.common.MapMoveRequest
 */
Oskari.clazz.define('Oskari.mapframework.event.common.AfterMapMoveEvent',

    /**
     * @method create called automatically on construction
     * @static
     *
     * @param {Number} centerX
     *            longitude
     * @param {Number} centerY
     *            latitude
     * @param {Number} zoom
     *            map zoomlevel (0-12)
     * @param {Number} scale
     *            map scale
     * @param {String} creator
     *            class identifier of an object that sends an event
     */
    function (centerX, centerY, zoom, scale, camera) {
        this._camera = camera || null;
        this._centerX = centerX;
        this._centerY = centerY;
        this._zoom = zoom;
        this._scale = scale;
    }, {
        /** @static @property __name event name */
        __name: 'AfterMapMoveEvent',
        /**
         * @method getName
         * @return {String} event name
         */
        getName: function () {
            return this.__name;
        },
        /**
         * @method getCenterX
         * @return {Number} longitude
         */
        getCenterX: function () {
            return this._centerX;
        },
        /**
         * @method getCenterY
         * @return {Number} latitude
         */
        getCenterY: function () {
            return this._centerY;
        },
        /**
         * @method getZoom
         * @return {Number} zoomlevel (0-12)
         */
        getZoom: function () {
            return this._zoom;
        },
        /**
         * @method getScale
         * @return {Number} map scale
         */
        getScale: function () {
            return this._scale;
        },

        /**
         * @method getCamera
         * @return {Object} object with heading pitch and roll for 3d maps
         */
        getCamera: function () {
            return this._camera;
        },

        getParams: function () {
            const rpcPayload = {
                centerX: this.getCenterX(),
                centerY: this.getCenterY(),
                zoom: this.getZoom(),
                scale: this.getScale()
            };
            const cam = this.getCamera();
            if (cam) {
                // only attach camera info if it is available (=~ using 3D mapmodule)
                rpcPayload.camera = cam;
            }

            return rpcPayload;
        }
    }, {
        /**
         * @property {String[]} protocol array of superclasses as {String}
         * @static
         */
        'protocol': ['Oskari.mapframework.event.Event']
    });
