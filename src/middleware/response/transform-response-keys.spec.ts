import {
  TransformResponseObjectKeys,
  TransformResponseObjectKeysFromCamelToSnake,
  TransformResponseObjectKeysFromSnakeToCamel,
} from './transform-response-keys';
import { transformCase } from '../../utils';

describe('TransformResponseKeys', () => {
  it('should recursively transform response object keys', () => {
    const responseBody = { testMe: true };
    const intermediate = { responseBody };
    const ctx = { intermediate };
    const transformer = (x) => transformCase(x).from.camel.to.snake as any;
    expect(TransformResponseObjectKeys(transformer)(ctx as any).responseBody).toEqual({ test_me: true });
  });
});

describe('TransformResponseObjectKeysFromCamelToSnake', () => {
  it('should recursively transform response object keys', () => {
    const responseBody = { testMe: true };
    const intermediate = { responseBody };
    const ctx = { intermediate };
    expect(TransformResponseObjectKeysFromCamelToSnake(ctx as any).responseBody).toEqual({ test_me: true });
  });
});

describe('TransformResponseObjectKeysFromSnakeToCamel', () => {
  it('should recursively transform response object keys', () => {
    const responseBody = { test_me: true };
    const intermediate = { responseBody };
    const ctx = { intermediate };
    expect(TransformResponseObjectKeysFromSnakeToCamel(ctx as any).responseBody).toEqual({ testMe: true });
  });
});
