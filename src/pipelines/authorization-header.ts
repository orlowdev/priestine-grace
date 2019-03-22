import { HttpContextInterface } from '@priestine/routing';
import { ForbiddenError, HttpError, UnauthorizedError } from '../errors';
import { Either, Pipeline } from '@priestine/data';

/**
 * Authentication type.
 */
export type WWWAuthenticateType = 'Basic' | 'Bearer' | 'Digest' | 'HOBA' | 'Mutual' | 'AWS4-HMAC-SHA256';

/**
 * @interface AuthorizationHeaderAware
 */
export interface AuthorizationHeaderAware {
  /**
   * Contents of the Authorization header without WWW-Authenticate type.
   */
  authorizationHeaderValue: string;
}

/**
 * @interface AuthorizationHeaderPipelineOpts
 */
export interface AuthorizationHeaderPipelineOpts {
  /**
   * Authentication type.
   */
  authType: WWWAuthenticateType;
  /**
   * Custom messages to be displayed in case error occurs.
   */
  errors?: {
    /**
     * Error if request does not have Authorization header.
     * @default UnauthorizedError
     */
    unauthorized?: HttpError;
    /**
     * Error if request has invalid Authorization header.
     * @default ForbiddenError
     */
    forbidden?: HttpError;
  };
}

/**
 * Check if Authorization header is defined in the request.
 *
 * @throws UnauthorizedError
 */
export const CheckAuthorizationHeaderExists = (error?: HttpError) => ({ request }: HttpContextInterface) => {
  if (!request.headers.authorization) {
    throw error ? error : UnauthorizedError.withMessage('unauthorized');
  }
};

/**
 * Get contents of the Authorization header. The authorization type is automatically removed. E.g.:
 *
 * Basic 1ddch4e3oifvh12 >> 1ddch4e3oifvh12
 *
 * @throws ForbiddenError
 */
export const GetAuthorizationHeaderValue = (authType: WWWAuthenticateType, error?: HttpError) => ({
  request,
  intermediate,
}: HttpContextInterface<AuthorizationHeaderAware>): AuthorizationHeaderAware => {
  const authData = request.headers.authorization.match(new RegExp(`${authType}\\s(.*)`));

  Either.fromNullable(authData)
    .chain((x) => Either.fromNullable(x[1]))
    .fold(
      () => {
        throw error ? error : ForbiddenError.withMessage('forbidden');
      },
      (x) => {
        intermediate.authorizationHeaderValue = x;
      }
    );

  return intermediate;
};

/**
 * Authorization header pipeline checks whether request has Authorization header
 * and assigns its value (with authentication type removed) to
 * `ctx.intermediate.authorizationHeaderValue`.
 *
 * @throws UnauthorizedError
 * @throws ForbiddenError
 */
export const AuthorizationHeaderPipeline = (opts: AuthorizationHeaderPipelineOpts) =>
  Pipeline.from<AuthorizationHeaderAware, HttpContextInterface>([
    CheckAuthorizationHeaderExists(opts.errors && opts.errors.unauthorized),
    GetAuthorizationHeaderValue(opts.authType, opts.errors && opts.errors.forbidden),
  ]);
