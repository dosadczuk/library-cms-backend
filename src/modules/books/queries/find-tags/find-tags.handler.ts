import { FindTagsResultDto } from '@/modules/books/dto/find-tags.dto';
import { FindTagsQuery } from '@/modules/books/queries/find-tags/find-tags.query';
import { FindTagsResult } from '@/modules/books/queries/find-tags/find-tags.result';
import { TagRepository } from '@/modules/books/repositories/tag.repository';
import { TagViewModel } from '@/modules/books/vms/tag.vm';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(FindTagsQuery)
export class FindTagsHandler
  implements IQueryHandler<FindTagsQuery, FindTagsResult>
{
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(query: FindTagsQuery): Promise<FindTagsResult> {
    const tags = await this.findTags(query);

    const result = new FindTagsResultDto(tags);

    return new FindTagsResult(result);
  }

  private async findTags(query: FindTagsQuery): Promise<TagViewModel[]> {
    const tags = await this.tagRepository.findAll(query.filter);

    return tags.map((it) => new TagViewModel(it));
  }
}
