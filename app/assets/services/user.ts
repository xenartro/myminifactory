import axios, { AxiosError } from 'axios';

export function getToken() {
  return sessionStorage.getItem('access_token');
}

function setToken(token: string) {
  sessionStorage.setItem('access_token', token);
}

interface RegisterResponseDataInterface {
  success: boolean;
  error?: string;
}

export async function register(username: string, password: string) {
  try {
    const response = await axios.post<RegisterResponseDataInterface>('/sign-up', { username, password });

    // Something unexpected went wrong
    if (!response.data.success) {
      throw new Error('The request was not successful');
    }
  } catch (e) {
    if (e instanceof Error) {
      throw new Error((e as AxiosError).response?.data.error);
    }

    throw new Error('Unexpected error')
  }
}
