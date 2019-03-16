import { HttpContextInterface } from '@priestine/routing';
import { transformCase, transformKeys } from '../../utils';
import { RequestBodyAware } from './extract-json-request-body';

/**
 * Transform keys of response object to given case.
 */
export const TransformRequestObjectKeys = (transformer: (x: string) => string) => ({
  intermediate,
}: HttpContextInterface<RequestBodyAware>) => ({
  ...intermediate,
  requestBody: transformKeys(transformer, intermediate.requestBody),
});

/**
 * Transform response body keys from camel case to snake case.
 */
export const TransformRequestObjectKeysFromCamelToSnake = TransformRequestObjectKeys(
  (x) => transformCase(x).from.camel.to.snake as any
);

/**
 * Transform response body keys from snake case to camel case.
 */
export const TransformRequestObjectKeysFromSnakeToCamel = TransformRequestObjectKeys(
  (x) => transformCase(x).from.snake.to.camel as any
);
