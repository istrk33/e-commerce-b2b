import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/use-case/get-all-users.service';
import { AuthDto } from '../dto/create-auth.dto';
import { PasswordHasherService } from 'src/user/utils/password-hasher.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private passwordHasher: PasswordHasherService
  ) { }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    console.error(user?.password)
    // console.error(await this.passwordHasher.checkPassword(pass))
    const isEqualHash = await this.passwordHasher.checkPassword(pass, user?.password)
    if (!isEqualHash) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}