import { afterAll } from '@jest/globals';
// Oskari global
import '../../../../../src/global';
// VectorLayerPlugin stuff
import './VectorLayerPlugin.ol';
import './vectorlayer';

// mapmodule
import '../../mapmodule.ol';
import '../../resources/locale/en.js';

import olSourceVector from 'ol/source/Vector';
import olLayerVector from 'ol/layer/Vector';

// for mapmodule
// defaults from mapfull

const projections = {
    'EPSG:3067': '+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs',
    'EPSG:4326': '+title=WGS 84 +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
};
Object.keys(projections).forEach(code => {
    // mapmodule introduces proj4 global
    window.proj4.defs(code, projections[code]);
});
//  -/for mapmodule

const sandbox = Oskari.getSandbox('VectorLayerPluginTest');
const plugin = Oskari.clazz.create('Oskari.mapframework.mapmodule.VectorLayerPlugin');
const layerService = Oskari.clazz.create('Oskari.mapframework.service.MapLayerService', sandbox);
sandbox.registerService(layerService);

const mapModule = Oskari.clazz.create('Oskari.mapframework.ui.module.common.MapModule', 'Test');
sandbox.register(mapModule);
mapModule.requestHandlers = {};
mapModule.registerPlugin(plugin);
mapModule.start(sandbox);
plugin.startPlugin(sandbox);

afterAll(() => {
    mapModule.stop();
});

// "mock" setFeatureStyle since we don't have canvas without DOM
plugin.setFeatureStyle = () => {};

const createFakeLayer = () => {
    return new olLayerVector({
        source: new olSourceVector()
    });
};

describe('VectorLayerPlugin', () => {
    plugin._olLayers['test_1'] = createFakeLayer();
    plugin._olLayers['test_2'] = createFakeLayer();

    describe('getLayerIds', () => {
        test('without param returns all layers (2)', () => {
            expect(plugin.getLayerIds().length).toEqual(2);
        });
        test('with valid and recognized layer id in array returns 1', () => {
            expect(plugin.getLayerIds(['test_2']).length).toEqual(1);
        });
        test('with valid and recognized layer id returns 1', () => {
            expect(plugin.getLayerIds('test_2').length).toEqual(1);
        });
        test('with referencing some unrecognized layer ids returns one that matches', () => {
            expect(plugin.getLayerIds([1, 2, 'test_1']).length).toEqual(1);
        });
        test('with referencing unrecognized layer id returns 0', () => {
            expect(plugin.getLayerIds(12).length).toEqual(0);
        });
        test('without random input returns 0', () => {
            expect(plugin.getLayerIds({ testing: true }).length).toEqual(0);
        });
    });

    describe('addFeaturesToMap', () => {
        test('add geojson', () => {
            const geojson = generateGeoJSON(1, 2);
            plugin.addFeaturesToMap(geojson);
            expect(plugin.getLayerIds().length).toEqual(3);
        });
    });
    describe('getFeaturesMatchingQuery', () => {
        test('no params', () => {
            expect(plugin.getFeaturesMatchingQuery().length).toEqual(0);
        });
        test('with default layer as param', () => {
            // assumes addFeaturesToMap() test added features and the default layer
            expect(plugin.getFeaturesMatchingQuery(['VECTOR']).length).toEqual(2);
        });
        test('with query', () => {
            // assumes addFeaturesToMap() test added features and the default layer
            expect(plugin.getFeaturesMatchingQuery(['VECTOR'], {
                'test_property': [1, 2]
            }).length).toEqual(2);
            expect(plugin.getFeaturesMatchingQuery(['VECTOR'], {
                'test_property': [1]
            }).length).toEqual(1);
            expect(plugin.getFeaturesMatchingQuery(['VECTOR'], {
                'test_property': [2]
            }).length).toEqual(1);
            expect(plugin.getFeaturesMatchingQuery(['VECTOR'], {
                'bool': [false]
            }).length).toEqual(1);
            expect(plugin.getFeaturesMatchingQuery(['VECTOR'], {
                'zero': [0]
            }).length).toEqual(1);
        });
    });
});

const generateGeoJSON = (x, y) => {
    return {
        'type': 'FeatureCollection',
        'crs': {
            'type': 'name'
        },
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [[[x, y], [x + 1, y + 1], [x + 2, y + 5]]]
                },
                'properties': {
                    'test_property': 1,
                    'bool': false
                }
            },
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [x + 4, y + 3]
                },
                'properties': {
                    'test_property': 2,
                    'zero': 0
                }
            }
        ]
    };
};
