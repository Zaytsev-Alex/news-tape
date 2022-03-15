import {Test} from '@nestjs/testing';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppModule} from '../../src/app.module';
import {INestApplication} from '@nestjs/common';

export default async function createTestingModule(): Promise<INestApplication> {
    const module = await Test.createTestingModule({
        imports: [
            TypeOrmModule.forRoot({
                name:        'default',
                type:        'postgres',
                host:        'localhost',
                port:        5432,
                username:    'postgres',
                password:    'root',
                database:    'postgres',
                entities:    [__dirname + '/../../src/**/*.entity{.ts,.js}'],
                synchronize: true,
            }), AppModule],
    }).compile();

    const app = module.createNestApplication();
    await app.init();

    return app;
}
