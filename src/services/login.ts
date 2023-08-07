import { API } from 'constants/routes';
import getUrl from '../style/utils/getUrl';

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const url = getUrl(API.Login, {
    username,
    password,
  });

  const response = await fetch(url);
  const data = await response.json();
  const { token } = data;

  return token;
};
