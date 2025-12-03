export declare class paramsSelectDto {
    userId: number;
    priceMin?: number;
    priceMax?: number;
    sortedColumn?: string;
    sortedParam?: 'ASC' | 'DESC' | null;
    like?: string;
    limit?: number;
    offset?: number;
}
