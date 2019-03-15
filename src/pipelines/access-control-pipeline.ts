import { Pipeline } from '@priestine/data';
import {
  SetAccessControlAllowHeadersHeader,
  SetAccessControlAllowMethodsHeader,
  SetAccessControlAllowOriginHeader,
  SetAccessControlExposeHeadersHeader,
} from '../middleware/response';
import { BaseHttpMatcher, HttpContextInterface, HttpRouter } from '@priestine/routing';
import { AuthorizationHeaderAware } from './authorization-header.pipeline';

/**
 * @interface AccessControlPipelineOpts
 */
export interface AccessControlPipelineOpts {
  /**
   * Origin to be set to Access-Control-Allow-Origin value.
   */
  origin: string;
  /**
   * Top-level HttpRouter for detecting methods available for current route.
   *
   * @deprecated This part will be moved to OptionsRouter in later releases.
   */
  router: HttpRouter;
  /**
   * Headers allowed to be sent in request.
   */
  headers?: string[];
  /**
   * Headers allowed to be referenced from browser.
   */
  exposeHeaders?: string[];
}

/**
 * Detect possible HTTP methods for current URL.
 */
export const DetectAllowedMethods = (router: HttpRouter) => (ctx: HttpContextInterface): void => {
  if (ctx.intermediate.route) {
    const allowedMethods = Array.from((router.routeMap as any)._routes.keys())
      .filter((x: BaseHttpMatcher<any>) =>
        typeof x.url === 'string'
          ? x.url === ctx.intermediate.route.url
          : (x.url as RegExp).source === (ctx.intermediate.route.url as RegExp).source
      )
      .map((x: BaseHttpMatcher<any>) => x.method);

    const setAllowedMethodsHeader = SetAccessControlAllowMethodsHeader(allowedMethods.join(', '));

    return setAllowedMethodsHeader(ctx);
  }
};

/**
 * Access control pipeline assigns values to Access-Control- headers. It leaves
 * `ctx.intermediate` unchanged. If `headers` or `exposeHeaders` are not defined
 * in the argument object, according middleware will not be applied.
 */
export const AccessControlPipeline = (opts: AccessControlPipelineOpts) =>
  Pipeline.from<AuthorizationHeaderAware, HttpContextInterface>([
    SetAccessControlAllowOriginHeader(opts.origin),
    DetectAllowedMethods(opts.router),
  ])
    .concat(opts.headers ? Pipeline.of(SetAccessControlAllowHeadersHeader(opts.headers.join(', '))) : Pipeline.empty())
    .concat(
      opts.exposeHeaders
        ? Pipeline.of(SetAccessControlExposeHeadersHeader(opts.exposeHeaders.join(', ')))
        : Pipeline.empty()
    );
