import { HttpError } from './http.error';

describe('HttpError', () => {
  describe('withStatusCode', () => {
    it('should assign given status code to error object', () => {
      expect(HttpError.from(new Error()).withStatusCode(333).statusCode).toEqual(333);
    });

    it('should apply status message to given status code if it is known', () => {
      expect(HttpError.from(new Error()).withStatusCode(404).statusMessage).toEqual('Not Found');
    });
  });

  describe('withStatusMessage', () => {
    it('should assign given status message to error object', () => {
      expect(HttpError.from(new Error()).withStatusMessage('Test').statusMessage).toEqual('Test');
    });
  });

  describe('withMessage', () => {
    it('should assign given message to error object', () => {
      expect(HttpError.from(new Error()).withMessage('Test').message).toEqual('Test');
    });
  });
});
