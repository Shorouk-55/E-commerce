import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Injectable({
    providedIn: 'root'
})
export class WishlistService {
    wishlistLoaded = new BehaviorSubject<boolean>(false);
    cachedData: string[] = [];
    private readonly httpClient = inject(HttpClient)
    addToWishList(productId: string): Observable<any> {
        return this.httpClient.post(environment.baseUrl + 'wishlist',
            {
                productId: productId
            }
        )
    }
    removeWishListProduct(productId: string): Observable<any> {
        return this.httpClient.delete(environment.baseUrl + `wishlist/${productId}`)
    }
    getloggedUserWishList(): Observable<any> {

        if (!this.wishlistLoaded.getValue()) {
            this.wishlistLoaded.next(true);
            return this.httpClient.get(environment.baseUrl + 'wishlist')
        }
        else {
            return of(this.cachedData); // إعادة استخدام البيانات
        }
    }
}

