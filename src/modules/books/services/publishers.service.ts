import { PublishersFilter } from '@/modules/books/filters/publishers.filter';
import { PublisherRepository } from '@/modules/books/repositories/publisher.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';

export class PublishersService {
  constructor(
    @InjectRepository(PublisherRepository)
    private readonly publisherRepository: PublisherRepository,
  ) {}

  findAll(filter: PublishersFilter): any {
    const query = this.publisherRepository.createQueryBuilder();

    if (filter.name != null) {
      query.andWhere({ name: ILike(`%${filter.name}%`) });
    }

    return query.getMany();
  }
}
