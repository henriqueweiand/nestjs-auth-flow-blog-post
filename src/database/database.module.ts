import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'project',
            entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
            migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
            synchronize: false,
            migrationsRun: true,
            logging: true,
        }),
    ],
})
export class DatabaseModule { }
