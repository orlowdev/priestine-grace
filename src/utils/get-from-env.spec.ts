import { getFromEnv } from './get-from-env';

describe('getFromEnv', () => {
  it('should return env value if it exists', () => {
    process.env.SOME_ARBITRARY_ENV_KEY_WITH_NO_SENSE_AT_ALL = 'B';
    expect(getFromEnv('SOME_ARBITRARY_ENV_KEY_WITH_NO_SENSE_AT_ALL')).toBe('B');
  });

  it('should return empty string if env value does not exist and default value is not provided', () => {
    expect(getFromEnv('B')).toBe('');
  });

  it('should return default value if env value does not exist', () => {
    expect(getFromEnv('B', 'A')).toBe('A');
  });
});
