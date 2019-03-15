import { HttpContextInterface } from '@priestine/routing';

/**
 * @interface IRequestParamsAware
 */
export interface IRequestParamsAware {
  requestParams: string[];
}

/**
 * Extract request parameters from the url.
 */
export const ExtractRequestParams = (ctx: HttpContextInterface<IRequestParamsAware>) => {
  ctx.intermediate.requestParams =
    typeof ctx.intermediate.route.url === 'string' ? [] : ctx.request.url.match(ctx.intermediate.route.url).slice(1);

  return ctx;
};
