import { CookieService } from 'ngx-cookie-service';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const blankGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService)
  const router = inject(Router)
  // لو كان المستخدم مسجل دخول بالفعل ماينفعش يرجع تاني لصفحة تسجيل الدخول او التسجيل 
  if (cookieService.get('token')) {
    router.parseUrl('/home');
    return false;
  }
  else {

    return true;
  }
};
