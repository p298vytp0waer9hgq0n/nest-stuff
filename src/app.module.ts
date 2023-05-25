import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import * as winston from 'winston';

import configuration from './config/configuration';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Role } from './users/entities/role.entity';
import { Profile } from './users/entities/profile.entity';
import { WinstonModule } from 'nest-winston';

const vSchema = Joi.object({
  port: Joi.number().integer().default(3000).required(),
  database: Joi.object({
    host: Joi.string(),
    port: Joi.number().integer().default(5432),
    name: Joi.string(),
    schema: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }).required(),
});

@Module({
  imports: [
    WinstonModule.forRoot({
      levels: {
        critical_error: 0,
        error: 1,
        special_warning: 2,
        another_log_level: 3,
        info: 4,
      },
      transports: [
        new winston.transports.Console({ format: winston.format.simple() }),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
      ],
    }),
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: vSchema,
    }),
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        database: configService.get('database.name'),
        schema: configService.get('database.schema'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        entities: [User, Role, Profile],
        // synchronize: true,
      }),
      // type: 'postgres',
      // host: 'localhost',
      // port: 5432,
      // username: 'student',
      // password: 'student',
      // database: 'nest_project',
      // schema: 'nest_project',
      // entities: [User, Role, Profile],
      // synchronize: true,
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
