// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';


describe('throttledGetDataFromApi', () => {
  const mockeddata = { data: "some-data", name: "some-name" };
  const fakepath = "/some/path";
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {

    const createSpy = jest.spyOn(axios, "create");
    jest.spyOn(axios.Axios.prototype, "get").mockImplementationOnce(() => Promise.resolve(mockeddata))

    await throttledGetDataFromApi(fakepath);
    jest.runAllTimers();

    expect(createSpy).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    })

  });

  test('should perform request to correct provided url', async () => {

    const createSpy = jest.spyOn(axios.Axios.prototype, "get").mockImplementationOnce(() => Promise.resolve(mockeddata))
    await throttledGetDataFromApi(fakepath);
    jest.runAllTimers();
    expect(createSpy).toBeCalledWith(fakepath)

  });

  test('should return response data', async () => {
    jest.mock("axios")
    jest.spyOn(axios.Axios.prototype, "get").mockImplementationOnce(() => Promise.resolve(mockeddata))
    const result = await throttledGetDataFromApi(fakepath);

    jest.runAllTimers();
    expect(result).toEqual(mockeddata.data)
  });
});
