import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestException } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (user == null) {
      throw new BadRequestException('Wrong username or password!');
    }
    const { password, ...result } = user;
    // let isValid: Boolean = await bcrypt.compare(pass, password)
    const isValid: boolean = pass == password;
    if (isValid == false) {
      throw new BadRequestException('Wrong username or password!');
    }
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
