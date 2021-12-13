import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from '@/modules/auth/dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CheckCredentialsDto } from '../auth/dto/check-credentails.dto';
import { Equal, ILike, In, Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';

const saltOrRounds = process.env.SALT_OR_ROUNDS;

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    let user: User = await this.findOneByEmail(dto.email);
    if (user != null) {
      throw new Error("User with login ${dto.email} already exists!");
    }

    user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    // user.password = await bcrypt.hash(dto.password, saltOrRounds);
    user.password = dto.password;
    user.email = dto.email;
    user.role = dto.role;
    return this.usersRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    let user: User = await this.usersRepository.findOne(id);
    if (user == null) {
      throw new Error("No user with ID ${id}!");
    }

    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    // user.password = await bcrypt.hash(dto.password, saltOrRounds);
    user.password = dto.password;
    user.email = dto.email;
    user.role = dto.role;
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({email: Equal(email)});
  }
  
}
