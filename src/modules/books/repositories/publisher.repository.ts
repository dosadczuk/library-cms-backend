import { Publisher } from '@/modules/books/entities/publisher.entity';
import { EntityRepository, ILike, Repository } from 'typeorm';

@EntityRepository(Publisher)
export class PublisherRepository extends Repository<Publisher> {
  findByName(name: string): Promise<Publisher | null> {
    return this.findOne({
      where: {
        name: ILike(name),
      },
    });
  }
}
