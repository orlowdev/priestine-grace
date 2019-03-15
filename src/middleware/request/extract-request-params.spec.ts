import { ExtractRequestParams } from "./extract-request-params";

describe('ExtractRequestParams', () => {
  it('should return empty array if the route is not RegExp matched', () => {
    expect(
      ExtractRequestParams({ request: { url: '/' }, intermediate: { route: { url: '/' } } } as any).intermediate
        .requestParams
    ).toEqual([]);
  });

  it('should assign matched parameters to the requestParams intermediate key', () => {
    expect(
      ExtractRequestParams({ request: { url: '/test' }, intermediate: { route: { url: /\/(.*)/ } } } as any)
        .intermediate.requestParams
    ).toEqual(['test']);
  });
});
