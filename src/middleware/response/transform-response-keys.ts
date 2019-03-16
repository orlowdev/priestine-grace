import { HttpContextInterface } from '@priestine/routing';
import { transformCase, transformKeys } from '../../utils';
import { ResponseBodyAware } from '../../pipelines';

/**
 * Transform keys of response object to given case.
 */
export const TransformResponseObjectKeys = (transformer: (x: string) => string) => ({
  intermediate,
}: HttpContextInterface<ResponseBodyAware>) => ({
  ...intermediate,
  responseBody: transformKeys(transformer, intermediate.responseBody),
});

/**
 * Transform response body keys from camel case to snake case.
 */
export const TransformResponseObjectKeysFromCamelToSnake = TransformResponseObjectKeys(
  (x) => transformCase(x).from.camel.to.snake as any
);

/**
 * Transform response body keys from snake case to camel case.
 */
export const TransformResponseObjectKeysFromSnakeToCamel = TransformResponseObjectKeys(
  (x) => transformCase(x).from.snake.to.camel as any
);
