import { FindPublishersFilterDto } from '@/modules/books/dto/find-publishers.dto';
import { Publisher } from '@/modules/books/entities/publisher.entity';
import { Injectable } from '@nestjs/common';
import { ILike } from 'typeorm';

@Injectable()
export class PublisherRepository {
  /**
   * Pobiera wszystkich wydawców na podstawie podanego filtra.
   */
  async findAll(filter?: FindPublishersFilterDto): Promise<Publisher[]> {
    const query = Publisher.createQueryBuilder();

    if (filter != null) {
      if (filter.name != null) {
        query.andWhere({ name: ILike(`%${filter.name}%`) });
      }
    }

    return query.getMany();
  }

  /**
   * Pobiera wydawcę na podstawie podanej nazwy.
   */
  async findByName(name: string): Promise<Publisher> {
    return Publisher.findOne({ where: { name: ILike(name) } });
  }
}
