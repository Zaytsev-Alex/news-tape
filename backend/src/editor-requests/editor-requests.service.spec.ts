import {Test, TestingModule} from '@nestjs/testing';
import {Repository} from 'typeorm';
import {EditorRequestsService} from './editor-requests.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {MockType, repositoryMockFactory} from '../helpers/testUtils';
import {EditorRequest} from './entities/editor-request.entity';
import {NotFoundException} from '@nestjs/common';
import {extractUserView} from '../helpers/utils';

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
            const mockResult = {user: userDto, id: 1};
            repositoryMock.findOne.mockReturnValue(mockResult);
            expect(await service.findOneById(1)).toEqual(mockResult);
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
        const findAndCountMockReturnValue = [[{id: 1, user: userDto}], 1];
        const paginationQuery             = {take: 10, page: 1};


        it('should return editor requests', async () => {
            repositoryMock.findAndCount.mockReturnValue(findAndCountMockReturnValue);
            expect((await service.findAll(paginationQuery)).views).toEqual([
                {id: 1, user: extractUserView(userDto)}
            ]);
        });

        it('search should be executed with given pagination query', async () => {
            repositoryMock.findAndCount.mockReturnValue(findAndCountMockReturnValue);
            await service.findAll(paginationQuery);
            expect(repositoryMock.findAndCount).toBeCalledWith(
                expect.objectContaining({skip: 0, take: paginationQuery.take, relations: ['user']})
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

            await expect(
                async () => await service.remove(1)
            ).rejects.toThrowError(NotFoundException);
        });
    });

    describe('save', () => {
        const mockReturnValue = {id: 1, user: userDto};

        it('should call save method', async () => {
            await service.save(mockReturnValue);
            expect(repositoryMock.save).toBeCalledTimes(1);
            expect(repositoryMock.save).toBeCalledWith(mockReturnValue);
        });

        it('should return saved request', async () => {
            repositoryMock.save.mockReturnValue(mockReturnValue);
            expect(await service.save(mockReturnValue)).toEqual(mockReturnValue);
        });
    });

    describe('createAndSave', () => {
        const mockReturnValue = {id: 1, user: userDto};

        it('should call create method', async () => {
            await service.createAndSave(mockReturnValue);
            expect(repositoryMock.create).toBeCalledTimes(1);
            expect(repositoryMock.create).toBeCalledWith(mockReturnValue);
        });

        it('should call save method', async () => {
            await service.createAndSave(mockReturnValue);
            expect(repositoryMock.save).toBeCalledTimes(1);
            expect(repositoryMock.save).toBeCalledWith(mockReturnValue);
        });

        it('should return saved request', async () => {
            repositoryMock.save.mockReturnValue(mockReturnValue);
            expect(await service.createAndSave(mockReturnValue)).toEqual(mockReturnValue);
        });
    });
});
