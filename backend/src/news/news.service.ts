import {Injectable} from '@nestjs/common';
import {CreateNewsDto} from './dto/create-news.dto';
import {News} from './entities/news.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

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

    // findAll() {
    //     return `This action returns all news`;
    // }
    //
    // findOne(id: number) {
    //     return `This action returns a #${id} news`;
    // }
}
