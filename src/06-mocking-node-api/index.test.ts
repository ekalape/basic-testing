// Uncomment the code below and write your tests
import {
  readFileAsynchronously,
  doStuffByInterval,
  doStuffByTimeout,
} from './index';
import path from 'path';
import fs from 'fs';
import fsPromises from 'node:fs/promises';

/* import { writeFile, rm } from 'node:fs/promises';
import { existsSync } from 'fs'; */

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const mockFn = jest.fn();
    jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(mockFn, 1000);
    jest.runAllTimers();
    expect(mockFn).toHaveBeenCalled();
    expect(setTimeout).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Number),
    );
  });

  test('should call callback only after timeout', () => {
    const mockFn = jest.fn();
    doStuffByTimeout(mockFn, 1000);
    expect(mockFn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalledTimes(1);
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
    const mockFn = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockFn, 1000);
    jest.advanceTimersByTime(1000);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Number),
    );
  });

  test('should call callback multiple times after multiple intervals', () => {
    const mockFn = jest.fn();
    jest.spyOn(global, 'setInterval');
    doStuffByInterval(mockFn, 1000);
    jest.advanceTimersByTime(3000);
    expect(mockFn).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const pathToFile = 'some/path/tofile';
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously(pathToFile);
    expect(path.join).toBeCalled;
    expect(joinSpy).toBeCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.mock('fs', () => {
      const originalModule = jest.requireActual<typeof import('fs')>('fs');
      return {
        ...originalModule,
        existsSync: jest.fn(() => false),
      };
    });
    const fakeReadFile = jest.spyOn(fsPromises, 'readFile');
    expect(readFileAsynchronously(pathToFile)).resolves.toBeNull;
    expect(fakeReadFile).not.toBeCalled;
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    const fakeReadFile = jest
      .spyOn(fsPromises, 'readFile')
      .mockResolvedValue('file content');

    const result = await readFileAsynchronously(pathToFile);
    expect(fakeReadFile).toBeCalled;
    expect(result).toBe('file content');
  });
});
