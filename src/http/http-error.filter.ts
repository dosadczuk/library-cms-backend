import { isArray, isJson, isString } from '@/utils/asserts';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { I18nService } from 'nestjs-i18n';

@Catch(HttpException)
export class HttpErrorFilter implements ExceptionFilter<HttpException> {
  constructor(private readonly i18n: I18nService) {}

  async catch(ex: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const { message } = ex.getResponse() as Record<string, unknown>;
    if (message == null) {
      return res.status(ex.getStatus()).json(ex);
    }

    const result = await this.tryTranslatingMessage(message);

    return res.status(ex.getStatus()).json({ message: result });
  }

  private async tryTranslatingMessage(message: unknown) {
    if (isArray(message)) {
      const result = [];
      for (const value of message) {
        result.push(await this.translateMessage(value));
      }

      return result;
    }

    return await this.translateMessage(message);
  }

  private async translateMessage<T>(message: T): Promise<T | string> {
    if (!isString(message) || !isJson(message)) {
      return message;
    }

    const { key, args = {} } = JSON.parse(message);
    if (key == null) {
      return message;
    }

    return await this.i18n.translate(key, { args });
  }
}
