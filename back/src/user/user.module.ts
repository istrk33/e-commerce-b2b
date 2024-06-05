import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { UsersService } from './use-case/get-all-users.service';
import { CreateUserService } from './use-case/create-user.service';
import { PasswordHasherService } from './utils/password-hasher.service';
import { PasswordHasherServiceInterface } from './utils/password-hasher.service.interface';
import { GetUserByIdService } from './use-case/get-user-by-id.service';
import { GetUsersByCityService } from './use-case/get-users-by-city.service';
import { UpdateUserService } from './use-case/update-user.service';
import { UpdateUserPasswordService } from './use-case/update-user-password.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UsersService,
    CreateUserService,
    GetUserByIdService,
    GetUsersByCityService,
    PasswordHasherService,
    UpdateUserService,
    UpdateUserPasswordService,
    // {
    //   provide: CreateUserService,
    //   useFactory: (passwordHasherService: PasswordHasherServiceInterface) => {
    //     return new CreateUserService(passwordHasherService);
    //   },
    //   inject: [PasswordHasherService],
    // },
  ],
})
export class UserModule { }
