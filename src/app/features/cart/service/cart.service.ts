import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient = inject(HttpClient)
  constructor(private http: HttpClient) {
    // تحميل العدد الحقيقي عند بداية الخدمة
    this.loadInitialCartCount();
  }
  private readonly cookieService = inject(CookieService)
  myoptions: object = {
    headers: {
      token: this.cookieService.get('token')
    }
  }
  count: WritableSignal<number> = signal(0)



  private loadInitialCartCount(): void {
    // تحققي من وجود الـ token قبل استدعاء الـ API
    if (this.cookieService.check('token')) {
      this.getLoggedUserCart().subscribe({
        next: (res) => {
          const items = res.numOfCartItems ?? res.numberOfItems ?? 0;
          this.count.set(items);
        },
        error: (err) => {
          console.log('Cart count error:', err);
          this.count.set(0); // fallback لو حصل خطأ
          // لو الـ token expired، امسحيه
          if (err.status === 401) {
            this.cookieService.delete('token');
          }
        }
      });
    } else {
      // لو مفيش token، خلي الـ count = 0
      this.count.set(0);
    }
  }



  addProduct(id: string): Observable<any> {
    console.log(id)
    return this.httpClient.post(environment.baseUrl + 'cart',
      {
        productId: id
      }
    )
  }

  getLoggedUserCart(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'cart'
    )
  }


  removeSpacificItem(itemId: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `cart/${itemId}`)
  }


  updateCartProductQuantity(itemId: string, count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `cart/${itemId}`,
      {
        count: count
      })
  }

  clearUserCart(): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + 'cart')
  }


  checkoutSession(id: string | null, data: object): Observable<any> {
    return this.httpClient.post(environment.baseUrl + `orders/checkout-session/${id}?url=http://localhost:4200`, data)
  }

}
