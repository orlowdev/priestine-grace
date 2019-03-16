import { HttpContextInterface } from '@priestine/routing';
import { HttpError, NotAcceptableError } from '../../../errors';

/**
 * Check if accept header is defined and supported.
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
