import {Module} from '@nestjs/common';
import {EditorRequestsService} from './editor-requests.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {EditorRequest} from './entities/editor-request.entity';
import {EditorRequestsController} from './editor-requests.controller';

@Module({
    imports: [TypeOrmModule.forFeature([EditorRequest])],
    controllers: [EditorRequestsController],
    providers: [EditorRequestsService],
    exports: [EditorRequestsService],
})
export class EditorRequestsModule {
}
