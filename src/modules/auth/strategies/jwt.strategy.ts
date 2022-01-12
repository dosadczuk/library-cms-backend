import { JwtPayload } from '@/modules/auth/types';
import { UserRepository } from '@/modules/users/repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { use } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly repository: UserRepository;
  constructor(config: ConfigService, repository: UserRepository) {
    const jwt: JwtModuleOptions = config.get('jwt');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwt.secret,
      ignoreExpiration: false,
    });
    this.repository = repository;
  }

  async validate(payload: JwtPayload) {
    const user = await this.repository.findOne(payload.sub);
    if (user == null) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
