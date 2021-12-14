import { FindPublishersResultDto } from '@/modules/books/dto';
import { FindPublishersQuery } from '@/modules/books/queries/find-publishers/find-publishers.query';
import { FindPublishersResult } from '@/modules/books/queries/find-publishers/find-publishers.result';
import { PublisherRepository } from '@/modules/books/repositories';
import { PublisherViewModel } from '@/modules/books/vms';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindPublishersQuery)
export class FindPublishersHandler
  implements IQueryHandler<FindPublishersQuery, FindPublishersResult>
{
  constructor(private readonly publisherRepository: PublisherRepository) {}

  async execute(query: FindPublishersQuery): Promise<FindPublishersResult> {
    const publishers = await this.findPublishers(query);

    const result = new FindPublishersResultDto(publishers);

    return new FindPublishersResult(result);
  }

  private async findPublishers(query: FindPublishersQuery): Promise<PublisherViewModel[]> {
    const publishers = await this.publisherRepository.findAll(query.filter);

    return publishers.map((it) => new PublisherViewModel(it));
  }
}
