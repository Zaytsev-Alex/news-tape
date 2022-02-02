import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../auth/jwt-auth.guard';
import {EditorRequestsService} from './editor-requests.service';
import {PaginationDto} from '../helpers/pagination/pagination.dto';
import {IPaginatedResponse} from '../helpers/pagination/paginateResponse';
import IEditorRequestView from './interfaces/IEditorRequestView';

@UseGuards(JwtAuthGuard)
@Controller('editor-requests')
export class EditorRequestsController {
    constructor(private readonly editorRequestsService: EditorRequestsService) {
    }

    @Post()
    findRequests(@Body() paginationDto: PaginationDto): Promise<IPaginatedResponse<IEditorRequestView>> {
        return this.editorRequestsService.findAll(paginationDto);
    }
}
