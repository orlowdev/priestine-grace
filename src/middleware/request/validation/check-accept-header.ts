import { HttpContextInterface } from "@priestine/routing";
import { NotAcceptableError } from "../../../errors";

/**
 * Check if accept header is defined and supported.
 *
 * @throws NotAcceptableError
 */
export const CheckAcceptHeader = (accepted: string[] = ['*/*'], message?: string) => ({ request }: HttpContextInterface): void => {
  if (!request.headers.accept || !accepted.includes(request.headers.accept)) {
    throw NotAcceptableError.withMessage(message || 'not acceptable');
  }
};
