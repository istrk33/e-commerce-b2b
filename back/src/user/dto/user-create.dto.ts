import { MinLength } from 'class-validator';

export class UserCreateDto {
  @MinLength(3, {
    message: 'Le username doit contenir au moins 3 caractères',
  })
  username: string;

  // on verifie que content mesure au moins 3 char dans le validateur
  @MinLength(10, {
    message: 'Le password doit contenir au moins 10  caractères',
  })
  password: string;

  // on verifie que author mesure au moins 3 char dans le validateur
  @MinLength(3, {
    message: 'Le name doit contenir au moins 3 caractères',
  })
  name: string;
  birth_city: string;
  birth_date: Date;
}
