import { CheckAcceptHeader } from './check-accept-header';
import { NotAcceptableError } from '../../../errors';

describe('CheckAcceptHeader', () => {
  it('should throw if accept header is not defined', () => {
    expect(() => CheckAcceptHeader(['*/*'])({ request: { headers: {} } } as any)).toThrow(NotAcceptableError);
  });

  it('should throw if accept header is not in accepted range', () => {
    expect(() =>
      CheckAcceptHeader(['application/json'])({ request: { headers: { accept: 'application/xml' } } } as any)
    ).toThrow(NotAcceptableError);
  });
});
