import { HttpError } from './http.error';

/**
 * The server has encountered a situation it doesn't know how to handle.
 */
export const InternalServerError = new HttpError().withStatusCode(500);

/**
 * The request method is not supported by the server and cannot be handled. The
 * only methods that servers are required to support (and therefore that must
 * not return this code) are GET and HEAD.
 */
export const NotImplementedError = new HttpError().withStatusCode(501);

/**
 * This error response means that the server, while working as a gateway to get
 * a response needed to handle the request, got an invalid response.
 */
export const BadGatewayError = new HttpError().withStatusCode(502);

/**
 * The server is not ready to handle the request. Common causes are a server
 * that is down for maintenance or that is overloaded. Note that together with
 * this response, a user-friendly page explaining the problem should be sent.
 * This responses should be used for temporary conditions and the
 * Retry-After: HTTP header should, if possible, contain the estimated time
 * before the recovery of the service. The webmaster must also take care about
 * the caching-related headers that are sent along with this response, as these
 * temporary condition responses should usually not be cached.
 */
export const ServiceUnavailableError = new HttpError().withStatusCode(503);

/**
 * This error response is given when the server is acting as a gateway and cannot
 * get a response in time.
 */
export const GatewayTimeoutError = new HttpError().withStatusCode(504);

/**
 * The HTTP version used in the request is not supported by the server.
 */
export const HttpVersionNotSupportedError = new HttpError().withStatusCode(505);

/**
 * The server has an internal configuration error: transparent content
 * negotiation for the request results in a circular reference.
 */
export const VariantAlsoNegotiatesError = new HttpError().withStatusCode(506);

/**
 * The server has an internal configuration error: the chosen variant resource
 * is configured to engage in transparent content negotiation itself, and is
 * therefore not a proper end point in the negotiation process.
 */
export const InsufficientStorageError = new HttpError().withStatusCode(507);

/**
 * The server detected an infinite loop while processing the request.
 */
export const LoopDetectedError = new HttpError().withStatusCode(508);

/**
 * Further extensions to the request are required for the server to fulfill it.
 */
export const NotExtendedError = new HttpError().withStatusCode(510);

/**
 * The 511 status code indicates that the client needs to authenticate to gain
 * network access.
 */
export const NetworkAuthenticationRequiredError = new HttpError().withStatusCode(511);
