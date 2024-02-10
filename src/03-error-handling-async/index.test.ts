import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const helloStr = 'Hello, World!';
    await expect(resolveValue(helloStr)).resolves.toBe(helloStr);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMsg = 'Something went wrong!';
    expect(() => throwError(errorMsg)).toThrowError(errorMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
