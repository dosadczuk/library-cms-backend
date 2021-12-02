import { Tag } from '@/modules/books/entities';
import { TagsFilter } from '@/modules/books/filters';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  findAllWith(filter: TagsFilter): Promise<Tag[]> {
    const query = this.tagRepository.createQueryBuilder();

    if (filter.value != null) {
      query.andWhere({ value: ILike(`%${filter.value}%`) });
    }

    return query.getMany();
  }
}
