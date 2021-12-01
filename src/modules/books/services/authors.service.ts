import { Author } from '@/modules/books/entities/author.entity';
import { AuthorsFilter } from '@/modules/books/filters/authors.filter';
import { AuthorRepository } from '@/modules/books/repositories/author.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';

export class AuthorsService {
  constructor(
    @InjectRepository(AuthorRepository)
    private readonly authorRepository: AuthorRepository,
  ) {}

  findAll(filter: AuthorsFilter): Promise<Author[]> {
    const query = this.authorRepository.createQueryBuilder();

    if (filter.firstName != null) {
      query.andWhere({ firstName: ILike(`%${filter.firstName}%`) });
    }

    if (filter.lastName != null) {
      query.andWhere({ lastName: ILike(`%${filter.lastName}%`) });
    }

    return query.getMany();
  }
}
