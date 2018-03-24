/* tslint:disable:no-unused-variable */

import * as moment from 'moment';
import {
    async, inject
} from '@angular/core/testing';

import { CoreApiSelectorParams } from './core-api-selector-params';
import { CoreApiSelector } from './core-api.selector';

class MockUnitSelector extends CoreApiSelector {
    endpoint: string = '/units';
    constructor(params: CoreApiSelectorParams) {
        super(params);
    }
}

class MockUnitCommunityAddressSelector extends CoreApiSelector {
    endpoint: string = '/units';
    include = ['community__address']
    constructor(params: CoreApiSelectorParams) {
        super(params);
    }
}

class MockClientAmenitySelector extends CoreApiSelector {
    get endpoint() {
        return `/client/${this.clientId}/amenities`;
    }
    constructor(public clientId: number = null) {
        super();
    }
}

class MockClientUnitSelector extends CoreApiSelector {
    endpoint: string = '/units';
    include: string[] = ['floorplan', 'community__address'];
    constructor(params: CoreApiSelectorParams) {
        super(params);
    }
}


describe('CoreApiSelector', () => {
    it('should create an instance', () => {
        expect(new CoreApiSelector()).toBeTruthy();
    });

    it('stringify() formats "includes" correctly', () => {
        let selector = new CoreApiSelector({ endpoint: '/units', include: ['unitAmenity', 'clientAmenity'] });
        expect(selector.stringify()).toBe('/units?include=unitAmenity,clientAmenity');
    });

    it('stringify() formats "fields" correctly', () => {
        let selector = new CoreApiSelector({ endpoint: '/units', fields: ['id', 'name'] });
        expect(selector.stringify()).toBe('/units?fields=id,name');
    });

    it('stringify() formats "moment()" filter correctly', () => {
        let selector = new CoreApiSelector({
            endpoint: '/units',
            filters: {
                moveInDate: moment('08-28-1988', 'M-D-Y')
            }
        });
        expect(selector.stringify()).toBe(`/units?filters=moveInDate=08/28/88`);
    });

    it('stringify() formats parameterized endpoint correctly', () => {
        let clientId = 1;
        let selector = new CoreApiSelector({
            endpoint: `/client/${clientId}/amenities`
        });
        expect(selector.stringify()).toBe('/client/1/amenities');
    });

    it('stringify() formats changing parameterized endpoint correctly (w/getter)', () => {
        let clientId = 1;
        let selector = new MockClientAmenitySelector(clientId);
        selector.clientId = 2;
        expect(selector.stringify()).toBe('/client/2/amenities');
    });

    it('stringify() maintains its include, which are statically defined in an overriding class, ' +
        'when other parameters are passed in dynamically on initialization', () => {
            let clientId = 1;
            let selector = new MockUnitCommunityAddressSelector({
                filters: {
                    moveInDate: moment('08-28-1988', 'M-D-Y')
                }
            });
            expect(selector.stringify()).toBe("/units?filters=moveInDate=08/28/88&include=community__address");
        });

    it('stringify() formats multiple params correctly', () => {
        let selector = new MockUnitSelector({
            page: 1,
            pageSize: 30,
            fields: ['id', 'name'],
            filters: {
                communityGroupId: 21,
                communityBasket: [1, 2, 3, 4],
                bedrooms: 3,
                unitAmenities: {
                    amenityTypeId: 2,
                    amenityType: {
                        id: 2
                    },
                    amenityTypes: [1, 2, 3]
                }
            },
            include: ['unitAmenities', 'unitFloorplans']
        });
        expect(selector.stringify()).toBe("/units?filters=communityGroupId=21|communityBasket__in=1,2,3,4" +
            "|bedrooms=3|unitAmenities__amenityTypeId=2|unitAmenities__amenityType__id=2|unitAmenities__amenityTypes__in=1,2,3" +
            "&include=unitAmenities,unitFloorplans&fields=id,name&page=1&pageSize=30");
    });

    it('stringify() outputs "endpoint" correctly when the endpoint is defined in its overriding class', () => {
        let selector = new MockUnitSelector({ fields: ['id', 'name'] });
        expect(selector.stringify()).toBe('/units?fields=id,name');
    });

    it('stringify() handles { filter: { bedrooms: 0 } } correctly', () => {
        let selector = new MockUnitSelector({ fields: ['id', 'name'], filters: { bedrooms: 0 } });
        expect(selector.stringify()).toBe('/units?filters=bedrooms=0&fields=id,name');
    });

    it('stringify() handles { filter: { bedrooms: null } } correctly', () => {
        let selector = new MockUnitSelector({ fields: ['id', 'name'], filters: { bedrooms: null } });
        expect(selector.stringify()).toBe('/units?fields=id,name');
    });

    it('stringify() handles { filter: { bedrooms: undefined } } correctly', () => {
        let selector = new MockUnitSelector({ fields: ['id', 'name'], filters: { bedrooms: undefined } });
        expect(selector.stringify()).toBe('/units?fields=id,name');
    });

    it('stringify() handles { filter: { bedrooms: \'\' } } correctly', () => {
        let selector = new MockUnitSelector({ fields: ['id', 'name'], filters: { bedrooms: '' } });
        expect(selector.stringify()).toBe('/units?fields=id,name');
    });

    it('stringify() handles distinct=true correctly', () => {
        let selector = new CoreApiSelector({ endpoint: '/units', distinct: true });
        expect(selector.stringify()).toBe('/units?distinct=true');
    });

    it('stringify() handles distinct=false correctly', () => {
        let selector = new CoreApiSelector({ endpoint: '/units', distinct: false });
        expect(selector.stringify()).toBe('/units');
    });

    it('addFilter() adds filter correctly when both key and value provided', () => {
        let selector = new CoreApiSelector({ endpoint: '/pmFailuresView', filters: {
            name__istartswith: 'M'
         } });
        selector.addFilter('resolved__lt', 1);
        expect(selector.stringify()).toBe('/pmFailuresView?filters=name__istartswith=M|resolved__lt=1');
    });

    it('addFilter() adds filter correctly when only key provided', () => {
        let selector = new CoreApiSelector({ endpoint: '/pmFailuresView', filters: {
            name__istartswith: 'M'
         } });
        selector.addFilter('resolved__lt=1');
        expect(selector.stringify()).toBe('/pmFailuresView?filters=name__istartswith=M|resolved__lt=1');
    });

    it('stringify() nested communityBasket -> basketId array filter is not included when basketId array is empty', () => {
        /* Arrange */
        let selector = new MockClientUnitSelector({
            page: 1,
            pageSize: 30,
            filters: {
                bedrooms: 3,
                bathrooms: null,
                community: {
                    clientId: getSelectedClientID(),
                    communityBaskets: {
                        basketId: []
                    }
                }
            }
        });

        /* Assert */
        expect(selector.stringify()).toBe("/units?filters=bedrooms=3|community__clientId=1" +
            "&include=floorplan,community__address&page=1&pageSize=30");
    });

    it('stringify() grandaddy o thy all', () => {
        /* Arrange */
        let selector = new MockClientUnitSelector({
            page: 1,
            pageSize: 30,
            /* todo: include: ['unitAmenities'] doesn't work,
            we will have to invoke /units/amenities endpoint in a
            separate call. (if even still needed) */
            filters: {
                bedrooms: 3,
                bathrooms: null,
                /* todo: maxPrice: this.filter.maxPrice, */
                /* broken on front-end core-api.selector i think */
                // readyDate: {
                //   lt: this.filter.moveInDate,
                // },
                community: {
                    clientId: getSelectedClientID(),
                    communityBaskets: {
                        basketId: [1, 2, 3, 4]
                    }
                }
                // unitAmenities: {
                //   amenityId: 1,
                //   amenityTypeId: 31
                // }
            }
        });

        /* Assert */
        expect(selector.stringify()).toBe("/units?filters=bedrooms=3|community__clientId=1|community__communityBaskets__basketId__in=1,2,3,4" +
            "&include=floorplan,community__address&page=1&pageSize=30");
    });
});

function getSelectedClientID() {
    return 1;
}
