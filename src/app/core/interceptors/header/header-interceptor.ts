import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  // any thing done on request write here
  let cookieService = inject(CookieService)

  req = req.clone({
    setHeaders: {
      token: cookieService.get('token')
    }
  })



  return next(req); // anything done on responce write here
};
