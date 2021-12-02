import { Publisher } from '@/modules/books/entities';
import { PublishersFilter } from '@/modules/books/filters';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  findAllWith(filter: PublishersFilter): Promise<Publisher[]> {
    const query = this.publisherRepository.createQueryBuilder();

    if (filter.name != null) {
      query.andWhere({ name: ILike(`%${filter.name}%`) });
    }

    return query.getMany();
  }
}
