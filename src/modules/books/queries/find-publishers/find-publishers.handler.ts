import { FindPublishersResultDto } from '@/modules/books/dto/find-publishers-filter.dto';
import { Publisher } from '@/modules/books/entities/publisher.entity';
import { FindPublishersQuery } from '@/modules/books/queries/find-publishers/find-publishers.query';
import { FindPublishersResult } from '@/modules/books/queries/find-publishers/find-publishers.result';
import { PublisherRepository } from '@/modules/books/repositories/publisher.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindPublishersQuery)
export class FindPublishersHandler
  implements IQueryHandler<FindPublishersQuery, FindPublishersResult>
{
  constructor(private readonly publisherRepository: PublisherRepository) {}

  async execute(query: FindPublishersQuery): Promise<FindPublishersResult> {
    const publishers = await this.findPublishers(query);

    const result = new FindPublishersResultDto();
    result.publishers = publishers;

    return new FindPublishersResult(result);
  }

  private async findPublishers(
    query: FindPublishersQuery,
  ): Promise<Publisher[]> {
    return this.publisherRepository.findAll(query.filter);
  }
}
