import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateEditorRequestDto} from './dto/create-editor-request.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {EditorRequest} from './entities/editor-request.entity';
import {PaginationDto} from '../helpers/pagination/pagination.dto';

@Injectable()
export class EditorRequestsService {
    constructor(
        @InjectRepository(EditorRequest)
        private editorRequestRepository: Repository<EditorRequest>,
    ) {
    }

    create(createEditorRequestDto: CreateEditorRequestDto): EditorRequest {
        return this.editorRequestRepository.create({...createEditorRequestDto});
    }

    findAll(paginationDto: PaginationDto): Promise<[EditorRequest[], number]> {
        const {limit, skip} = paginationDto;
        const query = {
            take: limit,
            skip: skip,
        };
        return this.editorRequestRepository.findAndCount(query);
    }

    async remove(id: number): Promise<EditorRequest> {
        const request = await this.findOneById(id);

        if (!request) {
            throw new NotFoundException("Editor's request is not found.");
        }

        return this.editorRequestRepository.remove(request);
    }

    findOneById(id: number): Promise<EditorRequest> {
        return this.editorRequestRepository.findOne({id});
    }
}
