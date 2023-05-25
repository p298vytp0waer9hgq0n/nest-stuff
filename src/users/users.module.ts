import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [WinstonModule, TypeOrmModule.forFeature([User, Profile, Role])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
