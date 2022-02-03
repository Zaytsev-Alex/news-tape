import {Test, TestingModule} from '@nestjs/testing';
import {NewsService} from './news.service';
import {getRepositoryToken} from '@nestjs/typeorm';
import {MockType, repositoryMockFactory} from '../helpers/testUtils';
import {News} from './entities/news.entity';
import {Repository} from 'typeorm';

describe('NewsService', () => {
    let service: NewsService;
    let repositoryMock: MockType<Repository<News>>;

    const createNewsDto = {content: 'content', title: 'title'};
    const mockNews      = {...createNewsDto, createdDate: new Date(), id: 1};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                NewsService,
                {provide: getRepositoryToken(News), useFactory: repositoryMockFactory}
            ]
        }).compile();

        service        = module.get<NewsService>(NewsService);
        repositoryMock = module.get(getRepositoryToken(News));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create news item', async () => {
            repositoryMock.create.mockReturnValue(mockNews);
            expect(await service.create(createNewsDto)).toEqual(mockNews);
        });
    });

    describe('save', () => {
        it('should call save method', async () => {
            await service.save(mockNews);
            expect(repositoryMock.save).toBeCalledTimes(1);
            expect(repositoryMock.save).toBeCalledWith(mockNews);
        });

        it('should return saved news item', async () => {
            repositoryMock.save.mockReturnValue(mockNews);
            expect(await service.save(mockNews)).toEqual(mockNews);
        });
    });

    describe('createAndSave', () => {
        it('should call create method', async () => {
            await service.createAndSave(mockNews);
            expect(repositoryMock.create).toBeCalledTimes(1);
            expect(repositoryMock.create).toBeCalledWith(mockNews);
        });

        it('should call save method', async () => {
            await service.createAndSave(mockNews);
            expect(repositoryMock.save).toBeCalledTimes(1);
            expect(repositoryMock.save).toBeCalledWith(mockNews);
        });

        it('should return saved news item', async () => {
            repositoryMock.save.mockReturnValue(mockNews);
            expect(await service.createAndSave(mockNews)).toEqual(mockNews);
        });
    });
});
