import { HttpContextInterface } from "@priestine/routing";
import { RequestBodyAware } from "../extract-json-request-body";
import { BadRequestError } from "../../../errors";

/**
 * Validate request body residing in `intermediate.requestBody` property with given set of validators.
 */
export const ValidateObjectBodyProp = <T, K extends keyof T = keyof T>(opts: {
  key: K,
  message?: string,
  validators: Array<(value: T[K]) => boolean>
}) => ({ intermediate }: HttpContextInterface<RequestBodyAware<T>>) => {
  if (!opts.validators.reduce((result, validate) => result && validate(intermediate.requestBody[opts.key]), true)) {
    throw BadRequestError.withMessage(opts.message || 'bad request');
  }
};

/**
 * Validate request body array residing in `intermediate.requestBody` property applying given set of validators to the
 * property of each object in the array.
 */
export const ValidateArrayBodyProp = <T, A extends T[] = T[], K extends keyof T = keyof T>(opts: {
  key: K,
  message?: string,
  validators: Array<(value: T[K]) => boolean>
}) => ({ intermediate }: HttpContextInterface<RequestBodyAware<A>>) => {
  if (
    !opts.validators.reduce(
      (result, validate) => result && intermediate.requestBody.reduce((p, i) => p && validate(i[opts.key]), true),
      true
    )
  ) {
    throw BadRequestError.withMessage(opts.message || 'bad request');
  }
};
