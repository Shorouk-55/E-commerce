import { DecodedToken } from './../../../core/models/decoded-token.interface';
import { AuthService } from './../../../core/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnInit {
  private readonly httpClient = inject(HttpClient)
  private readonly authService = inject(AuthService)
  private readonly cookieService = inject(CookieService)
  decodedToken: DecodedToken | null = {} as DecodedToken
  userId!: string

  ngOnInit(): void {
    this.getUserId()
  }
  getUserId(): void {
    this.decodedToken = this.authService.decodedToken() as DecodedToken
    this.userId = this.decodedToken.id

  }
  getAllOrders(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `orders/user/${this.userId}`)
  }

}
