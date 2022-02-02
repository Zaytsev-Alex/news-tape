import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateEditorRequestDto} from './dto/create-editor-request.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {EditorRequest} from './entities/editor-request.entity';
import {PaginationDto} from '../helpers/pagination/pagination.dto';
import paginateResponse, {calculateSkipValue, IPaginatedResponse} from '../helpers/pagination/paginateResponse';
import {extractEditorRequestView} from '../helpers/utils';
import IEditorRequestView from './interfaces/IEditorRequestView';

@Injectable()
export class EditorRequestsService {
    constructor(
        @InjectRepository(EditorRequest)
        private editorRequestRepository: Repository<EditorRequest>,
    ) {
    }

    createAndSave(createEditorRequestDto: CreateEditorRequestDto): Promise<EditorRequest> {
        return this.save(this.create(createEditorRequestDto));
    }

    create(createEditorRequestDto: CreateEditorRequestDto): EditorRequest {
        return this.editorRequestRepository.create({...createEditorRequestDto});
    }

    save(editorRequest: EditorRequest): Promise<EditorRequest> {
        return this.editorRequestRepository.save(editorRequest);
    }

    async findAll(paginationDto: PaginationDto): Promise<IPaginatedResponse<IEditorRequestView>> {
        const {take, page} = paginationDto;
        const skip         = calculateSkipValue(page, take);
        const query        = {
            take:      take,
            skip:      skip,
            relations: ['user'],
        };

        return paginateResponse<EditorRequest, IEditorRequestView>(
            await this.editorRequestRepository.findAndCount(query), page, take, extractEditorRequestView
        );
    }

    async remove(id: number): Promise<EditorRequest> {
        const request = await this.findOneById(id);

        if (!request) {
            throw new NotFoundException("Editor's request is not found.");
        }

        return this.editorRequestRepository.remove(request);
    }

    findOneById(id: number): Promise<EditorRequest> {
        return this.editorRequestRepository.findOne({
            where: {
                id: id
            },
            relations: ['user']
        });
    }
}
