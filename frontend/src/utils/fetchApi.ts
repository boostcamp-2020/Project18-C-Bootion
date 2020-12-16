import axios, { Method } from 'axios';

type ErrorType = { error?: 1 | true; message?: string };

const errorHandler = (e: Error) => {
  console.error(e);
};

export const fetchApi = <T, S = null>(param: {
  url: string;
  method: Method;
  defaultReturn: T;
}) => async (paramData?: S): Promise<T> => {
  try {
    const data = (
      await axios({
        url: param.url,
        method: param.method,
        data: paramData,
      })
    ).data as T & ErrorType;
    if (data?.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (e) {
    errorHandler(e);
    return param.defaultReturn;
  }
};
