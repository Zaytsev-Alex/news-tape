import {Test, TestingModule} from '@nestjs/testing';
import {NewsController} from './news.controller';
import {NewsService} from './news.service';
import {MockType, repositoryMockFactory} from '../helpers/testUtils';
import {getRepositoryToken} from '@nestjs/typeorm';
import {News} from './entities/news.entity';
import {Repository} from 'typeorm';
import {CreateNewsDto} from './dto/create-news.dto';

describe('NewsController', () => {
    let controller: NewsController;
    let service: NewsService;
    let repositoryMock: MockType<Repository<News>>;

    const createNewsDto = new CreateNewsDto();
    const _news         = new News();
    const mockNews      = {..._news, createdDate: new Date(), id: 1};

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
        it('should call createAndSave service with createNewsDto', async () => {
            const createAndSaveSpy = jest.spyOn(service, 'createAndSave')
                .mockReturnValue(Promise.resolve(mockNews));
            await controller.create(createNewsDto);

            expect(createAndSaveSpy).toBeCalledWith(createNewsDto);
        });

        it('should return saved news item',  async () => {
            jest.spyOn(service, 'createAndSave').mockReturnValue(Promise.resolve(mockNews));
            expect(await controller.create(createNewsDto)).toEqual(mockNews);
        });
    });

    describe('findOne', () => {
        it('should call findOne service with given id', async () => {
            const findOneSpy = jest.spyOn(service, 'findOne')
                .mockReturnValue(Promise.resolve(mockNews));
            await controller.findOne(String(mockNews.id));

            expect(findOneSpy).toBeCalledWith(mockNews.id);
        });

        it('should return found news item',  async () => {
            jest.spyOn(service, 'findOne').mockReturnValue(Promise.resolve(mockNews));
            expect(await controller.findOne(String(mockNews.id))).toEqual(mockNews);
        });
    });

    describe('findNews', () => {
        const paginationDto   = {take: 10, page: 1};
        const paginatedResult = {
            views:       [mockNews],
            count:       1,
            currentPage: paginationDto.page,
            nextPage:    null,
            prevPage:    null,
            lastPage:    paginationDto.page}
        ;

        it('should call findAll service with given paginationDto', async () => {
            const findAllSpy = jest.spyOn(service, 'findAll')
                .mockReturnValue(Promise.resolve(paginatedResult));
            await controller.findNews(paginationDto);

            expect(findAllSpy).toBeCalledWith(paginationDto);
        });

        it('should return found news',  async () => {
            jest.spyOn(service, 'findAll').mockReturnValue(Promise.resolve(paginatedResult));
            expect(await controller.findNews(paginationDto)).toEqual(paginatedResult);
        });
    });
});
