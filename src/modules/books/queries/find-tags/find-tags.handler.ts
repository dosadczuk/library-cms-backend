import { FindTagsResultDto } from '@/modules/books/dto/find-tags-filter.dto';
import { Tag } from '@/modules/books/entities/tag.entity';
import { FindTagsQuery } from '@/modules/books/queries/find-tags/find-tags.query';
import { FindTagsResult } from '@/modules/books/queries/find-tags/find-tags.result';
import { TagRepository } from '@/modules/books/repositories/tag.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindTagsQuery)
export class FindTagsHandler
  implements IQueryHandler<FindTagsQuery, FindTagsResult>
{
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(query: FindTagsQuery): Promise<FindTagsResult> {
    const tags = await this.findTags(query);

    const result = new FindTagsResultDto();
    result.tags = tags;

    return new FindTagsResult(result);
  }

  private findTags(query: FindTagsQuery): Promise<Tag[]> {
    return this.tagRepository.findAll(query.filter);
  }
}
