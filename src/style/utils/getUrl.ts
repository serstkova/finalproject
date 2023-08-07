import qs from 'query-string';
import { API } from 'constants/routes';

const getUrl = (endpoint: API, params?: Record<string, any>) => {
  const query = qs.stringify(params || {});

  return `${process.env.REACT_APP_API_URL}/${endpoint}${query ? `?${query}` : ''}`;
};

export default getUrl;
