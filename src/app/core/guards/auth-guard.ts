import { CookieService } from 'ngx-cookie-service';
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService)
  const router = inject(Router)
  // لو المستخدم مش مسجل دخول مينفعش يدخل على الصفحات التانيه غير صفحه تسجيل الدخول او التسجيل فلو سجل دخول بيروح على الصفحه الرئيسيه
  // لو كان المستخدم مسجل دخول بالفعل بيروح على الصفحه الرئيسيه
  if (cookieService.get('token')) {
    return true;
  }
  // طب لو مش مسجل دخول بيروح على صفحه تسجيل الدخول
  else {
    router.navigate(['/login']);
    return false;
  }
};
