export interface IPaginatedResponse<ViewType = unknown> {
    views:       ViewType[],
    count:       number,
    currentPage: number,
    nextPage:    number,
    prevPage:    number,
    lastPage:    number,
}

export default function paginateResponse<ViewType, ReturningViewType>(
    data: [ViewType[], number],
    currentPage: number,
    limit: number,
    viewConverter?: (view: ViewType) => ReturningViewType
): IPaginatedResponse<ReturningViewType | ViewType> {

    const [result, total] = data;
    const lastPage        = Math.ceil(total / limit);
    const nextPage        = currentPage + 1 > lastPage ? null : currentPage + 1;
    const prevPage        = currentPage - 1 < 1 ? null : currentPage - 1;
    const convertedResult = viewConverter ? result.map((item) => viewConverter(item)) : [...result];

    return {
        views:       convertedResult,
        count:       total,
        currentPage: currentPage,
        nextPage:    nextPage,
        prevPage:    prevPage,
        lastPage:    lastPage,
    }
}

export function calculateSkipValue(page: number, take: number): number {
    return (page - 1) * take;
}
