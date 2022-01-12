import {Module} from '@nestjs/common';
import {EditorRequestsService} from './editor-requests.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EditorRequest} from './entities/editor-request.entity';

@Module({
    imports: [TypeOrmModule.forFeature([EditorRequest])],
    providers: [EditorRequestsService],
    exports: [EditorRequestsService],
})
export class EditorRequestsModule {
}
