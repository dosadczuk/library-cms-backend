import { Author } from '@/modules/books/entities';
import { AuthorsFilter } from '@/modules/books/filters';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  findAllWith(filter: AuthorsFilter): Promise<Author[]> {
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
