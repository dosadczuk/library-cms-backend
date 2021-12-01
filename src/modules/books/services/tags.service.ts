import { TagsFilter } from '@/modules/books/filters/tags.filter';
import { TagRepository } from '@/modules/books/repositories/tag.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike } from 'typeorm';

export class TagsService {
  constructor(
    @InjectRepository(TagRepository)
    private readonly tagRepository: TagRepository,
  ) {}

  findAll(filter: TagsFilter) {
    const query = this.tagRepository.createQueryBuilder();

    if (filter.value != null) {
      query.andWhere({ value: ILike(`%${filter.value}%`) });
    }

    return query.getMany();
  }
}
