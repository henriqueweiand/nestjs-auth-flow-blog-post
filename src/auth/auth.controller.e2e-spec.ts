import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../app.module';
import { Repository } from 'typeorm';
import { Users } from '../users/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
    let app: any;
    let httpServer: any;
    let repository: Repository<Users>;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
        httpServer = app.getHttpServer();
        repository = module.get<Repository<Users>>(getRepositoryToken(Users));
    });

    afterAll(async () => {
        await app.close();
    });

    afterEach(async () => {
        await repository.delete({});
    });

    describe('SingIn', () => {
        it('should create a user', async () => {
            const createUserRequest: { username: string; password: string } = {
                username: 'user',
                password: 'password',
            };
            const response = await request(httpServer)
                .post('/auth/signUp')
                .send(createUserRequest);

            expect(response.status).toBe(HttpStatus.OK);
            expect(response.body).toHaveProperty(
                'username',
                createUserRequest.username,
            );
            expect(response.body).toHaveProperty('id');

            const user = await repository.findOne({
                where: {
                    username: createUserRequest.username,
                },
            });
            expect(user).toMatchObject({
                username: createUserRequest.username,
            });
        });
    });

    describe('signUp', () => {
        it('should create the JWT', async () => {
            const createUserRequest = {
                username: 'user',
                password: 'password',
            };
            const newUser = repository.create(createUserRequest);
            await repository.save(newUser);

            const signInRequest = {
                username: 'user',
                password: 'password',
            };
            const signInResponse = await request(httpServer)
                .post('/auth/signIn')
                .send(signInRequest);

            expect(signInResponse.status).toBe(HttpStatus.OK);
            expect(signInResponse.body).toHaveProperty('access_token');
        });
    });
});
