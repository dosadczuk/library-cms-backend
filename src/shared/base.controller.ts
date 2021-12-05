import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';

export abstract class BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  protected async executeCommand<TResult>(c: ICommand): Promise<TResult> {
    return this.commandBus.execute<ICommand, TResult>(c);
  }

  protected async executeQuery<TResult>(q: IQuery): Promise<TResult> {
    return this.queryBus.execute<IQuery, TResult>(q);
  }
}
