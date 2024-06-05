import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { ArticleController } from './controller/article.controller';
import { GetAllArticlesService } from './use-case/get-all-articles.service';
import { CreateArticleService } from './use-case/create-article.service';
import { DeleteArticleService } from './use-case/delete-article.service';
import { GetAllArticlesByAuthorService } from './use-case/get-all-articles-by-author.service';
import { GetOneArticleByIdService } from './use-case/get-one-article-by-id.service';
import { UpdateArticleService } from './use-case/update-article.service';
// import { ArticleService } from './use-case/article.service.ts.old';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [
    GetAllArticlesService,
    CreateArticleService,
    DeleteArticleService,
    GetAllArticlesByAuthorService,
    GetOneArticleByIdService,
    UpdateArticleService,
  ],
})
export class ArticleModule { }
