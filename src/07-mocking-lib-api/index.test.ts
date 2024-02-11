import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => {
  return {
    throttle: jest.fn((fn: Function) => fn),
  };
});

jest.mock('axios');

const relativePath = 'users';

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn(() => Promise.resolve({ data: {} })),
    });

    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const instance = {
      get: jest.fn(() => Promise.resolve({ data: {} })),
    };

    (axios.create as jest.Mock).mockReturnValue(instance);

    await throttledGetDataFromApi(relativePath);

    expect(instance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const data = { id: 1, name: 'Alex K' };
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn(() => Promise.resolve({ data })),
    });

    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(data);
  });
});
