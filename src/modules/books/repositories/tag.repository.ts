import { Tag } from '@/modules/books/entities/tag.entity';
import { EntityRepository, ILike, Repository } from 'typeorm';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  findByValue(value: string) {
    return this.findOne({
      where: {
        value: ILike(value),
      },
    });
  }
}
