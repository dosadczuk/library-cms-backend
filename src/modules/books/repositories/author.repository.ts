import { Author } from '@/modules/books/entities/author.entity';
import { EntityRepository, ILike, Repository } from 'typeorm';

@EntityRepository(Author)
export class AuthorRepository extends Repository<Author> {
  findByNames(firstName: string, lastName: string): Promise<Author | null> {
    return this.findOne({
      where: {
        firstName: ILike(firstName),
        lastName: ILike(lastName),
      },
    });
  }
}
