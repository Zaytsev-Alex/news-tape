import {Injectable} from '@nestjs/common';
import {CreateNewsDto} from './dto/create-news.dto';
import {News} from './entities/news.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {FindConditions, Repository} from 'typeorm';
import {PaginationDto} from '../helpers/pagination/pagination.dto';
import paginateResponse, {calculateSkipValue, IPaginatedResponse} from '../helpers/pagination/paginateResponse';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private newsRepository: Repository<News>,
    ) {
    }

    createAndSave(createNewsDto: CreateNewsDto): Promise<News> {
        return this.save(this.create(createNewsDto));
    }

    create(createNewsDto: CreateNewsDto): News {
        return this.newsRepository.create({...createNewsDto});
    }

    save(createdNews: CreateNewsDto): Promise<News> {
        return this.newsRepository.save(createdNews);
    }

    async findAll(paginationDto: PaginationDto): Promise<IPaginatedResponse<News>> {
        const {take, page} = paginationDto;
        const skip         = calculateSkipValue(page, take);
        const query        = {take, skip, order: {createdDate: 'ASC'}};

        return paginateResponse<News, News>(
            await this.newsRepository.findAndCount(query as FindConditions<News>), page, take
        );
    }

    findOne(id: number): Promise<News> {
        return this.newsRepository.findOne(id);
    }
}
