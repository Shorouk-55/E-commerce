import { NgxSpinnerConfig } from './../../../../../node_modules/ngx-spinner/lib/config.d';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { finalize } from 'rxjs';

export const loadingScreenInterceptor: HttpInterceptorFn = (req, next) => {


  let ngxSpinnerService = inject(NgxSpinnerService)
  ngxSpinnerService.show()
  return next(req).pipe(
    finalize(() => ngxSpinnerService.hide())
  );
};
