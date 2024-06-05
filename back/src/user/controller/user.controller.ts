import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateUserService } from "../use-case/create-user.service";
import { UserUpdateDto } from "../dto/user-update.dto";
import { UserCreateDto } from "../dto/user-create.dto";
import { UsersService } from "../use-case/get-all-users.service";
import { User } from "../entity/user.entity";
import { GetUserByIdService } from "../use-case/get-user-by-id.service";
import { GetUsersByCityService } from "../use-case/get-users-by-city.service";
import { UpdateUserService } from "../use-case/update-user.service";
import { UpdateUserPasswordService } from "../use-case/update-user-password.service";
import { PasswordUpdateDto } from "../dto/user-update-password.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserService: CreateUserService,
        private readonly getAllUsersService: UsersService,
        private readonly getUserByIdService: GetUserByIdService,
        private readonly getUsersByCityService: GetUsersByCityService,
        private readonly updateUserService: UpdateUserService,
        private readonly updateUserPassword: UpdateUserPasswordService,
    ) { }

    @Get()
    getAllUsers() {
        return this.getAllUsersService.getAllUsers();
    }

    @Get('/:id')
    async getUserById(@Param('id') id: number): Promise<User> {
        return await this.getUserByIdService.getUserById(id);
    }

    @Get('/by-city/:city')
    async getUsersByCity(@Param('city') city: string): Promise<User[]> {
        return await this.getUsersByCityService.getUsersByCity(city);
    }

    @Post()
    createUser(@Body() data: UserCreateDto) {
        return this.createUserService.createUser(data);
    }

    @Patch('/:id/update')
    async updateUser(
        @Param('id') id: number,
        @Body() updateUserDto: UserUpdateDto,
    ): Promise<User> {
        return this.updateUserService.updateUser(id, updateUserDto);
    }

    @Patch('/:id/update-pwd')
    async updatePassword(
        @Param('id') id: number,
        @Body() passwordDto: PasswordUpdateDto,
    ): Promise<User> {
        return this.updateUserPassword.updateUserPassword(id, passwordDto);
    }
}