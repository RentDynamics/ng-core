export interface CoreApiSelectorParams {
    endpoint?: string;
    fields?: string[];
    filters?: any;
    include?: string[];
    orderBy?: string;
    page?: number;
    pageSize?: number;
    distinct?: boolean;
}