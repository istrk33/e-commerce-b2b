import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
export class DeleteArticleService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>
    ) { }

    async deleteArticle(id: number) {
        return await this.articleRepository.delete(id);
    }
}