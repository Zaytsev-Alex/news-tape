import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {Connection} from 'typeorm';
import createTestingModule from './utils/createTestingModule';
import {SignUpDto} from '../src/auth/dto/sign-up.dto';
import {SignInDto} from '../src/auth/dto/sign-in.dto';
import {PaginationDto} from '../src/helpers/pagination/pagination.dto';
import {CreateNewsDto} from '../src/news/dto/create-news.dto';
import {User} from '../src/users/entities/user.entity';
import {UpdateEditorPermissionsDto} from '../src/users/dto/update-editor-permissions.dto';

describe('e2e tests', () => {
    let app: INestApplication
    let connection: Connection;

    const signUpDto = new SignUpDto();
    signUpDto.email          = 'email@email.com';
    signUpDto.password       = 'password';
    signUpDto.firstName      = 'firstName';
    signUpDto.lastName       = 'lastName';
    signUpDto.requestEditor  = true;

    const signInDto    = new SignInDto();
    signInDto.email    = signUpDto.email;
    signInDto.password = signUpDto.password;

    const createNewsDto   = new CreateNewsDto();
    createNewsDto.title   = 'title';
    createNewsDto.content = 'content';

    const paginationDto = new PaginationDto();
    paginationDto.take  = 5;
    paginationDto.page  = 1;

    beforeAll(async () => {
        app        = await createTestingModule();
        connection = app.get(Connection);
    });

    afterAll(async () => {
        await connection.synchronize(true);
        await connection.close();
    });

    it('defined', async () => {
        expect(app).toBeDefined();
    });

    describe('/auth', () => {
        describe('/sign-up', () => {
            describe('POST', () => {
                it('when data is valid, then user should be created', () => {
                    return request(app.getHttpServer())
                        .post('/auth/sign-up')
                        .send(signUpDto)
                        .expect(201)
                        .then((response) => {
                            expect(response.body.email).toEqual(signUpDto.email);
                            expect(response.body.token).toBeDefined();
                        });
                });

                it('when user is already exists, then error should be returned', () => {
                    return request(app.getHttpServer())
                        .post('/auth/sign-up')
                        .send(signUpDto)
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toEqual('User with given email already exists.');
                        });
                });
            });
        });

        describe('/sign-in', () => {
            describe('POST', () => {
                it('when data is valid and user exists, then user should be logged in', (done) => {
                    request(app.getHttpServer())
                        .post('/auth/sign-in')
                        .send(signInDto)
                        .expect(200)
                        .then((response) => {
                            expect(response.body.email).toEqual(signInDto.email);
                            expect(response.body.token).toBeDefined();
                            done();
                        })
                        .catch((err) => done(err));
                });

                it('when data is valid and user does not exist, then error should be returned', (done) => {
                    request(app.getHttpServer())
                        .post('/auth/sign-in')
                        .send({...signInDto, password: 'wrong password'})
                        .expect(400)
                        .then((response) => {
                            expect(response.body.message).toEqual('Invalid credentials.');
                            done();
                        })
                        .catch((err) => done(err));
                });
            });
        });
    });

    describe('/editor-requests', () => {
        const paginationDto = new PaginationDto();
        paginationDto.take  = 5;
        paginationDto.page  = 1;

        describe('POST', () => {
            it('when user it not authorized, error should be returned', () => {
                return request(app.getHttpServer())
                    .post('/editor-requests')
                    .send(paginationDto)
                    .expect(401);
            });

            it('when pagination data is valid, then editor requests should be returned', async () => {
                const token = await getToken();

                return request(app.getHttpServer())
                    .post('/editor-requests')
                    .set('authorization', `Bearer ${token}`)
                    .send(paginationDto)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.views).toEqual([
                            {id: 1, user: {email: signUpDto.email, firstName: signUpDto.firstName, id: 1, isAdmin: false, lastName: signUpDto.lastName}}
                        ]);
                    });
            });
        });
    });

    describe('/news', () => {
        describe('POST', () => {
            it('when user is not editor, error should be returned', async () => {
                const token = await getToken();

                return request(app.getHttpServer())
                    .post('/news')
                    .set('authorization', `Bearer ${token}`)
                    .send(createNewsDto)
                    .expect(403);
            });

            it('when user is editor and data is valid, news should be created', async () => {
                const token = await getToken();
                await connection
                    .getRepository(User)
                    .createQueryBuilder()
                    .update()
                    .set({isAdmin: true})
                    .where({email: signUpDto.email})
                    .execute();

                return request(app.getHttpServer())
                    .post('/news')
                    .set('authorization', `Bearer ${token}`)
                    .send(createNewsDto)
                    .expect(201)
                    .then((response) => {
                        expect(response.body.content).toEqual(createNewsDto.content);
                        expect(response.body.title).toEqual(createNewsDto.title);
                        expect(response.body.createdDate).toBeDefined();
                    });
            });
        });

        describe('GET:id', () => {
            it('when user tries to get existing news, news should be returned', async () => {
                const token = await getToken();

                return request(app.getHttpServer())
                    .get('/news/1')
                    .set('authorization', `Bearer ${token}`)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.content).toEqual(createNewsDto.content);
                        expect(response.body.title).toEqual(createNewsDto.title);
                    });
            });

            it('when user tries to get not existing news, error should be returned', async () => {
                const token = await getToken();

                return request(app.getHttpServer())
                    .get('/news/404')
                    .set('authorization', `Bearer ${token}`)
                    .expect(400)
                    .then((response) => {
                        expect(response.body.message).toEqual('News with requested id does not exist.');
                    });
            });

            it('when user it not authorized, error should be returned', () => {
                return request(app.getHttpServer())
                    .get('/news/1')
                    .expect(401);
            });
        });

        describe('POST /find', () => {
            it('when user it not authorized, error should be returned', () => {
                return request(app.getHttpServer())
                    .post('/news/find')
                    .send(paginationDto)
                    .expect(401);
            });

            it('when pagination data is valid, then news should be returned', async () => {
                const token = await getToken();

                return request(app.getHttpServer())
                    .post('/news/find')
                    .set('authorization', `Bearer ${token}`)
                    .send(paginationDto)
                    .expect(200)
                    .then((response) => {
                        expect(response.body.views).toEqual([
                            expect.objectContaining({content: createNewsDto.content, id: 1, title: createNewsDto.title})
                        ]);
                    });
            });
        })
    });

    describe('/users', () => {
        const updateEditorPermissionsDto   = new UpdateEditorPermissionsDto();
        updateEditorPermissionsDto.approve = true;

        describe('PATCH', () => {
            const newSignUnDto = {...signUpDto, email: 'new-email@gmail.com'};

            it('when user it not authorized, error should be returned', () => {
                return request(app.getHttpServer())
                    .patch('/users/2')
                    .send(updateEditorPermissionsDto)
                    .expect(401);
            });

            it('when user is not editor, error should be returned', async () => {
                await request(app.getHttpServer())
                    .post('/auth/sign-up')
                    .send(newSignUnDto);

                const token = await getToken(newSignUnDto);

                return request(app.getHttpServer())
                    .patch('/users/2')
                    .set('authorization', `Bearer ${token}`)
                    .send(updateEditorPermissionsDto)
                    .expect(403);
            });

            it('when user is editor and there is no such request, error should be returned', async () => {
                const token = await getToken();

                return request(app.getHttpServer())
                    .patch('/users/404')
                    .set('authorization', `Bearer ${token}`)
                    .send(updateEditorPermissionsDto)
                    .expect(400)
                    .then((response) => {
                        expect(response.body.message).toEqual('There is no request for given user.')
                    })
            });

            it('when user is editor and there is existing request and user attempts to approve, updated user view should be returned', async () => {
                const token = await getToken();

                return request(app.getHttpServer())
                    .patch('/users/2')
                    .set('authorization', `Bearer ${token}`)
                    .send(updateEditorPermissionsDto)
                    .expect(200)
                    .then((response) => {
                        expect(response.body).toEqual(
                            expect.objectContaining({isAdmin: true, id: 2, email: newSignUnDto.email})
                        )
                    });
            });

            it('when user is editor and there is existing request and user attempts to decline, not updated user view should be returned', async () => {
                const token = await getToken();

                const notApprovedUserSignUpDto = {...newSignUnDto, email: 'random-extranew@gmail.com'};

                await request(app.getHttpServer())
                    .post('/auth/sign-up')
                    .send(notApprovedUserSignUpDto);


                return request(app.getHttpServer())
                    .patch('/users/3')
                    .set('authorization', `Bearer ${token}`)
                    .send({...updateEditorPermissionsDto, approve: false})
                    .expect(200)
                    .then((response) => {
                        expect(response.body).toEqual(
                            expect.objectContaining({isAdmin: false, id: 3, email: notApprovedUserSignUpDto.email})
                        )
                    });
            });
        });
    });

    async function getToken(signInData = signInDto) {
        let token = null;
        await request(app.getHttpServer())
            .post('/auth/sign-in')
            .send(signInData)
            .then((response) => {
                token = response.body.token;
            });

        return token;
    }
});
