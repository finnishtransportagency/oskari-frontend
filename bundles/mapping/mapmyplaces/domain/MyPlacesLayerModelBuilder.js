/*
 * @class Oskari.mapframework.bundle.mapmyplaces.domain.MyPlacesLayerModelBuilder
 * JSON-parsing for myplaces layer
 */
Oskari.clazz.define('Oskari.mapframework.bundle.mapmyplaces.domain.MyPlacesLayerModelBuilder',
    function (sandbox, clusteringDistance) {
        this.localization = Oskari.getLocalization('MapMyPlaces');
        this.sandbox = sandbox;
        this.wfsBuilder = Oskari.clazz.create('Oskari.mapframework.bundle.mapwfs2.domain.WfsLayerModelBuilder', sandbox);
        this.clusteringDistance = clusteringDistance;
    }, {
        /**
         * parses any additional fields to model
         * @param {Oskari.mapframework.bundle.mapmyplaces.domain.MyPlacesLayer} layer partially populated layer
         * @param {Object} mapLayerJson JSON presentation of the layer
         * @param {Oskari.mapframework.service.MapLayerService} maplayerService not really needed here
         */
        parseLayerData: function (layer, mapLayerJson, maplayerService) {
            var me = this;
            var loclayer = me.localization.layer;

            // set options before parsing wfs spesific layer data
            if (mapLayerJson.options) {
                layer.setOptions(mapLayerJson.options);
            }

            // call parent parseLayerData
            this.wfsBuilder.parseLayerData(layer, mapLayerJson, maplayerService);
            this.wfsBuilder.setDefaultRenderMode(layer, 'vector');

            if (this.clusteringDistance && this.clusteringDistance > 0) {
                layer.setClusteringDistance(this.clusteringDistance);
            }
            if (mapLayerJson.fields) {
                layer.setFields(mapLayerJson.fields);
            }
            if (mapLayerJson.name) {
                layer.setName(mapLayerJson.name);
            }
            if (mapLayerJson.wmsName) {
                layer.setWmsName(mapLayerJson.wmsName);
            }
            if (mapLayerJson.wmsUrl) {
                layer.setWmsUrl(mapLayerJson.wmsUrl);
            }
            if (loclayer.organization) {
                layer.setOrganizationName(loclayer.organization);
            }
            if (loclayer.inspire) {
                layer.setGroups([{
                    id: layer.getId(),
                    name: loclayer.inspire
                }]);
            }
        }
    });
