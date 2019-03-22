import { HttpContextInterface, HttpRouter } from '@priestine/routing';
import { IncomingMessage, ServerResponse } from 'http';
import { NotFoundError } from './errors';
import { isPipeline, Pipeline, PipelineInterface } from '@priestine/data';

/**
 * Wrap up serving requests with given router.
 *
 * If an error occurs while executing assign pipeline, onError is called.
 * If request targets a route which is not registered, onNonRegisteredRoute is called if it is
 * provided or NotFoundError is thrown and onError is called.
 *
 * @param router HttpRouter to be used for serving requests
 * @param onError callback for cases when error occurs in pipeline execution
 * @param onNonRegisteredRoute? callback for cases when request targets unregistered route
 */
export const withRouter = (
  router: HttpRouter,
  onError: PipelineInterface | ((ctx: HttpContextInterface) => any),
  onNonRegisteredRoute?: PipelineInterface | ((ctx: HttpContextInterface) => any)
) => async (request: IncomingMessage, response: ServerResponse) => {
  const route = router.routeMap.find(request);

  const errorHandler = (onError) => (ctx) => (isPipeline(onError) ? onError.process(ctx) : onError(ctx));

  const ctx: HttpContextInterface = {
    request,
    response,
    intermediate: {
      route: route.key,
    },
  };

  if (!route.value || route.value.isEmpty) {
    if (onNonRegisteredRoute) {
      return errorHandler(onNonRegisteredRoute)(ctx);
    }

    ctx.error = NotFoundError;
    return errorHandler(onError)(ctx);
  }

  const pipeline = Pipeline.empty().concat(route.value);

  const result: HttpContextInterface = await pipeline.process(ctx);

  if (result.error) {
    return errorHandler(onError)(ctx);
  }

  return result;
};
