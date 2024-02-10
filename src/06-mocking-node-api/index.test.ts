import { doStuffByTimeout, doStuffByInterval, readFileAsynchronously } from '.';
import path from 'path';
import fs from 'fs';
import fsAsync from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');

    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(spy).toBeCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');

    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);
    expect(spy).toBeCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(interval);
    expect(callback).toBeCalledTimes(1);

    jest.advanceTimersByTime(interval);
    expect(callback).toBeCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'path/to/file.txt';

  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');

    await readFileAsynchronously(pathToFile);

    expect(spy).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    const fileContent = 'file content';
    jest.spyOn(fsAsync, 'readFile').mockResolvedValue(fileContent);

    const result = await readFileAsynchronously(pathToFile);
    expect(result).toBe(fileContent);
  });
});
