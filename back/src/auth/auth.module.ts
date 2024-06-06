import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';
import { AuthService } from './use-case/auth-signin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { UsersService } from 'src/user/use-case/get-all-users.service';
import { PasswordHasherService } from 'src/user/utils/password-hasher.service';

@Module({
    imports: [
        // UserModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '600s' },
        }),
    ],
    providers: [AuthService, UsersService, PasswordHasherService],
    controllers: [AuthController],
})
export class AuthModule { }