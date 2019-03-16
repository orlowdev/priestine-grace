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

* `BadRequestError` (400)
* `UnauthorizedError` (401)
* `ForbiddenError` (402)
* `NotFoundError` (404)
* `MethodNotAllowedError` (405)
* `NotAcceptableError` (406)
* `ProxyAuthenticationRequiredError` (407)
* `RequestTimeoutError` (408)
* `ConflictError` (409)
* `GoneError` (410)
* `LengthRequiredError` (411)
* `PreconditionFailedError` (412)
* `PayloadTooLargeError` (413)
* `URITooLongError` (414)
* `UnsupportedMediaTypeError` (415)
* `RequestedRangeNotSatisfiableError` (416)
* `ExpectationFailedError` (417)
* `MisdirectedRequestError` (421)
* `UnprocessableEntityError` (422)
* `LockedError` (423)
* `FailedDependencyError` (424)
* `TooEarlyError` (425)
* `UpgradeRequiredError` (426)
* `PreconditionRequiredError` (428)
* `TooManyRequestsError` (429)
* `RequestHeaderFieldsTooLargeError` (431)
* `UnavailableForLegalReasonsError` (451)

#### 5xx Errors

* `InternalServerError` (500)
* `NotImplementedError` (501)
* `BadGatewayError` (502)
* `ServiceUnavailableError` (503)
* `GatewayTimeoutError` (504)
* `HttpVersionNotSupportedError` (505)
* `VariantAlsoNegotiatesError` (506)
* `InsufficientStorageError` (507)
* `LoopDetectedError` (508)
* `NotExtendedError` (510)
* `NetworkAuthenticationRequiredError` (511)
