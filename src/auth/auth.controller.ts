import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async loginUser(@Res({ passthrough: true }) res: Response, @Body() data: LoginRequest) {
    return await this.authService.login(res, data);
  }

  @Post('sign-up')
  async registerUser(@Res({ passthrough: true }) res: Response, @Body() data: RegisterRequest) {
    return await this.authService.register(data);
  }
}
