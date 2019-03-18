import {
  TransformRequestObjectKeys,
  TransformRequestObjectKeysFromCamelToSnake,
  TransformRequestObjectKeysFromSnakeToCamel,
} from './transform-request-keys';
import { transformCase } from '../../utils';

describe('TransformResponseKeys', () => {
  it('should recursively transform request object keys', () => {
    const requestBody = { testMe: true };
    const intermediate = { requestBody };
    const ctx = { intermediate };
    const transformer = (x) => transformCase(x).from.camel.to.snake as any;
    expect(TransformRequestObjectKeys(transformer)(ctx as any).requestBody).toEqual({ test_me: true });
  });
});

describe('TransformRequestObjectKeysFromCamelToSnake', () => {
  it('should recursively transform request object keys', () => {
    const requestBody = { testMe: true };
    const intermediate = { requestBody };
    const ctx = { intermediate };
    expect(TransformRequestObjectKeysFromCamelToSnake(ctx as any).requestBody).toEqual({ test_me: true });
  });
});

describe('TransformRequestObjectKeysFromSnakeToCamel', () => {
  it('should recursively transform request object keys', () => {
    const requestBody = { test_me: true };
    const intermediate = { requestBody };
    const ctx = { intermediate };
    expect(TransformRequestObjectKeysFromSnakeToCamel(ctx as any).requestBody).toEqual({ testMe: true });
  });
});
