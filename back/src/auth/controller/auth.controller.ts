import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../use-case/auth-signin.service';
import { AuthDto } from '../dto/create-auth.dto';
import { AuthGuard } from '../auth.guard';
import { UserCreateDto } from 'src/user/dto/user-create.dto';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('login')
  createAuth(@Body() data: AuthDto) {
    return this.authService.signIn(data.username, data.password);
  }

  @Post('register')
  async register(@Body() user: UserCreateDto) {
    return this.authService.register(user.password, user.username);
  }


  @UseGuards(AuthGuard)
  @Post('protected')
  getProfile(@Request() req) {
    return req.user;
  }
}
