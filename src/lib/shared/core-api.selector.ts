import * as moment from 'moment';

import { isArray, isObject } from '../helpers';
import { CoreApiSelectorFilter } from './core-api-selector-filter';
import { CoreApiSelectorParams } from './core-api-selector-params';

export class CoreApiSelector {
    endpoint: string;
    filters: CoreApiSelectorFilter;
    fields: string[];
    exclude: string[];
    include: string[];
    orderBy: string;
    page: number;
    pageSize: number;
    distinct: boolean;

    constructor(params?: CoreApiSelectorParams) {
        if (params) {
            for (var key in params) {
                this[key] = params[key];
            }
        }
    }

    addFilter(key: string, value?: any){
        this.filters[key] = value;
    }

    stringify(): string {
        let results = [];

        if (this.filters && this.stringifyFilters(this.filters))
            results.push(`filters=${this.stringifyFilters(this.filters)}`);

        if (this.include && this.include.length)
            results.push(`include=${this.include.join(',')}`);

        if (this.exclude && this.exclude.length)
            results.push(`exclude=${this.exclude.join(',')}`);

        if (this.fields && this.fields.length)
            results.push(`fields=${this.fields.join(',')}`);

        if (this.orderBy)
            results.push(`orderBy=${this.orderBy}`);

        if (this.page)
            results.push(`page=${this.page}`);

        if (this.pageSize)
            results.push(`pageSize=${this.pageSize}`);

        if (this.distinct)
            results.push(`distinct=true`);

        if (results.join('&'))
            return `${this.endpoint}?${results.join('&')}`;

        return this.endpoint;
    }

    mapKeyValuePairs(key: string, value: any): string[] {
        let results: string[] = [];

        if (key.indexOf('=') > -1) {
            results.push(`${key}`);
            return results;
        }

        if (isArray(value)) {
            if (value.length)
                results.push(`${key}__in=${value.join(',')}`)
            return results;
        }

        if (isObject(value)) {
            if (moment.isMoment(value)) {
                results.push(`${key}=${value.format('MM/DD/YY')}`);
            } else {
                for (var filterValKey in value) {
                    let result: string[];

                    result = this.mapKeyValuePairs(`${key}__${filterValKey}`, value[filterValKey]);

                    if (result && result.length)
                        results.push(result.join('|'));
                }
            }
            return results;
        }

        if (value !== null && value !== undefined && value !== '') {
            results.push(`${key}=${value}`);
            return results;
        }

        return results;
    }

    stringifyFilters(filter: Object): string {
        let results: string[] = [];

        for (var key in filter) {
            let value: any = filter[key];
            let result: string[] = this.mapKeyValuePairs(key, value);

            if (result && result.length)
                results.push(result.join('|'));
        }

        if (results && results.length)
            return results.join('|');
    }

}
