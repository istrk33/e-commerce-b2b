import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
// import { ArticleService } from '../use-case/article.service.ts';
import { ArticleCreateDto } from '../dto/article-create.dto';
import { ArticleUpdateDto } from '../dto/article-update.dto';
import { CreateArticleService } from '../use-case/create-article.service';
import { DeleteArticleService } from '../use-case/delete-article.service';
import { GetAllArticlesByAuthorService } from '../use-case/get-all-articles-by-author.service';
import { GetAllArticlesService } from '../use-case/get-all-articles.service';
import { GetOneArticleByIdService } from '../use-case/get-one-article-by-id.service';
import { UpdateArticleService } from '../use-case/update-article.service';

// @Controller('articles')
// est un décorateur qui permet de déclarer un controller
// donc une classe qui va contenir des routes (url accessible)
@Controller('articles')
export class ArticleController {
  // injection de dépendance
  // permet d'instancier la classe ArticleService
  // dans la propriété articleService
  constructor(
    private readonly createArticleService: CreateArticleService,
    private readonly deleteArticleService: DeleteArticleService,
    private readonly getAllArticlesByAuthorService: GetAllArticlesByAuthorService,
    private readonly getAllArticlesService: GetAllArticlesService,
    private readonly getOneArticleByIdService: GetOneArticleByIdService,
    private readonly updateArticleService: UpdateArticleService,
  ) { }

  // @Get() est un décorateur qui permet de déclarer
  // une route accessible avec la méthode GET sur "/articles/author/nom auteur"
  @Get('author/:author')
  getAllArticlesByAuthor(@Param('author') author: string) {
    return this.getAllArticlesByAuthorService.getAllArticlesByAuthor(author);
  }

  // @Get() est un décorateur qui permet de déclarer
  // une route accessible avec la méthode GET
  @Get()
  getAllArticles() {
    return this.getAllArticlesService.getAllarticles();
  }

  // on peut passer en parametre du décorateur
  // un segment d'url avec éventuellement des paramètres
  // on peut ensuite récupérer sa valeur avec le décorateur @Param
  @Get(':id')
  getOneArticleById(@Param('id', ParseIntPipe) id: number) {
    return this.getOneArticleByIdService.getOneArticleById(id);
  }

  @Post()
  // on utilise le décorateur @Body pour récupérer
  // les données du body de la requête
  // on valide les données du body de la requête
  // avec un DTO (Data Transfer Object)
  createArticle(@Body() data: ArticleCreateDto) {
    return this.createArticleService.createArticle(data);
  }

  @Put(':id')
  updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: ArticleUpdateDto,
  ) {
    return this.updateArticleService.updateArticle(id, data);
  }

  @Delete(':id')
  deleteArticle(@Param('id', ParseIntPipe) id: number) {
    return this.deleteArticleService.deleteArticle(id);
  }
}
