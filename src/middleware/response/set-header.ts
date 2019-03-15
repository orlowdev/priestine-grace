import { HttpContextInterface } from '@priestine/routing';

/**
 * Set ServerResponse header.
 */
export const SetHeader = (name: string) => (value: string) => (ctx: HttpContextInterface) => {
  ctx.response.setHeader(name, value);

  return ctx;
};

/**
 * Prepare setting Content-Type header.
 */
export const SetContentTypeHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Content-Type'
);

/**
 * Prepare setting Accept-Patch header.
 */
export const SetAcceptPatchHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Accept-Patch'
);

/**
 * Prepare setting Accept-Ranges header.
 */
export const SetAcceptRangesHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Accept-Ranges'
);

/**
 * Prepare setting Allow header.
 */
export const SetAllowHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Allow'
);

/**
 * Prepare setting Age header.
 */
export const SetAgeHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Age');

/**
 * Prepare setting Cache-Control header.
 */
export const SetCacheControlHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Cache-Control'
);

/**
 * Prepare setting Connection header.
 */
export const SetConnectionHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Connection'
);

/**
 * Prepare setting Content-Disposition header.
 */
export const SetContentDispositionHeader: (
  value: string
) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Content-Disposition');

/**
 * Prepare setting Content-Encoding header.
 */
export const SetContentEncodingHeader: (
  value: string
) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Content-Encoding');

/**
 * Prepare setting Content-Language header.
 */
export const SetContentLanguageHeader: (
  value: string
) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Content-Language');

/**
 * Prepare setting Content-Length header.
 */
export const SetContentLengthHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Content-Length'
);

/**
 * Prepare setting Content-Location header.
 */
export const SetContentLocationHeader: (
  value: string
) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Content-Location');

/**
 * Prepare setting Content-Range header.
 */
export const SetContentRangeHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Content-Range'
);

/**
 * Prepare setting Date header.
 */
export const SetDateHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Date');

/**
 * Prepare setting ETag header.
 */
export const SetETagHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('ETag');

/**
 * Prepare setting Last-Modified header.
 */
export const SetLastModifiedHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Last-Modified'
);

/**
 * Prepare setting Link header.
 */
export const SetLinkHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Link');

/**
 * Prepare setting Location header.
 */
export const SetLocationHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Location'
);

/**
 * Prepare setting Proxy-Authenticate header.
 */
export const SetProxyAuthenticateHeader: (
  value: string
) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Proxy-Authenticate');

/**
 * Prepare setting Retry-After header.
 */
export const SetRetryAfterHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Retry-After'
);

/**
 * Prepare setting Server header.
 */
export const SetServerHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Server'
);

/**
 * Prepare setting Set-Cookie header.
 */
export const SetSetCookieHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Set-Cookie'
);

/**
 * Prepare setting Strict-Transport-Policy header.
 */
export const SetStrictTransportPolicyHeader: (
  value: string
) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Strict-Transport-Policy');

/**
 * Prepare setting Transfer-Encoding header.
 */
export const SetTransferEncodingHeader: (
  value: string
) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Transfer-Encoding');

/**
 * Prepare setting Upgrade header.
 */
export const SetUpgradeHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Upgrade'
);

/**
 * Prepare setting Vary header.
 */
export const SetVaryHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Vary');

/**
 * Prepare setting Via header.
 */
export const SetViaHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Via');

/**
 * Prepare setting Warning header.
 */
export const SetWarningHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'Warning'
);

/**
 * Prepare setting WWW-Authenticate header.
 */
export const SetWWWAuthenticateHeader: (
  value: string
) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('WWW-Authenticate');

/**
 * Prepare setting X-Request-ID header.
 */
export const SetXRequestIDHeader: (value: string) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader(
  'X-Request-ID'
);

/**
 * Prepare setting Access-Control-Allow-Origin header.
 */
export const SetAccessControlAllowOriginHeader: (
  value: string
) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Access-Control-Allow-Origin');

/**
 * Prepare setting Access-Control-Allow-Methods header.
 */
export const SetAccessControlAllowMethodsHeader: (
  value: string
) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Access-Control-Allow-Methods');

/**
 * Prepare setting Access-Control-Allow-Headers header.
 */
export const SetAccessControlAllowHeadersHeader: (
  value: string
) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Access-Control-Allow-Headers');

/**
 * Prepare setting Access-Control-Expose-Headers header.
 */
export const SetAccessControlExposeHeadersHeader: (
  value: string
) => (ctx: HttpContextInterface) => HttpContextInterface = SetHeader('Access-Control-Expose-Headers');
