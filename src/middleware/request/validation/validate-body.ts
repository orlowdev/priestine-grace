import { HttpContextInterface } from '@priestine/routing';
import { RequestBodyAware } from '../extract-json-request-body';
import { BadRequestError, HttpError } from '../../../errors';

/**
 * @interface ValidateBodyOpts
 */
export interface ValidateBodyOpts<T, K extends keyof T = keyof T> {
  /**
   * requestBody key to be referenced for validating its value.
   */
  key: K;
  /**
   * Array of validators to be applied to the value.
   */
  validators: Array<(value: T[K]) => boolean>;
  /**
   * Custom error to be thrown.
   * @default BadRequestError
   */
  error?: HttpError;
}

/**
 * Validate request body residing in `intermediate.requestBody` property with given set of validators.
 */
export const ValidateObjectBodyProp = <T, K extends keyof T = keyof T>(opts: ValidateBodyOpts<T, K>) => ({
  intermediate,
}: HttpContextInterface<RequestBodyAware<T>>) => {
  if (!opts.validators.reduce((result, validate) => result && validate(intermediate.requestBody[opts.key]), true)) {
    throw opts.error ? opts.error : BadRequestError.withMessage('bad request');
  }
};

/**
 * Validate request body array residing in `intermediate.requestBody` property applying given set of validators to the
 * property of each object in the array.
 */
export const ValidateArrayBodyProp = <T, A extends T[] = T[], K extends keyof T = keyof T>(
  opts: ValidateBodyOpts<T, K>
) => ({ intermediate }: HttpContextInterface<RequestBodyAware<A>>) => {
  if (
    !opts.validators.reduce(
      (result, validate) => result && intermediate.requestBody.reduce((p, i) => p && validate(i[opts.key]), true),
      true
    )
  ) {
    throw opts.error ? opts.error : BadRequestError.withMessage('bad request');
  }
};

/**
 * Validate request body residing in `intermediate.requestBody`, automatically detecting
 * whether it is an array or not. Only use it for objects or arrays.
 * @param opts
 * @constructor
 */
export const ValidateBodyProp = <T, K extends keyof T = keyof T>(opts: ValidateBodyOpts<T, K>) => (
  ctx: HttpContextInterface<RequestBodyAware<T>>
) => {
  return Array.isArray(ctx.intermediate.requestBody)
    ? ValidateArrayBodyProp<T, T[], K>(opts)(ctx as any)
    : ValidateObjectBodyProp<T, K>(opts)(ctx);
};
