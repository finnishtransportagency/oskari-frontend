import {normalStyle, selectedStyle} from './defaultStyle';
import VectorTileLayerPlugin from '../../mapmodule/plugin/vectortilelayer/VectorTileLayerPlugin';
import {FeatureService, oskariIdKey} from '../service/FeatureService';
import ReqEventHandler from './ReqEventHandler';
import TileState from 'ol/TileState';

const WfsLayerModelBuilder = Oskari.clazz.get('Oskari.mapframework.bundle.mapwfs2.domain.WfsLayerModelBuilder');

Oskari.clazz.defineES('Oskari.wfsmvt.WfsMvtLayerPlugin',
    class WfsMvtLayerPlugin extends VectorTileLayerPlugin {
        constructor (config) {
            super(config);
            this.__name = 'WfsMvtLayerPlugin';
            this._clazz = 'Oskari.wfsmvt.WfsMvtLayerPlugin';
            this.layertype = 'wfs';
            this.featureService = new FeatureService();
            this.reqEventHandler = new ReqEventHandler();
        }
        _initImpl () {
            super._initImpl();
            const sandbox = this.getSandbox();
            this.WFSLayerService = Oskari.clazz.create(
                'Oskari.mapframework.bundle.mapwfs2.service.WFSLayerService', sandbox);

            sandbox.registerService(this.WFSLayerService);
        }
        _createPluginEventHandlers () {
            return Object.assign(super._createPluginEventHandlers(), this.reqEventHandler.createEventHandlers(this));
        }
        _createRequestHandlers () {
            return this.reqEventHandler.createRequestHandlers(this);
        }
        findOlLayerId (olLayer) {
            return Object.keys(this._layerImplRefs).find(layerId => olLayer === this._layerImplRefs[layerId]);
        }
        _getLayerCurrentStyleFunction (layer) {
            const selectedIds = new Set(this.WFSLayerService.getSelectedFeatureIds(layer.getId()));
            const superStyle = super._getLayerCurrentStyleFunction(layer);
            if (!selectedIds.size) {
                return superStyle;
            }
            // Duplicated code for optimization. Check typeof once instead of on every feature.
            if (typeof superStyle === 'function') {
                return (feature, resolution) => {
                    if (selectedIds.has(feature.get(oskariIdKey))) {
                        return selectedStyle(feature, resolution);
                    }
                    return superStyle(feature, resolution);
                };
            } else {
                return (feature, resolution) => {
                    if (selectedIds.has(feature.get(oskariIdKey))) {
                        return selectedStyle(feature, resolution);
                    }
                    return superStyle;
                };
            }
        }
        /**
         * Override, see superclass
         */
        _getLayerModelClass () {
            return 'Oskari.mapframework.bundle.mapwfs2.domain.WFSLayer';
        }
        /**
         * Override, see superclass
         */
        _getModelBuilder () {
            return new WfsLayerModelBuilder(this.getSandbox());
        }
        /**
         * Override, see superclass
         */
        createSource (layer, options) {
            const source = super.createSource(layer, options);
            const featureService = this.featureService;
            const sandbox = this.getSandbox();
            source.on('tileloadend', ({tile}) => {
                if (tile.getState() === TileState.ERROR) {
                    return;
                }
                const features = tile.getFeatures();
                featureService.addFeatures(layer.getId(), features);
                const {fields, properties} = featureService.getFieldsAndProperties(layer.getId());
                layer.setFields(fields);
                layer.setActiveFeatures(properties);
                var event = Oskari.eventBuilder('WFSFeatureEvent')(
                    layer,
                    []
                );
                sandbox.notifyAll(event);
            });
            return source;
        }
        /**
         * Override, see superclass
         */
        _createDefaultStyle () {
            return normalStyle;
        }
    }
    , {
        /**
         * @property {String[]} protocol array of superclasses as {String}
         * @static
         */
        'protocol': ['Oskari.mapframework.module.Module', 'Oskari.mapframework.ui.module.common.mapmodule.Plugin']
    }
);
