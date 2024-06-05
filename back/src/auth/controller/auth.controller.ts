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
import { AuthService } from '../use-case/auth.service';
import { AuthDto } from '../dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('login')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post()
  createAuth(@Body() data: AuthDto) {
    return this.authService.signIn(data.username, data.password);
  }
}
