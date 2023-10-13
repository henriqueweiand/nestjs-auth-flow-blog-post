import { Test } from '@nestjs/testing';
// import * as request from 'supertest';
import { AppModule } from '../app.module';
import { Repository } from 'typeorm';
import { Users } from '../users/users.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthController', () => {
    let app: any;
    let repository: Repository<Users>;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();
        repository = module.get<Repository<Users>>(getRepositoryToken(Users));
    });

    afterAll(async () => {
        await app.close();
    });

    afterEach(async () => {
        await repository.delete({});
    });

    it('should be pass', async () => {
        expect(true).toBe(true);
    });
});
