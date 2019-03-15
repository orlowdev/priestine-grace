import { HttpContextInterface } from '@priestine/routing';

/**
 * Set ServerResponse header.
 */
export const SetHeader = (name: string) => (value: string) => (ctx: HttpContextInterface) => {
  ctx.response.setHeader(name, value);
};

/**
 * Prepare setting Content-Type header.
 */
export const SetContentTypeHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Content-Type');

/**
 * Prepare setting Accept-Patch header.
 */
export const SetAcceptPatchHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Accept-Patch');

/**
 * Prepare setting Accept-Ranges header.
 */
export const SetAcceptRangesHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Accept-Ranges');

/**
 * Prepare setting Allow header.
 */
export const SetAllowHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Allow');

/**
 * Prepare setting Age header.
 */
export const SetAgeHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Age');

/**
 * Prepare setting Cache-Control header.
 */
export const SetCacheControlHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Cache-Control');

/**
 * Prepare setting Connection header.
 */
export const SetConnectionHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Connection');

/**
 * Prepare setting Content-Disposition header.
 */
export const SetContentDispositionHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'Content-Disposition'
);

/**
 * Prepare setting Content-Encoding header.
 */
export const SetContentEncodingHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'Content-Encoding'
);

/**
 * Prepare setting Content-Language header.
 */
export const SetContentLanguageHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'Content-Language'
);

/**
 * Prepare setting Content-Length header.
 */
export const SetContentLengthHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'Content-Length'
);

/**
 * Prepare setting Content-Location header.
 */
export const SetContentLocationHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'Content-Location'
);

/**
 * Prepare setting Content-Range header.
 */
export const SetContentRangeHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Content-Range');

/**
 * Prepare setting Date header.
 */
export const SetDateHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Date');

/**
 * Prepare setting ETag header.
 */
export const SetETagHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('ETag');

/**
 * Prepare setting Last-Modified header.
 */
export const SetLastModifiedHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Last-Modified');

/**
 * Prepare setting Link header.
 */
export const SetLinkHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Link');

/**
 * Prepare setting Location header.
 */
export const SetLocationHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Location');

/**
 * Prepare setting Proxy-Authenticate header.
 */
export const SetProxyAuthenticateHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'Proxy-Authenticate'
);

/**
 * Prepare setting Retry-After header.
 */
export const SetRetryAfterHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Retry-After');

/**
 * Prepare setting Server header.
 */
export const SetServerHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Server');

/**
 * Prepare setting Set-Cookie header.
 */
export const SetSetCookieHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Set-Cookie');

/**
 * Prepare setting Strict-Transport-Policy header.
 */
export const SetStrictTransportPolicyHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'Strict-Transport-Policy'
);

/**
 * Prepare setting Transfer-Encoding header.
 */
export const SetTransferEncodingHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'Transfer-Encoding'
);

/**
 * Prepare setting Upgrade header.
 */
export const SetUpgradeHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Upgrade');

/**
 * Prepare setting Vary header.
 */
export const SetVaryHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Vary');

/**
 * Prepare setting Via header.
 */
export const SetViaHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Via');

/**
 * Prepare setting Warning header.
 */
export const SetWarningHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('Warning');

/**
 * Prepare setting WWW-Authenticate header.
 */
export const SetWWWAuthenticateHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'WWW-Authenticate'
);

/**
 * Prepare setting X-Request-ID header.
 */
export const SetXRequestIDHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader('X-Request-ID');

/**
 * Prepare setting Access-Control-Allow-Origin header.
 */
export const SetAccessControlAllowOriginHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'Access-Control-Allow-Origin'
);

/**
 * Prepare setting Access-Control-Allow-Methods header.
 */
export const SetAccessControlAllowMethodsHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'Access-Control-Allow-Methods'
);

/**
 * Prepare setting Access-Control-Allow-Headers header.
 */
export const SetAccessControlAllowHeadersHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'Access-Control-Allow-Headers'
);

/**
 * Prepare setting Access-Control-Expose-Headers header.
 */
export const SetAccessControlExposeHeadersHeader: (value: string) => (ctx: HttpContextInterface) => void = SetHeader(
  'Access-Control-Expose-Headers'
);
