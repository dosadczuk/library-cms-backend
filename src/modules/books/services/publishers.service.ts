import { Publisher } from '@/modules/books/entities/publisher.entity';
import { PublishersFilter } from '@/modules/books/filters/publishers.filter';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publishersRepository: Repository<Publisher>,
  ) {}

  public findAll(filter: PublishersFilter): any {
    const query = this.publishersRepository.createQueryBuilder();

    if (filter.name != null) {
      query.andWhere({ name: ILike(`%${filter.name}%`) });
    }

    return query.getMany();
  }
}
