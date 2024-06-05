import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
export class GetOneArticleByIdService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>
    ) { }

    async getOneArticleById(id: number) {
        return await this.articleRepository.findOneBy({ id });
    }
}