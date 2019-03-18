import { CheckAcceptHeader } from './check-accept-header';
import { NotAcceptableError, NotFoundError } from '../../../errors';

describe('CheckAcceptHeader', () => {
  it('should throw if accept header is not defined', () => {
    expect(() => CheckAcceptHeader(['*/*'])({ request: { headers: {} } } as any)).toThrow(NotAcceptableError);
  });

  it('should throw if accept header is not in accepted range', () => {
    expect(() =>
      CheckAcceptHeader(['application/json'])({ request: { headers: { accept: 'application/xml' } } } as any)
    ).toThrow(NotAcceptableError);
  });

  it('should throw provided error if it is specified', () => {
    expect(() =>
      CheckAcceptHeader(['application/json'], NotFoundError)({
        request: { headers: { accept: 'application/xml' } },
      } as any)
    ).toThrow(NotFoundError);

    expect(() => CheckAcceptHeader(['application/json'], NotFoundError)({ request: { headers: {} } } as any)).toThrow(
      NotFoundError
    );
  });

  it('should not throw if */* is acceptable', () => {
    expect(() =>
      CheckAcceptHeader(['*/*'])({ request: { headers: { accept: 'application/xml' } } } as any)
    ).not.toThrow();
  });

  it('should default acceptable to */*', () => {
    expect(() => CheckAcceptHeader()({ request: { headers: { accept: 'application/xml' } } } as any)).not.toThrow();
  });

  it('should not throw if given value is acceptable', () => {
    expect(() =>
      CheckAcceptHeader(['application/json', 'application/xml'])({
        request: { headers: { accept: 'application/xml' } },
      } as any)
    ).not.toThrow();
  });
});
