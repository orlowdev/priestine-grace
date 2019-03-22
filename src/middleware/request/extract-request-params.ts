import { HttpContextInterface } from '@priestine/routing';

/**
 * @interface RequestParamsAware
 */
export interface RequestParamsAware {
  requestParams: string[];
}

/**
 * Extract request parameters from the url.
 */
export const ExtractRequestParams = ({ request, intermediate }: HttpContextInterface<RequestParamsAware>) => {
  intermediate.requestParams =
    typeof intermediate.route.url === 'string' ? [] : request.url.match(intermediate.route.url).slice(1);

  return intermediate;
};
