import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
export class GetAllArticlesByAuthorService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>
    ) { }

    async getAllArticlesByAuthor(author: string) {
        return await this.articleRepository.find({ where: { author: author } });
    }
}