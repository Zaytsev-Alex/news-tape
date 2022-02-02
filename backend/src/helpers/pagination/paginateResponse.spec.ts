import paginateResponse, {calculateSkipValue} from './paginateResponse';

describe('response paginator utils tests', () => {
    describe('calculateSkipValue', () => {
        it('when page is first, skip value should be 0', () => {
            expect(calculateSkipValue(1, 10)).toBe(0);
        });

        it('when page is second, skip value should be equal to take value', () => {
            expect(calculateSkipValue(2, 10)).toBe(10);
        });

        it('when page is fifth, skip value should be equal to take * 4', () => {
            expect(calculateSkipValue(5, 10)).toBe(40);
        });

        it('when page is tenth, skip value should be equal to take * 9', () => {
            expect(calculateSkipValue(10, 10)).toBe(90);
        });
    });

    describe('paginateResponse', () => {
        const views = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const paginateResponseParameters = [[views, views.length], 1, 10];

        function getPaginateResponseParameters(viewsList = views, total = views.length, currentPage = 1, limit = 10, viewConverter) {
            return [[viewsList, total], currentPage, limit, viewConverter];
        }

        describe('lastPage value', () => {
            it('should be 1, if there is no more views except returned', () => {
                // @ts-ignore
                expect(paginateResponse(...getPaginateResponseParameters()).lastPage).toBe(1);
            });

            it('should be 2, if the difference between count of returning and all views less than take value', () => {
                // @ts-ignore
                expect(paginateResponse(...getPaginateResponseParameters(views, 15, 1, 10)).lastPage).toBe(2);
            });

            it('should be 3, if the difference between count of returning and all views more than take value, but less then take * 2 value', () => {
                // @ts-ignore
                expect(paginateResponse(...getPaginateResponseParameters(views, 25, 1, 10)).lastPage).toBe(3);
            });

            it('should be 0, if the are no views', () => {
                // @ts-ignore
                expect(paginateResponse(...getPaginateResponseParameters([], 0, 1, 10)).lastPage).toBe(0);
            });
        });

        describe('nextPage value', () => {
            it('should be null, if there is no next page', () => {
                // @ts-ignore
                expect(paginateResponse(...getPaginateResponseParameters()).nextPage).toBe(null);
            });

            it('should be calculated correctly, if there is next page', () => {
                // @ts-ignore
                expect(paginateResponse(...getPaginateResponseParameters(views, 15, 1, 10)).nextPage).toBe(2);
            });
        });

        describe('prevPage value', () => {
            it('should be null, if current page is first page', () => {
                // @ts-ignore
                expect(paginateResponse(...getPaginateResponseParameters()).prevPage).toBe(null);
            });

            it('should be calculated correctly, if there is prev page', () => {
                // @ts-ignore
                expect(paginateResponse(...getPaginateResponseParameters(views, 15, 2, 10)).prevPage).toBe(1);
            });
        });


        describe('views value', () => {
            it('should be same as given, when there is no converter', () => {
                // @ts-ignore
                expect(paginateResponse(...getPaginateResponseParameters()).views).toEqual(views);
            });

            it('should be converted, if there is converter given', () => {
                function convertView(view) {
                    return view * 2;
                }

                expect(
                    // @ts-ignore
                    paginateResponse(...getPaginateResponseParameters(views, 10, 1, 10, convertView)).views
                ).toEqual(views.map(convertView));
            });
        });
    });
});
