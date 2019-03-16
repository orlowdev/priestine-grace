import { ValidateArrayBodyProp, ValidateObjectBodyProp } from './validate-body';
import { BadRequestError, NotFoundError } from '../../../errors';

describe('ValidateObjectBodyProp', () => {
  it('should throw if body prop is invalid', () => {
    const validator = (x) => typeof x === 'string';
    const requestBody = { test: 1 };
    expect(() =>
      ValidateObjectBodyProp<{ test: any }>({ key: 'test', validators: [validator] })({
        intermediate: { requestBody },
      } as any)
    ).toThrow(BadRequestError);
  });

  it('should throw given error', () => {
    const validator = (x) => typeof x === 'string';
    const requestBody = { test: 1 };
    expect(() =>
      ValidateObjectBodyProp<{ test: any }>({ key: 'test', validators: [validator], error: NotFoundError })({
        intermediate: { requestBody },
      } as any)
    ).toThrow(NotFoundError);
  });

  it('should not throw if body prop is valid', () => {
    const validator = (x) => typeof x === 'string';
    const requestBody = { test: '1' };
    expect(() =>
      ValidateObjectBodyProp<{ test: any }>({ key: 'test', validators: [validator] })({
        intermediate: { requestBody },
      } as any)
    ).not.toThrow();
  });
});

describe('ValidateArrayBodyProp', () => {
  it('should throw if body prop is invalid', () => {
    const validator = (x) => typeof x === 'string';
    const requestBody = [{ test: 1 }];
    expect(() =>
      ValidateArrayBodyProp<{ test: any }>({ key: 'test', validators: [validator] })({
        intermediate: { requestBody },
      } as any)
    ).toThrow(BadRequestError);
  });

  it('should throw given error', () => {
    const validator = (x) => typeof x === 'string';
    const requestBody = [{ test: 1 }];
    expect(() =>
      ValidateArrayBodyProp<{ test: any }>({ key: 'test', validators: [validator], error: NotFoundError })({
        intermediate: { requestBody },
      } as any)
    ).toThrow(NotFoundError);
  });

  it('should not throw if body prop is valid', () => {
    const validator = (x) => typeof x === 'string';
    const requestBody = [{ test: '1' }];
    expect(() =>
      ValidateArrayBodyProp<{ test: any }>({ key: 'test', validators: [validator] })({
        intermediate: { requestBody },
      } as any)
    ).not.toThrow();
  });
});
