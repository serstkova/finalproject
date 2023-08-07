
import { API } from 'constants/routes';
import { getToken } from 'constants/auth';
import getUrl from 'style/utils/getUrl';
import { UserDTO } from '../../types';

export const getUser = async (): Promise<UserDTO> => {
  const url = getUrl(API.User);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  const data: UserDTO = await response.json();

  return data;
};
