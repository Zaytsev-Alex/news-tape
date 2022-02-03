import {Body, Controller, Get, HttpCode, Param, Post, UseGuards} from '@nestjs/common';
import {NewsService} from './news.service';
import {CreateNewsDto} from './dto/create-news.dto';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {RolesGuard} from '../auth/roles.guard';
import {PaginationDto} from '../helpers/pagination/pagination.dto';
import {IPaginatedResponse} from '../helpers/pagination/paginateResponse';
import {News} from './entities/news.entity';

@UseGuards(JwtAuthGuard)
@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {
    }

    @UseGuards(RolesGuard)
    @Post()
    create(@Body() createNewsDto: CreateNewsDto) {
        return this.newsService.createAndSave(createNewsDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.newsService.findOne(+id);
    }

    @Post('find')
    @HttpCode(200)
    findNews(@Body() paginationDto: PaginationDto): Promise<IPaginatedResponse<News>> {
        return this.newsService.findAll(paginationDto);
    }
}
