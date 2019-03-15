import { HttpContextInterface } from '@priestine/routing';
import { NotAcceptableError } from '../../../errors';

/**
 * Check if accept header is defined and supported.
 *
 * @throws NotAcceptableError
 */
export const CheckAcceptHeader = (acceptable: string[] = ['*/*'], message?: string) => ({
  request,
}: HttpContextInterface): void => {
  if (!request.headers.accept) {
    throw NotAcceptableError.withMessage(message || 'not acceptable');
  }

  if (acceptable.includes('*/*') || acceptable.includes(request.headers.accept)) {
    return;
  }

  throw NotAcceptableError.withMessage(message || 'not acceptable');
};
