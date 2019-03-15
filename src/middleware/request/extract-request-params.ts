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
export const ExtractRequestParams = ({ request, intermediate }: HttpContextInterface<IRequestParamsAware>) => {
  intermediate.requestParams =
    typeof intermediate.route.url === 'string' ? [] : request.url.match(intermediate.route.url).slice(1);

  return intermediate;
};
