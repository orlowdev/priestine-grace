import {
  fromCamelCase,
  fromColonCase,
  fromDotCase,
  fromKebabCase,
  fromPascalCase,
  fromSnakeCase,
  toCamelCase,
  toColonCase,
  toDotCase,
  toKebabCase,
  toPascalCase,
  toSnakeCase,
  transformCase,
  transformKeys,
} from './case-transformer';

describe('CaseTransformer', () => {
  describe('transformCase', () => {
    it('should apply transformation from one to another given case', () => {
      expect(transformCase('helloWorld').from.camel.to.kebab).toEqual('hello-world');
    });
  });

  describe('transformKeys', () => {
    it('should transform keys of given object to given case', () => {
      const date = new Date();
      const obj = {
        testMe: '',
        testNull: null,
        testUndefined: undefined,
        testDate: date,
        testArray: ['test', 'test123'],
        testNestedArray: [
          {
            testMeNested: '123',
          },
        ],
        testNestedObject: {
          testMe: '',
          testArray: ['test', 'test123'],
          testNestedArray: [
            {
              testMeNested: '123',
            },
          ],
        },
      };

      const transformer = (x) => transformCase(x).from.camel.to.snake as any;

      expect(transformKeys(transformer, obj)).toEqual({
        test_me: '',
        test_null: null,
        test_undefined: undefined,
        test_date: date,
        test_array: ['test', 'test123'],
        test_nested_array: [
          {
            test_me_nested: '123',
          },
        ],
        test_nested_object: {
          test_me: '',
          test_array: ['test', 'test123'],
          test_nested_array: [
            {
              test_me_nested: '123',
            },
          ],
        },
      });
    });
  });

  describe('toSnakeCase', () => {
    it('should transform given array of strings to snake case', () => {
      expect(toSnakeCase(['hello', 'world'])).toEqual('hello_world');
    });
  });

  describe('toCamelCase', () => {
    it('should transform given array of strings to camel case', () => {
      expect(toCamelCase(['hello', 'world'])).toEqual('helloWorld');
    });
  });

  describe('toKebabCase', () => {
    it('should transform given array of strings to kebab case', () => {
      expect(toKebabCase(['hello', 'world'])).toEqual('hello-world');
    });
  });

  describe('toPascalCase', () => {
    it('should transform given array of strings to pascal case', () => {
      expect(toPascalCase(['hello', 'world'])).toEqual('HelloWorld');
    });
  });

  describe('toDotCase', () => {
    it('should transform given array of strings to dot case', () => {
      expect(toDotCase(['hello', 'world'])).toEqual('hello.world');
    });
  });

  describe('toColonCase', () => {
    it('should transform given array of strings to colon case', () => {
      expect(toColonCase(['hello', 'world'])).toEqual('hello:world');
    });
  });

  describe('fromSnakeCase', () => {
    it('should transform given snake case string to array of strings', () => {
      expect(fromSnakeCase('hello_world')).toEqual(['hello', 'world']);
    });
  });

  describe('fromCamelCase', () => {
    it('should transform given camel case string to array of strings', () => {
      expect(fromCamelCase('helloWorld')).toEqual(['hello', 'world']);
    });
  });

  describe('fromKebabCase', () => {
    it('should transform given kebab case string to array of strings', () => {
      expect(fromKebabCase('hello-world')).toEqual(['hello', 'world']);
    });
  });

  describe('fromPascalCase', () => {
    it('should transform given pascal case string to array of strings', () => {
      expect(fromPascalCase('HelloWorld')).toEqual(['hello', 'world']);
    });
  });

  describe('fromDotCase', () => {
    it('should transform given dot case string to array of strings', () => {
      expect(fromDotCase('hello.world')).toEqual(['hello', 'world']);
    });
  });

  describe('fromColonCase', () => {
    it('should transform given colon case string to array of strings', () => {
      expect(fromColonCase('hello:world')).toEqual(['hello', 'world']);
    });
  });
});
