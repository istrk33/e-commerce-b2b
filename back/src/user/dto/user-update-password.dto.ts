import { MinLength } from 'class-validator';

export class PasswordUpdateDto {
  @MinLength(8, {
    message: 'Le nouveau mot de passe est trop court !',
  })
  password: string;
}
