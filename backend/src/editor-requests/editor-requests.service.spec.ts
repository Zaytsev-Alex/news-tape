import {Test, TestingModule} from '@nestjs/testing';
import {EditorRequestsService} from './editor-requests.service';

describe('EditorRequestsService', () => {
    let service: EditorRequestsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EditorRequestsService],
        }).compile();

        service = module.get<EditorRequestsService>(EditorRequestsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
