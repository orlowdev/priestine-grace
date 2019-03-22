import { Pipeline } from '@priestine/data';
import {
  SetAccessControlAllowHeadersHeader,
  SetAccessControlAllowOriginHeader,
  SetAccessControlExposeHeadersHeader,
} from '../middleware/response';
import { HttpContextInterface } from '@priestine/routing';
import { AuthorizationHeaderAware } from './authorization-header';

/**
 * @interface AccessControlPipelineOpts
 */
export interface AccessControlPipelineOpts {
  /**
   * Origin to be set to Access-Control-Allow-Origin value.
   */
  origin: string;
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
 * Access control pipeline assigns values to Access-Control- headers. It leaves
 * `ctx.intermediate` unchanged. If `headers` or `exposeHeaders` are not defined
 * in the argument object, according middleware will not be applied.
 */
export const AccessControlPipeline = (opts: AccessControlPipelineOpts) =>
  Pipeline.from<AuthorizationHeaderAware, HttpContextInterface>([SetAccessControlAllowOriginHeader(opts.origin)])
    .concat(opts.headers ? Pipeline.of(SetAccessControlAllowHeadersHeader(opts.headers.join(', '))) : Pipeline.empty())
    .concat(
      opts.exposeHeaders
        ? Pipeline.of(SetAccessControlExposeHeadersHeader(opts.exposeHeaders.join(', ')))
        : Pipeline.empty()
    );
