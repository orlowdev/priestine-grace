import { HttpContextInterface, HttpError } from '@priestine/routing';
import { map } from 'event-stream';
import JSONStream = require('JSONStream');
import { BadRequestError } from '../../errors/4xx';

/**
 * @interface IRequestBodyAware
 */
export interface RequestBodyAware<T = {}> {
  /**
   * Request body object.
   */
  requestBody: T;
}

/**
 * Extract body of IncomingMessage and put it to `intermediate.requestBody`.
 */
export const ExtractJSONRequestBody = (parserTimeout: number) => (
  ctx: HttpContextInterface<RequestBodyAware>
): Promise<RequestBodyAware<any>> => {
  const handler = (reject) => (e: Error) => reject(BadRequestError.withMessage(e ? e.message : undefined));

  return new Promise<RequestBodyAware>((resolve, reject) => {
    const errorHandler = handler(reject);

    ctx.request
      .setTimeout(parserTimeout, () => {})
      .on('error', errorHandler)
      .pipe(JSONStream.parse())
      .on('error', errorHandler)
      .pipe(
        (map((data: any) => {
          ctx.intermediate.requestBody = data;
          resolve(ctx.intermediate);
        }) as any).on('error', errorHandler)
      );
  });
};
