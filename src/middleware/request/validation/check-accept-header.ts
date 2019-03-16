import { HttpContextInterface } from '@priestine/routing';
import { HttpError, NotAcceptableError } from '../../../errors';

/**
 * Check if accept header is defined and supported.
 * @todo Passing errors instead of messages (everywhere)
 * @todo Add common validators
 * @todo Response body keys transformer
 *
 * @throws NotAcceptableError
 */
export const CheckAcceptHeader = (acceptable: string[] = ['*/*'], error?: HttpError) => ({
  request,
}: HttpContextInterface): void => {
  if (!request.headers.accept) {
    throw error ? error : NotAcceptableError.withMessage('not acceptable');
  }

  if (acceptable.includes('*/*') || acceptable.includes(request.headers.accept)) {
    return;
  }

  throw error ? error : NotAcceptableError.withMessage('not acceptable');
};
