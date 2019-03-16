import * as R from 'ramda';

/**
 * Constructors supported by is validator.
 */
export type SupportedIsType = BooleanConstructor | NumberConstructor | StringConstructor | ObjectConstructor;

/**
 * Validate if value belongs to given type.
 */
const is = <T extends SupportedIsType>(type: T) => (value: any): boolean => new type(value).valueOf() === value;

/**
 * Negate validation result.
 */
export const negate = (validator: (value: any) => boolean) => (value: any) => !validator(value);

/**
 * Validate if value is instance of given constructor.
 */
export const isInstanceOf = <T extends Function>(ctor: T) => (value: any): boolean => value instanceof ctor;

/**
 * Validate if value is object. This successfully passes through the null bug.
 */
export const isObject = (value: any) => typeof value === 'object' && !!value;

/**
 * Validate if value is string.
 */
export const isString = is(String);

/**
 * Validate if value is boolean.
 */
export const isBoolean = is(Boolean);

/**
 * Validate if value is true.
 */
export const isTrue = (value: any) => value === true;

/**
 * Validate if value is false.
 */
export const isFalse = (value: any) => value === false;

/**
 * Validate if value is a finite number.
 */
export const isNumber = (value: any) => is(Number)(value) && Number.isFinite(value);

/**
 * Validate if value is integer.
 */
export const isInteger = (value: any) => isNumber(value) && Number.isInteger(value);

/**
 * Validate if value is float.
 */
export const isFloat = (value: any) => isNumber(value) && value % 1 !== 0;

/**
 * Validate if value is an empty array.
 */
export const isEmpty = (value: any) => Array.isArray(value) && value.length <= 0;

/**
 * Validate with given validators value only if it is defined.
 */
export const isOptional = (validateIfValueExists: Array<(value: any) => boolean>) => (value: any) =>
  R.or(!value, validateIfValueExists.reduce((result, validate) => result && validate(value), true));

/**
 * Validate if value is defined.
 */
export const isRequired = (value: any) => !!value;

/**
 * Validate if value is null.
 */
export const isNull = (value: any) => value === null;

/**
 * Validate if value is undefined.
 */
export const isUndefined = (value?: any) => value === undefined;

/**
 * Validate if value is function.
 */
export const isFunction = (value: any) => typeof value === 'function';

/**
 * Validate if value is in array of possible values.
 */
export const isIn = <T>(possibleValues: T[]) => (value: T) => possibleValues.includes(value);

/**
 * Validate if value is less than given limit.
 */
export const lt = (limit: number) => (value: any) => isNumber(value) && value < limit;

/**
 * Validate if value is less than or equal to given limit.
 */
export const lte = (limit: number) => (value: any) => isNumber(value) && value <= limit;

/**
 * Validate if value is greater than given limit.
 */
export const gt = (limit: number) => (value: any) => isNumber(value) && value > limit;

/**
 * Validate if value is greater than or equal to given limit.
 */
export const gte = (limit: number) => (value: any) => isNumber(value) && value >= limit;
