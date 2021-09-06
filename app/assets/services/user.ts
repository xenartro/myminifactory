import axios, { AxiosError, AxiosResponse } from 'axios';

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

export async function login(username: string, password: string) {
  try {
    const response = await axios.post<RegisterResponseDataInterface>('/login', { username, password });

    // Something unexpected went wrong
    if (!response.data.success || !response.headers['x-auth-token']) {
      throw new Error('The request was not successful');
    }

    // All good, store token
    setToken(response.headers['x-auth-token']);
  } catch (e) {
    if (e instanceof Error) {
      throw new Error((e as AxiosError).response?.data.error || e.message);
    }

    throw new Error('Unexpected error')
  }
}

export interface UserListDataInterface {
  username: string;
}

export async function getRegisteredUsers() {
  try {
    const response: AxiosResponse<{ data: UserListDataInterface[] }> = await axios({
      method: 'get',
      url: '/app/users',
      headers: {
        'X-AUTH-TOKEN': getToken()
      }
    });

    return response.data.data;
  } catch (e) {
    if (e instanceof Error && (e as AxiosError).response?.status === 401) {
      setToken('');
      // TODO: something more elegant than this. This should be more than enough
      // for a comprehensive reader.
      window.location.replace('/');
    }
  }

  return [];
}
