import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient)
  private readonly cookieService = inject(CookieService)
  private readonly router = inject(Router)
  getUserSignupData(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signup', data);
  }
  getUserSinginData(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/signin', data);
  }

  logOut(): void {
    // remove token from cookies
    this.cookieService.delete('token')

    // redirect to login page
    this.router.navigate(['/login'])

  }

  decodedToken() {
    console.log(this.cookieService.get('token'));
    let token;
    try {
      token = jwtDecode(this.cookieService.get('token'));
    } catch (error) {
      this.logOut()
    }
    return token;
  }


  // forgot password

  forgotPassword(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/forgotPasswords', data)
  }

  verifyCode(data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/verifyResetCode', data)
  }
  resetPassword(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + 'auth/resetPassword', data)
  }

}
