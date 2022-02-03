import {Module} from '@nestjs/common';
import {NewsService} from './news.service';
import {NewsController} from './news.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {News} from './entities/news.entity';

@Module({
    controllers: [NewsController],
    providers: [NewsService],
    imports: [TypeOrmModule.forFeature([News])],
})
export class NewsModule {
}
