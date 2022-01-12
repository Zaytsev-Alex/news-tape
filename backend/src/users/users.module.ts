import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {EditorRequestsModule} from '../editor-requests/editor-requests.module';
import {UsersController} from './users.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User]), EditorRequestsModule],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {
}
