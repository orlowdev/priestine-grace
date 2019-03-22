import { HttpContextInterface, HttpRouter } from '@priestine/routing';
import { AccessControlPipeline } from './access-control';
import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';

describe('AccessControlPipeline', () => {
  const router = HttpRouter.empty()
    .all('/', [])
    .all(/\/1/, []);
  it('should assign proper origin', async () => {
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    const response = new ServerResponse(request);
    const ctx = { request, response, intermediate: {} } as HttpContextInterface;
    ctx.intermediate.route = router.routeMap.find(request).key;
    expect(
      (await AccessControlPipeline({ origin: '*', router }).process(ctx)).response.getHeaders()[
        'access-control-allow-origin'
      ]
    ).toEqual('*');
  });

  it('should assign proper allowed headers', async () => {
    const headers = ['Content-Type', 'Accept', 'X-Request-ID'];
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    const response = new ServerResponse(request);
    const ctx = { request, response, intermediate: {} } as HttpContextInterface;
    ctx.intermediate.route = router.routeMap.find(request).key;
    expect(
      (await AccessControlPipeline({ origin: '*', router, headers }).process(ctx)).response.getHeaders()[
        'access-control-allow-headers'
      ]
    ).toEqual('Content-Type, Accept, X-Request-ID');
  });

  it('should assign proper exposed headers', async () => {
    const exposeHeaders = ['X-Request-ID'];
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    const response = new ServerResponse(request);
    const ctx = { request, response, intermediate: {} } as HttpContextInterface;
    ctx.intermediate.route = router.routeMap.find(request).key;
    expect(
      (await AccessControlPipeline({ origin: '*', router, exposeHeaders }).process(ctx)).response.getHeaders()[
        'access-control-expose-headers'
      ]
    ).toEqual('X-Request-ID');
  });
});
