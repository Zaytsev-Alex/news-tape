import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {editorRequestsServiceMockFactory, MockType, repositoryMockFactory} from '../helpers/testUtils';
import {Repository} from 'typeorm';
import {EditorRequest} from './entities/editor-request.entity';
import {EditorRequestsController} from './editor-requests.controller';
import {EditorRequestsService} from './editor-requests.service';
import {User} from '../users/entities/user.entity';
import {extractUserView} from '../helpers/utils';

describe('EditorRequestsController', () => {
    let controller: EditorRequestsController;
    let service: EditorRequestsService;
    let repositoryMock: MockType<Repository<EditorRequest>>;

    const userViewMock = extractUserView(new User());

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EditorRequestsController],
            providers: [
                EditorRequestsService,
                {provide: EditorRequestsService, useFactory: editorRequestsServiceMockFactory},
                {provide: getRepositoryToken(EditorRequest), useFactory: repositoryMockFactory},
            ],
        }).compile();

        controller     = module.get<EditorRequestsController>(EditorRequestsController);
        service        = module.get<EditorRequestsService>(EditorRequestsService);
        repositoryMock = module.get(getRepositoryToken(EditorRequest));
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findRequests', () => {
        const paginationDto = {page: 1, take: 10};
        const mockResponse = {
            views:       [{id: 1, user: userViewMock}],
            count:       1,
            currentPage: paginationDto.page,
            nextPage:    null,
            prevPage:    null,
            lastPage:    1,
        };

        it('should return found requests',  async() => {
            jest.spyOn(service, 'findAll').mockReturnValue(Promise.resolve(mockResponse));
            expect(await controller.findRequests(paginationDto)).toEqual(mockResponse);
        });
    });
});
