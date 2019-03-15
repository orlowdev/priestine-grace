import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';
import { HttpContextInterface } from '@priestine/routing';
import { AuthorizationHeaderPipeline } from './authorization-header';
import { ForbiddenError, UnauthorizedError } from '../errors';

describe('AuthorizationHeader', () => {
  it('should throw 401 if Authorization header is not in place', async () => {
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    const response = new ServerResponse(request);
    const ctx = { request, response, intermediate: {} } as HttpContextInterface;
    expect((await AuthorizationHeaderPipeline({ authType: 'Basic' }).process(ctx)).error).toEqual(UnauthorizedError);
  });

  it('should throw 401 with given message if Authorization header is not in place', async () => {
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    const response = new ServerResponse(request);
    const ctx = { request, response, intermediate: {} } as HttpContextInterface;
    expect(
      (await AuthorizationHeaderPipeline({ authType: 'Basic', messages: { unauthorized: 'no' } }).process(ctx)).error
        .message
    ).toEqual('no');
  });

  it('should throw 403 if Authorization header has invalid type', async () => {
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    request.headers.authorization = 'Bearer 123';
    const response = new ServerResponse(request);
    const ctx = { request, response, intermediate: {} } as HttpContextInterface;
    expect((await AuthorizationHeaderPipeline({ authType: 'Basic' }).process(ctx)).error).toEqual(ForbiddenError);
  });

  it('should throw 403 with given message if Authorization header has invalid type', async () => {
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    request.headers.authorization = 'Bearer 123';
    const response = new ServerResponse(request);
    const ctx = { request, response, intermediate: {} } as HttpContextInterface;
    expect(
      (await AuthorizationHeaderPipeline({ authType: 'Basic', messages: { forbidden: 'no' } }).process(ctx)).error
        .message
    ).toEqual('no');
  });

  it('should do set value of Authorization header to the intermediate', async () => {
    const request = new IncomingMessage(new Socket());
    request.url = '/';
    request.method = 'GET';
    request.headers.authorization = 'Basic 123';
    const response = new ServerResponse(request);
    const ctx = { request, response, intermediate: {} } as HttpContextInterface;
    expect((await AuthorizationHeaderPipeline({ authType: 'Basic' }).process(ctx)).error).toBe(undefined);
    expect(
      (await AuthorizationHeaderPipeline({ authType: 'Basic' }).process(ctx)).intermediate.authorizationHeaderValue
    ).toEqual('123');
  });
});
