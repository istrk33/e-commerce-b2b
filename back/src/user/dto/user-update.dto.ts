import { MinLength } from 'class-validator';

export class UserUpdateDto {
  username: string;
  name: string;
  birth_city: string;
  birth_date: Date;
}
