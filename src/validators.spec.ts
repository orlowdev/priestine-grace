import {
  gt,
  gte,
  isBoolean,
  isEmpty,
  isFalse,
  isFloat,
  isFunction,
  isIn,
  isInstanceOf,
  isInteger,
  isNull,
  isNumber,
  isObject,
  isOptional,
  isRequired,
  isString,
  isTrue,
  isUndefined,
  lt,
  lte,
  negate,
} from './validators';

describe('validators', () => {
  describe('negate', () => {
    it('should negate evaluation of the validator', () => {
      expect(negate(isString)(1)).toBe(true);
    });
  });

  describe('isObject', () => {
    it('should return true if provided value is Object', () => {
      expect(isObject({})).toBe(true);
    });

    it('should return false if provided value is not Object', () => {
      expect(isObject(true)).toBe(false);
    });
  });

  describe('isInstanceOf', () => {
    it('should return true if provided value is not instance of constructor', () => {
      expect(isInstanceOf(Date)(new Date())).toBe(true);
    });

    it('should return false if provided value is not not instance of constructor', () => {
      expect(isInstanceOf(Date)(true)).toBe(false);
    });
  });

  describe('isBoolean', () => {
    it('should return true if provided value is Boolean', () => {
      expect(isBoolean(true)).toBe(true);
    });

    it('should return false if provided value is not Boolean', () => {
      expect(isBoolean({})).toBe(false);
    });
  });

  describe('isTrue', () => {
    it('should return true if provided value True', () => {
      expect(isTrue(true)).toBe(true);
    });

    it('should return false if provided value is not True', () => {
      expect(isTrue(false)).toBe(false);
    });
  });

  describe('isFalse', () => {
    it('should return true if provided value is False', () => {
      expect(isFalse(false)).toBe(true);
    });

    it('should return false if provided value is not False', () => {
      expect(isFalse(true)).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('should return true if provided value is Number', () => {
      expect(isNumber(1)).toBe(true);
    });

    it('should return false if provided value is not Number', () => {
      expect(isNumber(true)).toBe(false);
    });
  });

  describe('isInteger', () => {
    it('should return true if provided value is Integer', () => {
      expect(isInteger(1)).toBe(true);
    });

    it('should return false if provided value is not Integer', () => {
      expect(isInteger(1.01)).toBe(false);
    });
  });

  describe('isFloat', () => {
    it('should return true if provided value is Float', () => {
      expect(isFloat(1.01)).toBe(true);
    });

    it('should return false if provided value is not Float', () => {
      expect(isFloat(1.0)).toBe(false);
    });
  });

  describe('isEmpty', () => {
    it('should return true if provided value is Empty', () => {
      expect(isEmpty([])).toBe(true);
    });

    it('should return false if provided value is not Empty', () => {
      expect(isEmpty([1])).toBe(false);
    });
  });

  describe('isOptional', () => {
    it('should return true if provided value is not defined', () => {
      expect(isOptional([isString])(undefined)).toBe(true);
    });

    it('should return true if provided value is defined and passes validators', () => {
      expect(isOptional([isString])('123')).toBe(true);
    });

    it('should return false if provided value is defined and does not pass the validators', () => {
      expect(isOptional([isString])(1)).toBe(false);
    });
  });

  describe('isRequired', () => {
    it('should return true if provided value is defined', () => {
      expect(isRequired(123)).toBe(true);
    });

    it('should return false if provided value is not defined', () => {
      expect(isRequired(null)).toBe(false);
    });
  });

  describe('isNull', () => {
    it('should return true if provided value is Null', () => {
      expect(isNull(null)).toBe(true);
    });

    it('should return false if provided value is not Null', () => {
      expect(isNull(0)).toBe(false);
    });
  });

  describe('isUndefined', () => {
    it('should return true if provided value is Undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined()).toBe(true);
    });

    it('should return false if provided value is not Undefined', () => {
      expect(isUndefined(null)).toBe(false);
    });
  });

  describe('isFunction', () => {
    it('should return true if provided value is Function', () => {
      expect(isFunction(() => {})).toBe(true);
    });

    it('should return false if provided value is not Function', () => {
      expect(isFunction(null)).toBe(false);
    });
  });

  describe('isIn', () => {
    it('should return true if provided value is in given array', () => {
      expect(isIn([1, 2, 3])(1)).toBe(true);
    });

    it('should return false if provided value is not in given array', () => {
      expect(isIn(['2', '3'])('1')).toBe(false);
    });
  });

  describe('lt', () => {
    it('should return true if provided value is less than given value', () => {
      expect(lt(1)(0)).toBe(true);
    });

    it('should return false if provided value is not less than given value', () => {
      expect(lt(1)(1)).toBe(false);
    });
  });

  describe('lte', () => {
    it('should return true if provided value is less than or equal to given value', () => {
      expect(lte(1)(1)).toBe(true);
    });

    it('should return false if provided value is not less than or equal to given value', () => {
      expect(lte(1)(2)).toBe(false);
    });
  });

  describe('gt', () => {
    it('should return true if provided value is greater than given value', () => {
      expect(gt(1)(2)).toBe(true);
    });

    it('should return false if provided value is not greater than given value', () => {
      expect(gt(1)(1)).toBe(false);
    });
  });

  describe('gte', () => {
    it('should return true if provided value is greater than or equal to given value', () => {
      expect(gte(2)(2)).toBe(true);
    });

    it('should return false if provided value is not greater than or equal to given value', () => {
      expect(gte(3)(2)).toBe(false);
    });
  });
});
