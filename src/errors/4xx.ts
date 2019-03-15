import { HttpError } from './http.error';

/**
 * This response means that server could not understand the request due to
 * invalid syntax.
 */
export const BadRequestError = new HttpError().withStatusCode(400);

/**
 * Although the HTTP standard specifies "unauthorized", semantically this
 * response means "unauthenticated". That is,the client must authenticate
 * itself to get the requested response.
 */
export const UnauthorizedError = new HttpError().withStatusCode(401);

/**
 * The client does not have access rights to the content, i.e. they are
 * unauthorized, so server is rejecting to give proper response.
 * Unlike 401, the client's identity is known to the server.
 */
export const ForbiddenError = new HttpError().withStatusCode(403);

/**
 * The server can not find requested resource. In the browser, this means the
 * URL is not recognized. In an API, this can also mean that the endpoint is
 * valid but the resource itself does not exist. Servers may also send this
 * response instead of 403 to hide the existence of a resource from an
 * unauthorized client. This response code is probably the most famous one
 * due to its frequent occurrence on the web.
 */
export const NotFoundError = new HttpError().withStatusCode(404);

/**
 * This response is sent when the web server, after performing server-driven
 * content negotiation, doesn't find any content following the criteria given
 * by the user agent.
 */
export const MethodNotAllowedError = new HttpError().withStatusCode(405);

/**
 * This response is sent when the web server, after performing server-driven
 * content negotiation, doesn't find any content following the criteria given
 * by the user agent.
 */
export const NotAcceptableError = new HttpError().withStatusCode(406);

/**
 * This is similar to 401 but authentication is needed to be done by a proxy.
 */
export const ProxyAuthenticationRequiredError = new HttpError().withStatusCode(407);

/**
 * This response is sent on an idle connection by some servers, even without
 * any previous request by the client. It means that the server would like to
 * shut down this unused connection. This response is used much more since
 * some browsers, like Chrome, Firefox 27+, or IE9, use HTTP pre-connection
 * mechanisms to speed up surfing. Also note that some servers merely shut
 * down the connection without sending this message.
 */
export const RequestTimeoutError = new HttpError().withStatusCode(408);

/**
 * This response is sent when a request conflicts with the current state of
 * the server.
 */
export const ConflictError = new HttpError().withStatusCode(409);

/**
 * This response would be sent when the requested content has been permanently
 * deleted from server, with no forwarding address. Clients are expected to
 * remove their caches and links to the resource. The HTTP specification
 * intends this status code to be used for "limited-time, promotional services".
 * APIs should not feel compelled to indicate resources that have been deleted
 * with this status code.
 */
export const GoneError = new HttpError().withStatusCode(410);

/**
 * Server rejected the request because the Content-Length header field is not
 * defined and the server requires it.
 */
export const LengthRequiredError = new HttpError().withStatusCode(411);

/**
 * The client has indicated preconditions in its headers which the server does
 * not meet.
 */
export const PreconditionFailedError = new HttpError().withStatusCode(412);

/**
 * Request entity is larger than limits defined by server; the server might
 * close the connection or return an Retry-After header field.
 */
export const PayloadTooLargeError = new HttpError().withStatusCode(413);

/**
 * The URI requested by the client is longer than the server is willing to
 * interpret.
 */
export const URITooLongError = new HttpError().withStatusCode(414);

/**
 * The media format of the requested data is not supported by the server, so
 * the server is rejecting the request.
 */
export const UnsupportedMediaTypeError = new HttpError().withStatusCode(415);

/**
 * The range specified by the Range header field in the request can't be fulfilled; it's possible that the range is
 * outside the size of the target URI's data.
 */
export const RequestedRangeNotSatisfiableError = new HttpError().withStatusCode(416);

/**
 * This response code means the expectation indicated by the Expect request
 * header field can't be met by the server.
 */
export const ExpectationFailedError = new HttpError().withStatusCode(417);

/**
 * The request was directed at a server that is not able to produce a response.
 * This can be sent by a server that is not configured to produce responses for
 * the combination of scheme and authority that are included in the request URI.
 */
export const MisdirectedRequestError = new HttpError().withStatusCode(421);

/**
 * The request was well-formed but was unable to be followed due to semantic errors.
 */
export const UnprocessableEntityError = new HttpError().withStatusCode(422);

/**
 * The resource that is being accessed is locked.
 */
export const LockedError = new HttpError().withStatusCode(423);

/**
 * The request failed due to failure of a previous request.
 */
export const FailedDependencyError = new HttpError().withStatusCode(424);

/**
 * Indicates that the server is unwilling to risk processing a request that
 * might be replayed.
 */
export const TooEarlyError = new HttpError().withStatusCode(425);

/**
 * The server refuses to perform the request using the current protocol but might
 * be willing to do so after the client upgrades to a different protocol. The
 * server sends an Upgrade header in a 426 response to indicate the required protocol(s).
 */
export const UpgradeRequiredError = new HttpError().withStatusCode(426);

/**
 * The origin server requires the request to be conditional. Intended to
 * prevent the 'lost update' problem, where a client GETs a resource's state,
 * modifies it, and PUTs it back to the server, when meanwhile a third party
 * has modified the state on the server, leading to a conflict.
 */
export const PreconditionRequiredError = new HttpError().withStatusCode(428);

/**
 * The user has sent too many requests in a given amount of time ("rate limiting").
 */
export const TooManyRequestsError = new HttpError().withStatusCode(429);

/**
 * The server is unwilling to process the request because its header fields are
 * too large. The request MAY be resubmitted after reducing the size of the
 * request header fields.
 */
export const RequestHeaderFieldsTooLargeError = new HttpError().withStatusCode(431);

/**
 * The user requests an illegal resource, such as a web page censored by a government.
 */
export const UnavailableForLegalReasonsError = new HttpError().withStatusCode(451);
