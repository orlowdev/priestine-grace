import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';
import { HttpRouter } from '@priestine/routing';
import { withRouter } from './with-router';
import { ForbiddenError, NotFoundError } from './errors';
import { Pipeline } from '@priestine/data';

describe('withRouter', () => {
  it('should set throw NotFoundError if non-registered route is targeted', () => {
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    const response = new ServerResponse(request);
    const router = HttpRouter.empty();
    let test;
    const onError = (ctx) => (test = ctx.error);
    withRouter(router, onError)(request, response);
    expect(test).toEqual(NotFoundError);
  });

  it('should set throw NotFoundError if onError callback is a pipeline', async () => {
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    const response = new ServerResponse(request);
    const router = HttpRouter.empty();
    let test;
    const onError = Pipeline.from([(ctx) => (test = ctx.error)]);
    withRouter(router, onError)(request, response);
    expect(test).toEqual(NotFoundError);
  });

  it('should call onNonRegisteredRoute if non-registered route is targeted', () => {
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    const response = new ServerResponse(request);
    const router = HttpRouter.empty();
    let test;
    const onError = (ctx) => {};
    const onNonRegisteredRoute = (ctx) => (test = '123');
    withRouter(router, onError, onNonRegisteredRoute)(request, response);
    expect(test).toEqual('123');
  });

  it('should execute assigned pipeline', () => {
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    const response = new ServerResponse(request);
    let test;
    const mw = (ctx) => (test = '123');
    const router = HttpRouter.empty().get('/', Pipeline.of(mw));
    const onError = (ctx) => {};
    withRouter(router, onError)(request, response);
    expect(test).toEqual('123');
  });

  it('should catch pipeline errors', async () => {
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    const response = new ServerResponse(request);
    let test;
    const mw = (ctx) => {
      throw ForbiddenError;
    };
    const router = HttpRouter.empty().get('/', Pipeline.of(mw));
    const onError = (ctx) => (test = ctx.error);
    await withRouter(router, onError)(request, response);
    expect(test).toEqual(ForbiddenError);
  });
});
