# @priestine/grace

[![codecov](https://codecov.io/gl/priestine/grace/branch/master/graph/badge.svg)](https://codecov.io/gl/priestine/grace) [![licence: MIT](https://img.shields.io/npm/l/@priestine/grace.svg)](https://gitlab.com/priestine/grace) [![docs: typedoc](https://img.shields.io/badge/docs-typedoc-blue.svg)](https://priestine.gitlab.io/grace) [![npm](https://img.shields.io/npm/dt/@priestine/grace.svg)](https://www.npmjs.com/package/@priestine/grace) [![npm](https://img.shields.io/npm/v/@priestine/grace.svg)](https://www.npmjs.com/package/@priestine/grace)

Minimalistic middleware-based framework for building web apps with Node.js.

## Installation

```bash
npm i --save @priestine/data @priestine/routing @priestine/grace
```

or

```bash
yarn add @priestine/data @priestine/routing @priestine/grace
```

## Overview

`@priestine/grace` is a set of helper code to speed up development with `@priestine/routing`.
It is going to include most common things wrapped up into middleware, pipelines or even routers
that you can concat to your code where necessary.

## Usage

### Errors

`HttpError` is a class that extends `Error` and you can use it to exit the pipeline with required
status code and error message. It provides chaining methods for setting up the response you want to send:

```javascript
throw new HttpError().withStatusCode(400).withMessage('Missing required field "id"');

// or

reject(new HttpError().withStatusCode(400).withMessage('Missing required field "id"'));
```

**NOTE**: `HttpError` is not intended to be used for debugging or serving as a wrapper for ambiguous errors you do not anticipate.

There is a set of predefined errors with appropriate status codes assigned so you can use them and extend
with required error messages. Refer to RFC or MDN for the description of status codes.

```javascript
throw BadRequestError.withMessage('No-no-no');
```

#### 4xx Errors

- `BadRequestError` (400)
- `UnauthorizedError` (401)
- `ForbiddenError` (402)
- `NotFoundError` (404)
- `MethodNotAllowedError` (405)
- `NotAcceptableError` (406)
- `ProxyAuthenticationRequiredError` (407)
- `RequestTimeoutError` (408)
- `ConflictError` (409)
- `GoneError` (410)
- `LengthRequiredError` (411)
- `PreconditionFailedError` (412)
- `PayloadTooLargeError` (413)
- `URITooLongError` (414)
- `UnsupportedMediaTypeError` (415)
- `RequestedRangeNotSatisfiableError` (416)
- `ExpectationFailedError` (417)
- `MisdirectedRequestError` (421)
- `UnprocessableEntityError` (422)
- `LockedError` (423)
- `FailedDependencyError` (424)
- `TooEarlyError` (425)
- `UpgradeRequiredError` (426)
- `PreconditionRequiredError` (428)
- `TooManyRequestsError` (429)
- `RequestHeaderFieldsTooLargeError` (431)
- `UnavailableForLegalReasonsError` (451)

#### 5xx Errors

- `InternalServerError` (500)
- `NotImplementedError` (501)
- `BadGatewayError` (502)
- `ServiceUnavailableError` (503)
- `GatewayTimeoutError` (504)
- `HttpVersionNotSupportedError` (505)
- `VariantAlsoNegotiatesError` (506)
- `InsufficientStorageError` (507)
- `LoopDetectedError` (508)
- `NotExtendedError` (510)
- `NetworkAuthenticationRequiredError` (511)

### Pipelines

#### `AccessControlPipeline`

Access control pipeline assigns the following response headers:

- Access-Control-Allow-Origin
- Access-Control-Allow-Methods
- Access-Control-Allow-Headers (optional)
- Access-Control-Expose-Headers (optional)

##### Accepted arguments

```typescript
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
```

##### Usage

```javascript
const router = require('../routing').MainRouter;

const MyPipeline = Pipeline.empty()
  .concat(
    AccessControlPipeline({
      origin: '*',
      router,
      headers: ['Accept', 'Content-Type', 'Authorization', 'X-Request-ID', 'If-None-Match'],
      exposeHeaders: ['ETag'],
    })
  )
  .concat(/**/);
```

#### `AuthorizationHeaderPipeline`

Authorization header pipeline checks if Authorization header is in place in IncomingMessage and assigns its value
to `ctx.intermediate.authorizationHeaderValue`.

If the header is missing, it throws `UnauthorizedError`.
If the header is invalid (auth type wrong or no value), it throws `ForbiddenError`.

**NOTE**: This pipeline is agnostic and you need to unpack the token or whatever the auth string is yourself.

For TypeScript developers, it provides helper `AuthorizationHeaderAware` interface to be passed to generic `HttpContextInterface`.

```typescript
const MyAuthRelatedMiddleware = (ctx: HttpContextInterface<AuthorizationHeaderAware>) => {};
```

##### Accepted arguments

```typescript
/**
 * @interface AuthorizationHeaderPipelineOpts
 */
export interface AuthorizationHeaderPipelineOpts {
  /**
   * Authentication type.
   */
  authType: WWWAuthenticateType;
  /**
   * Custom messages to be displayed in case error occurs.
   */
  errors?: {
    /**
     * Error if request does not have Authorization header.
     * @default UnauthorizedError
     */
    unauthorized?: HttpError;
    /**
     * Error if request has invalid Authorization header.
     * @default ForbiddenError
     */
    forbidden?: HttpError;
  };
}
```

##### Usage

```javascript
const router = require('../routing').MainRouter;

const MyPipeline = Pipeline.empty()
  .concat(
    AuthorizationHeaderPipeline({
      authType: 'Bearer',
      errors: {
        unauthorized: UnauthorizedError.withMessage('Log in to get access to this resource'),
        forbidden: ForbiddenError.withMessage('You shall not pass'),
      },
    })
  )
  .concat(/**/);
```

#### `EndResponseBodyPipeline`

> DEPRECATED: Will be renamed to `SendResponseBodyPipeline`

End response by sending the contents of `ctx.intermediate.responseBody` to the client.

If response is finished and an error occurred, the error will be put to stdout.
If response is finished and no error happened, the pipeline does nothing.

For TypeScript developers, it provides helper `ResponseBodyAware` interface to be passed to generic `HttpContextInterface`.

```typescript
const MyResponseRelatedMiddleware = (ctx: HttpContextInterface<ResponseBodyAware>) => {};
```

`ResponseBodyAware` is generic and provided type is referenced by `intermediate.responseBody`, e.g.:

```typescript
const MyResponseRelatedMiddleware = (ctx: HttpContextInterface<ResponseBodyAware<{ id: number }>>) => {};
```

##### Accepted arguments

```typescript
/**
 * @interface EndResponsePipelineOpts
 */
export interface EndResponsePipelineOpts {
  /**
   * Flag for the pipeline to JSON.stringify responseBody.
   */
  json?: boolean;
  /**
   * Flag for wrapping response body into `{ success: boolean, data: <responseBody> }`.
   */
  wrap?: boolean;
}
```

##### Usage

```javascript
const router = require('../routing').MainRouter;

const MyPipeline = Pipeline.empty()
  .concat(/**/)
  .concat(
    EndResponseBodyPipeline({
      json: true,
    })
  );
```

#### `EndEmptyResponsePipeline`

> DEPRECATED: Will be renamed to `SendEmptyResponsePipeline`

End response empty string (_""_).

If response is finished and an error occurred, the error will be put to stdout.
If response is finished and no error happened, the pipeline does nothing.

##### Usage

```javascript
const router = require('../routing').MainRouter;

const MyPipeline = Pipeline.empty()
  .concat(/**/)
  .concat(EndEmptyResponsePipeline);
```
