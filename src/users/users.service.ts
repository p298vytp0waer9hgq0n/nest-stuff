import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private dataSource: DataSource,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const profile = new Profile();
    profile.age = createUserDto.age;
    await this.profileRepository.save(profile);
    const user = new User();
    user.profile = profile;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    const role = await this.roleRepository.find();
    console.log('console', role);
    user.role = await this.roleRepository.findOne({ where: { name: 'user' } });
    user.isActive = false;
    await queryRunner.release();
    return this.userRepository.insert(user);
  }

  async findAll() {
    try {
      const role = await this.roleRepository.find();
      console.log('console', role);
      return this.userRepository.find();
    } catch {
      return false;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
