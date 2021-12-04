import { FindAuthorsFilterDto } from '@/modules/books/dto/find-authors-filter.dto';
import { Author } from '@/modules/books/entities/author.entity';
import { Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

@Injectable()
export class AuthorRepository {
  /**
   * Pobiera wszystkich autorów na podstawie podanego filtra.
   */
  async findAll(filter?: FindAuthorsFilterDto): Promise<Author[]> {
    const query = Author.createQueryBuilder();

    if (filter != null) {
      if (filter.firstName != null) {
        query.andWhere({ firstName: ILike(`%${filter.firstName}%`) });
      }

      if (filter.lastName != null) {
        query.andWhere({ lastName: ILike(`%${filter.lastName}%`) });
      }
    }

    return query.getMany();
  }

  /**
   * Pobiera autora na podstawie podanego imienia i nazwiska.
   */
  async findByNames(firstName: string, lastName: string): Promise<Author> {
    return Author.findOne({
      where: {
        firstName: ILike(firstName),
        lastName: ILike(lastName),
      },
    });
  }
}
