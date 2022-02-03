import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {EditorRequestsModule} from './editor-requests/editor-requests.module';
import { NewsModule } from './news/news.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'postgres',
            port: 5432,
            username: 'root',
            password: 'root',
            database: 'news_tape',
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        UsersModule,
        AuthModule,
        EditorRequestsModule,
        NewsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
