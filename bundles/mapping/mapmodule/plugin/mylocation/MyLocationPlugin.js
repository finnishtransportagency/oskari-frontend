/**
 * @class Oskari.mapframework.bundle.mappublished.MyLocationPlugin
 *
 * Tries to locate the user by using HTML5 GeoLocation services or tries a
 * fallback to http://dev.maxmind.com/geoip/javascript GeoIP if GeoLocation is
 * not available.
 * Centers the map on the users location if location is determined successfully.
 */
Oskari.clazz.define(
    'Oskari.mapframework.bundle.mapmodule.plugin.MyLocationPlugin',
    /**
     * @static @method create called automatically on construction
     *
     *
     */
    function () {
        var me = this;
        me._clazz =
            'Oskari.mapframework.bundle.mapmodule.plugin.MyLocationPlugin';
        me._defaultLocation = 'top right';
        me._index = 40;
        me._name = 'MyLocationPlugin';
        this.loc = Oskari.getMsg.bind(null, 'MapModule');
        me._dialog = null;
        me._defaultIconCls = null;
        me._mobileDefs = {
            buttons: {
                'mobile-my-location': {
                    iconCls: 'mobile-my-location',
                    tooltip: '',
                    sticky: false,
                    show: true,
                    callback: function (el) {
                        me._setupRequest();
                    }
                }
            },
            buttonGroup: 'mobile-toolbar'
        };

        me._templates = {
            plugin: jQuery('<div class="mapplugin mylocationplugin toolstyle-rounded-dark"><div class="icon"></div></div>')
        };
        this._waiting = false; // used with single location request
        this._timeouts = 0; // timeouts for single location request
        this._tracking = false;
        this._trackingOptions = null;
    }, {
        /**
         * @private @method _createControlElement
         * Creates the DOM element that will be placed on the map
         * @return {jQuery}
         * Plugin jQuery element
         */
        _createControlElement: function () {
            const el = this._templates.plugin.clone();
            el.attr('title', this.loc('plugin.MyLocationPlugin.tooltip'));
            this._bindIcon(el);
            this._element = el;
            return el;
        },

        _bindIcon: function (el) {
            el.on('click', () => {
                this._setupRequest();
            });
        },

        /**
         * @private @method _setLayerToolsEditModeImpl
         *
         */
        _setLayerToolsEditModeImpl: function () {
            const el = this.getElement();
            if (!el) {
                return;
            }
            if (this.inLayerToolsEditMode()) {
                // disable icon
                el.off('click');
            } else {
                // enable icon
                this._bindIcon(el);
            }
        },
        /**
         * @private @method _setWaiting
         *
         */
        _setWaiting: function (bln) {
            this._waiting = !!bln;
            this._timeouts = 0;
            var el = this.getElement();
            if (!el) {
                return;
            }
            if (bln) {
                el.addClass('disabled');
            } else {
                el.removeClass('disabled');
            }
        },
        _setTracking: function (bln) {
            this._tracking = bln;
            this._toggleToolStyle(this._tracking);
        },
        _clearRequests: function () {
            this._setWaiting(false);
            this._setTracking(false);
        },
        /**
         * @public @method refresh
         *
         *
         */
        refresh: function () {
            const conf = this.getConfig();
            let toolStyle;
            // Change the style if in the conf
            if (conf && conf.toolStyle) {
                toolStyle = conf.toolStyle;
            } else {
                toolStyle = this.getToolStyleFromMapModule();
            }
            this.changeToolStyle(toolStyle, this.getElement());
        },

        /**
         * @public @method changeToolStyle
         * Changes the tool style of the plugin
         *
         * @param {Object} style
         * @param {jQuery} div
         *
         */
        changeToolStyle: function (style, div) {
            const el = div || this.getElement();
            if (!el) {
                return;
            }
            var styleClass = 'toolstyle-' + (style || 'rounded-dark');
            this._defaultIconCls = styleClass;
            this.changeCssClasses(styleClass, /^toolstyle-/, [el]);
        },
        // used with continuous mode
        _toggledIconStyle: function (styleClass) {
            const light = styleClass.indexOf('-light');
            if (light > 0) {
                return styleClass.substring(0, light) + '-dark';
            }
            const dark = styleClass.indexOf('-dark');
            if (dark > 0) {
                return styleClass.substring(0, dark) + '-light';
            }
            return styleClass;
        },
        // used with continuous mode
        _toggleToolStyle: function (active) {
            let regEx;
            let styleCls;
            let el;
            if (Oskari.util.isMobile()) {
                el = this.getMapModule().getMobileDiv().find('.mobile-my-location');
                const { iconCls } = this._mobileDefs.buttons['mobile-my-location'];
                regEx = new RegExp('^' + iconCls + '-');
                const { activeColour } = this.getMapModule().getThemeColours();
                const isDark = Oskari.util.isDarkColor(activeColour);
                if (active) {
                    el.css('background-color', activeColour);
                    styleCls = isDark ? iconCls + '-dark' : iconCls + '-light';
                } else {
                    el.css('background-color', '');
                    styleCls = isDark ? iconCls + '-light' : iconCls + '-dark';
                }
            } else {
                styleCls = this._defaultIconCls;
                regEx = /^toolstyle-/;
                el = this.getElement();
                if (active) {
                    styleCls = this._toggledIconStyle(styleCls);
                }
            }
            this.changeCssClasses(styleCls, regEx, [el]);
        },

        /**
         * @private @method _setupRequest
         * Tries to get the geolocation from browser and move the map to the
         * location
         *
         */
        _setupRequest: function () {
            const opts = this._trackingOptions;
            const sb = Oskari.getSandbox();
            if (opts) {
                if (this._tracking) {
                    sb.postRequestByName('StopUserLocationTrackingRequest');
                    this._setTracking(false);
                } else {
                    sb.postRequestByName('StartUserLocationTrackingRequest', [opts]);
                    this._setTracking(true);
                }
            } else if (!this._waiting) {
                this._requestLocation();
                this._setWaiting(true);
            }
        },
        _requestLocation: function (timeout, highAccuracy) {
            const conf = this.getConfig();
            const options = {
                timeout: timeout || 2000,
                enableHighAccuracy: highAccuracy !== false
                // addToMap: highAccuracy !== false // or always true
                // TODO how user can clear location from map??
            };
            if (conf.zoom !== undefined) {
                options.zoomLevel = conf.zoom;
            }
            Oskari.getSandbox().postRequestByName('MyLocationPlugin.GetUserLocationRequest', [true, options]);
        },
        /**
         * Handle plugin UI and change it when desktop / mobile mode
         * @method  @public createPluginUI
         * @param  {Boolean} mapInMobileMode is map in mobile mode
         * @param {Boolean} forced application has started and ui should be rendered with assets that are available
         */
        redrawUI: function (mapInMobileMode, forced) {
            if (!this.isVisible() || !this.isEnabled()) {
                // no point in drawing the ui if we are not visible or enabled
                return;
            }
            var mobileDefs = this.getMobileDefs();

            // don't do anything now if request is not available.
            // When returning false, this will be called again when the request is available
            var toolbarNotReady = this.removeToolbarButtons(mobileDefs.buttons, mobileDefs.buttonGroup);
            if (!forced && toolbarNotReady) {
                return true;
            }
            this.teardownUI();

            if (!toolbarNotReady && mapInMobileMode) {
                this.addToolbarButtons(mobileDefs.buttons, mobileDefs.buttonGroup);
            } else {
                this._createControlElement();
                this.refresh();
                this.addToPluginContainer(this.getElement());
            }
            if (this._tracking) {
                this._toggleToolStyle(true);
            }
        },
        teardownUI: function () {
            this.removeFromPluginContainer(this.getElement());
            var mobileDefs = this.getMobileDefs();
            this.removeToolbarButtons(mobileDefs.buttons, mobileDefs.buttonGroup);
        },

        /**
         * @public @method isEnabled
         * Are the plugin's controls enabled
         * @param {Boolean} showOnlyMobile force show only mobile state
         *
         * @return {Boolean}
         * True if plugin's tools are enabled
         */
        isEnabled: function (showOnlyMobile) {
            var conf = this.getConfig();
            var mobileOnly = showOnlyMobile || conf.mobileOnly;

            if (mobileOnly === true && !Oskari.util.isMobile(true)) {
                return false;
            }
            return this._enabled;
        },

        /**
         * Handle plugin start mode
         * @private @method _handleStartMode
         */
        _handleStartMode: function () {
            if (!this.isEnabled()) {
                return;
            }
            const conf = this.getConfig();
            const centerMap = conf.centerMapAutomatically === true;
            if (conf.mode === 'continuous') {
                const opts = {
                    addToMap: 'location'
                };
                if (centerMap) {
                    opts.centerMap = 'single';
                }
                this._trackingOptions = opts;
            }
            if (centerMap) {
                // single location request on startup, use 30s timeout (browser may ask permission)
                // don't set waiting -> doesn't show errors or chain requests with different accuracy & timeouts
                this._requestLocation(30000);
            }
        },
        /**
         * @method _stopPluginImpl BasicMapModulePlugin method override
         * @param {Oskari.Sandbox} sandbox
         */
        _stopPluginImpl: function () {
            this.teardownUI();
        },
        _startPluginImpl: function () {
            var me = this;
            me.setEnabled(me._enabled);
            const toolbarNotReady = me.setVisible(me._visible);
            me._handleStartMode();
            return toolbarNotReady;
        },
        /**
         * Checks at if device is outside of map viewport when mode is tracking.
         * If it is then move map to show device location.
         * @param {Double} lon
         * @param {Double} lat
         */
        _checkIfOutsideViewport (lon, lat) {
            var sandbox = this.getSandbox();
            var bbox = sandbox.getMap().getBbox();
            if (lon < bbox.left || lon > bbox.right || lat > bbox.top || lat < bbox.bottom) {
                // outside view port, center map again
                sandbox.postRequestByName('MapMoveRequest', [lon, lat]);
            }
        },
        _handleError: function (error) {
            if (this._dialog) {
                this._dialog.close();
            }
            const dialog = Oskari.clazz.create('Oskari.userinterface.component.Popup');
            const title = this.loc('plugin.MyLocationPlugin.error.title');
            let msg;
            this._dialog = dialog;

            if (error === 'denied') {
                msg = this.loc('plugin.MyLocationPlugin.error.denied');
                dialog.show(title, msg, [dialog.createCloseButton()]);
                this._clearRequests();
                return;
            }
            // Location denied only has close button, other messages fades out
            dialog.fadeout();
            msg = this.loc('plugin.MyLocationPlugin.error.noLocation');
            if (error === 'unavailable') {
                dialog.show(title, msg);
                this._clearRequests();
                return;
            }
            // timeout handling for single request
            if (this._waiting && this._timeouts < 2) {
                this._timeouts++;
                if (this._timeouts === 1) {
                    msg = this.loc('plugin.MyLocationPlugin.error.timeout');
                    dialog.show('', this._loc.error.timeout);
                    // request high accuracy location with longer timeout
                    this._requestLocation(20000);
                } else if (this._timeouts === 2) {
                    // request low accuracy location
                    this._requestLocation(6000, false);
                }
                return;
            }
            // show no location error and stop requests
            dialog.show(title, msg);
            this._clearRequests();
        },

        _createEventHandlers: function () {
            return {
                UserLocationEvent: (event) => {
                    if (!this._tracking && !this._waiting) {
                        return;
                    }
                    const error = event.getError();
                    if (error) {
                        this._handleError(error);
                        return;
                    }
                    // success
                    if (this._tracking) {
                        this._checkIfOutsideViewport(event.getLon(), event.getLat());
                    } else {
                        this._setWaiting(false);
                    }
                }
            };
        }
    }, {
        extend: ['Oskari.mapping.mapmodule.plugin.BasicMapModulePlugin'],
        /**
         * @static @property {string[]} protocol array of superclasses
         */
        protocol: [
            'Oskari.mapframework.module.Module',
            'Oskari.mapframework.ui.module.common.mapmodule.Plugin'
        ]
    }
);
