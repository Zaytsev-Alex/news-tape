import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {NewsService} from './news.service';
import {CreateNewsDto} from './dto/create-news.dto';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {RolesGuard} from '../auth/roles.guard';

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

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return this.newsService.findOne(+id);
    // }
}
