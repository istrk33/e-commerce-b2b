import { MinLength } from 'class-validator';

export class ArticleCreateDto {
  @MinLength(3, {
    message: 'Le titre doit contenir au moins 3 caractères',
  })
  title: string;

  // on verifie que content mesure au moins 3 char dans le validateur
  @MinLength(10, {
    message: 'Le content doit contenir au moins 10  caractères',
  })
  content: string;
  
  // on verifie que author mesure au moins 3 char dans le validateur
  @MinLength(3, {
    message: 'Le author doit contenir au moins 3 caractères',
  })
  author: string;
}
