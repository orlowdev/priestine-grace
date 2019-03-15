import { HttpContextInterface } from '@priestine/routing';
import { ForbiddenError, UnauthorizedError } from '../errors';
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
  messages?: {
    /**
     * Error message if request does not have Authorization header.
     * @default "unauthorized"
     */
    unauthorized?: string;
    /**
     * Error message if request has invalid Authorization header.
     * @default "forbidden"
     */
    forbidden?: string;
  };
}

/**
 * Check if Authorization header is defined in the request.
 *
 * @throws UnauthorizedError
 */
export const CheckAuthorizationHeaderExists = (message?: string) => ({ request }: HttpContextInterface): void => {
  if (!request.headers.authorization) {
    throw UnauthorizedError.withMessage(message || 'unauthorized');
  }
};

/**
 * Get contents of the Authorization header. The authorization type is automatically removed. E.g.:
 *
 * Basic 1ddch4e3oifvh12 >> 1ddch4e3oifvh12
 *
 * @throws ForbiddenError
 */
export const GetAuthorizationHeaderValue = (authType: WWWAuthenticateType, message?: string) => ({
  request,
  intermediate,
}: HttpContextInterface<AuthorizationHeaderAware>): AuthorizationHeaderAware => {
  const authData = request.headers.authorization.match(new RegExp(`${authType}\s(.*)`));

  Either.fromNullable(authData)
    .chain((x) => Either.fromNullable(x[1]))
    .fold(
      () => {
        throw ForbiddenError.withMessage(message || 'forbidden');
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
  Pipeline.from([
    CheckAuthorizationHeaderExists(opts.messages && opts.messages.unauthorized),
    GetAuthorizationHeaderValue(opts.authType, opts.messages && opts.messages.forbidden),
  ]);
