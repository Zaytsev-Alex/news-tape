import {Test, TestingModule} from '@nestjs/testing';
import {NewsController} from './news.controller';
import {NewsService} from './news.service';
import {MockType, repositoryMockFactory} from '../helpers/testUtils';
import {getRepositoryToken} from '@nestjs/typeorm';
import {News} from './entities/news.entity';
import {Repository} from 'typeorm';

describe('NewsController', () => {
    let controller: NewsController;
    let service: NewsService;
    let repositoryMock: MockType<Repository<News>>;

    const createNewsDto = {content: 'content', title: 'title'};
    const mockNews      = {...createNewsDto, createdDate: new Date(), id: 1};

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NewsController],
            providers: [
                NewsService,
                {provide: getRepositoryToken(News), useFactory: repositoryMockFactory}
            ],
        }).compile();

        controller     = module.get<NewsController>(NewsController);
        service        = module.get<NewsService>(NewsService);
        repositoryMock = module.get(getRepositoryToken(News));
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call createAndSave service with createNewsDto', async() => {
            const createAndSaveSpy = jest.spyOn(service, 'createAndSave')
                .mockReturnValue(Promise.resolve(mockNews));
            await controller.create(createNewsDto);

            expect(createAndSaveSpy).toBeCalledWith(createNewsDto);
        });

        it('should return saved news item',  async() => {
            jest.spyOn(service, 'createAndSave').mockReturnValue(Promise.resolve(mockNews));
            expect(await controller.create(createNewsDto)).toEqual(mockNews);
        });
    });
});
