import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {EditorRequestsModule} from './editor-requests/editor-requests.module';
import {NewsModule} from './news/news.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            name:        'default',
            type:        'postgres',
            host:        process.env.POSTGRES_HOST || 'localhost',
            port:        5432,
            username:    process.env.POSTGRES_USER || 'postgres',
            password:    process.env.POSTGRES_PASSWORD || 'root',
            database:    process.env.POSTGRES_DB || 'postgres',
            entities:    [__dirname + '/**/*.entity{.ts,.js}'],
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
