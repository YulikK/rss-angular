import { HttpInterceptorFn } from '@angular/common/http';

const API_KEY = 'AIzaSyDeYlbRUiIBT8XRjWMqIrD2NbVdcdj5cN4';
const API_URL = 'https://www.googleapis.com/youtube/v3/';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const url = `${API_URL}${req.url}`;
  const request = req.clone({
    url,
    setParams: {
      key: API_KEY,
    },
  });
  return next(request);
};
