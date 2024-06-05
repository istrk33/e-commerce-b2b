import { Repository } from 'typeorm';
import { Article } from '../entity/article.entity';
import { InjectRepository } from '@nestjs/typeorm';
export class GetAllArticlesService {
    constructor(
        @InjectRepository(Article)
        private readonly articleRepository: Repository<Article>
    ) { }

    async getAllarticles() {
        return await this.articleRepository.find();
    }
}