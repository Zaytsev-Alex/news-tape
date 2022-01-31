import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {EditorRequestsService} from './editor-requests.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {MockType, repositoryMockFactory} from '../helpers/testUtils';
import {EditorRequest} from './entities/editor-request.entity';
import {NotFoundException} from '@nestjs/common';

describe('EditorRequestsService', () => {
    let service: EditorRequestsService;
    let repositoryMock: MockType<Repository<EditorRequest>>;

    const userDto = {
        id:           1,
        firstName:    'firstName',
        lastName:     'lastName',
        email:        'email@email.email',
        password:     'password',
        isAdmin:      false,
        hashPassword: () => {}
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                EditorRequestsService,
                {provide: getRepositoryToken(EditorRequest), useFactory: repositoryMockFactory},
            ]
        }).compile();

        service        = module.get<EditorRequestsService>(EditorRequestsService);
        repositoryMock = module.get(getRepositoryToken(EditorRequest));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findOneById', () => {
        it('should return editor\'s request', async () => {
            const mockResult = 1;
            expect(await service.findOneById(mockResult)).toEqual({id: mockResult});
        });
    });

    describe('create', () => {
        it('should create editor\'s request', async () => {
            const mockReturnValue = {id: 1, user: userDto};
            repositoryMock.create.mockReturnValue(mockReturnValue);
            expect(await service.create({user: userDto})).toEqual(mockReturnValue);
        });
    });

    describe('findAll', () => {
        it('should return editor requests', async () => {
            const mockReturnValue = [{id: 1, user: userDto}, 1];
            repositoryMock.findAndCount.mockReturnValue(mockReturnValue);
            expect(await service.findAll({limit: 3, skip: 0})).toEqual(mockReturnValue);
        });

        it('search should be executed with given pagination query', async () => {
            const paginationQuery = {limit: 3, skip: 0};
            await service.findAll(paginationQuery)
            expect(repositoryMock.findAndCount).toBeCalledWith(
                expect.objectContaining({skip: paginationQuery.skip, take: paginationQuery.limit})
            );
        });
    });

    describe('remove', () => {
        it('should be returned deleted request', async () => {
            const mockReturnValue = {user: userDto, id: 1};
            repositoryMock.remove.mockReturnValue(mockReturnValue);
            expect(await service.remove(1)).toBe(mockReturnValue);
        });

        it('if there is no such request in DB, error should be thrown', async () => {
            repositoryMock.findOne.mockReturnValue(null);
            try {
                await service.remove(1);
            }
            catch (error) {
                expect(error).toBeDefined();
                expect(error).toBeInstanceOf(NotFoundException);
            }
        });
    });
});
