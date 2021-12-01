import { Tag } from '@/modules/books/entities/tag.entity';
import { TagsFilter } from '@/modules/books/filters/tags.filter';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: Repository<Tag>,
  ) {}

  findAll(filter: TagsFilter) {
    const query = this.tagsRepository.createQueryBuilder();

    if (filter.value != null) {
      query.andWhere({ value: ILike(`%${filter.value}%`) });
    }

    return query.getMany();
  }
}
