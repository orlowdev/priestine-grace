import { Pipeline } from '@priestine/data';
import { HttpContextInterface } from '@priestine/routing';

/**
 * Use it and assign what you want to send in response to `ctx.responseBody`.
 * @interface ResponseBodyAware
 */
export interface ResponseBodyAware<T = {}> {
  /**
   * Contents of the response body if you use EndResponseBodyPipeline.
   */
  responseBody: T;
}

/**
 * @interface EndResponsePipelineOpts
 */
export interface EndResponsePipelineOpts {
  /**
   * Flag for the pipeline to JSON.stringify responseBody.
   */
  json?: boolean;
  /**
   * Flag for wrapping response body into `{ success: boolean, data: <responseBody> }`
   */
  wrap?: boolean;
}

/**
 * Wrap response body into `{ success: boolean, data: <responseBody> }`. Helpful
 * if you use this standard for responses.
 *
 * If error occurred, `{ success: false, message: error.message }` is sent.
 * If responseBody is undefined, `{ success: true }` is sent.
 */
export const WrapJSONResponse = ({ intermediate, error }: HttpContextInterface<ResponseBodyAware>) => ({
  ...intermediate,
  ...(error ? { success: false, message: error.message } : { success: true, data: intermediate.responseBody }),
});

/**
 * `JSON.stringify` contents of the responseBody.
 */
export const JSONStringifyResponse = ({ intermediate }: HttpContextInterface<ResponseBodyAware>) => ({
  ...intermediate,
  responseBody: JSON.stringify(intermediate.responseBody),
});

/**
 * Send contents of the responseBody to the client.
 */
export const EndResponse = ({ intermediate, error, response }: HttpContextInterface<ResponseBodyAware>): void => {
  if (response.finished) {
    if (error) {
      console.error(error);
    }

    return;
  }

  response.end(intermediate.responseBody);
};

/**
 * Set contents of responseBody to empty string.
 */
export const ClearResponseBody = ({ intermediate }: HttpContextInterface<ResponseBodyAware>): ResponseBodyAware => ({
  ...intermediate,
  responseBody: '',
});

/**
 * End response with contents of `ctx.intermediate.responseBody`.
 * @deprecated Will be renamed to SendResponseBodyPipeline.
 */
export const EndResponseBodyPipeline = (opts: EndResponsePipelineOpts) => {
  if (opts.wrap) {
    opts.json = true;
  }

  return Pipeline.empty()
    .concat(opts.json ? Pipeline.of(JSONStringifyResponse) : Pipeline.empty())
    .concat(opts.wrap ? Pipeline.of(WrapJSONResponse) : Pipeline.empty())
    .concat(Pipeline.of(EndResponse));
};

/**
 * End response with empty ('') body.
 * @deprecated Will be renamed to SendEmptyResponsePipeline.
 */
export const EndEmptyResponsePipeline = Pipeline.from([ClearResponseBody, EndResponse]);
