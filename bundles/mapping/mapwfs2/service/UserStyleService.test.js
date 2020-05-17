import { UserStyleService } from './UserStyleService';

describe('saveUserStyle function ', () => {
    test('adds style correctly when styles with given layerId and style id does not exists', () => {
        const service = new UserStyleService();
        const layerId = 1;
        const styleWithMetadata = {
            name: 'My own style',
            style: {
                id: 1
            }
        };
        service.saveUserStyle(layerId, styleWithMetadata);
        const result = service.getUserStylesForLayer(layerId);
        expect(result.length).toEqual(1);
        expect(result[0]).toEqual(styleWithMetadata);
    });
    test('adds style correctly when styles with given layerId exists but not with given style id', () => {
        const service = new UserStyleService();
        const layerId = 1;
        const styleWithMetadata1 = {
            name: 'First style',
            style: {
                id: 1
            }
        };
        const styleWithMetadata2 = {
            name: 'Second style',
            style: {
                id: 2
            }
        };
        service.saveUserStyle(layerId, styleWithMetadata1);
        service.saveUserStyle(layerId, styleWithMetadata2);
        const result = service.getUserStylesForLayer(layerId);
        expect(result.length).toEqual(2);
        expect(result[0]).toEqual(styleWithMetadata1);
        expect(result[1]).toEqual(styleWithMetadata2);
    });
    test('saves style correctly when style with given layerId and given style id exists', () => {
        const service = new UserStyleService();
        const layerId = 1;
        const originalStyleWithMetadata = {
            name: 'Original name',
            style: {
                id: 1
            }
        };
        const updatedStyleWithMetadata = {
            name: 'Updated name',
            style: {
                id: 1,
                someNewField: 'someValue'
            }
        };
        service.saveUserStyle(layerId, originalStyleWithMetadata);
        service.saveUserStyle(layerId, updatedStyleWithMetadata);
        const result = service.getUserStylesForLayer(layerId);
        expect(result.length).toEqual(1);
        expect(result[0]).toEqual(updatedStyleWithMetadata);
    });
});

describe('removeUserStyle function ', () => {
    test('removes user style correctly when found', () => {
        const service = new UserStyleService();
        const layerId = 1;
        const styleId = 1;
        const styleWithMetadata = {
            name: 'some style',
            style: {
                id: styleId
            }
        };
        service.saveUserStyle(layerId, styleWithMetadata);
        const result1 = service.getUserStylesForLayer(layerId);
        expect(result1.length).toEqual(1);
        service.removeUserStyle(layerId, styleId);
        const result2 = service.getUserStylesForLayer(layerId);
        expect(result2.length).toEqual(0);
    });
});
