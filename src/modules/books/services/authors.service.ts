import { Author } from '@/modules/books/entities/author.entity';
import { AuthorsFilter } from '@/modules/books/filters/authors.filter';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  public findAll(filter: AuthorsFilter): Promise<Author[]> {
    const query = this.authorsRepository.createQueryBuilder();

    if (filter.firstName != null) {
      query.andWhere({ firstName: ILike(`%${filter.firstName}%`) });
    }

    if (filter.lastName != null) {
      query.andWhere({ lastName: ILike(`%${filter.lastName}%`) });
    }

    return query.getMany();
  }
}
