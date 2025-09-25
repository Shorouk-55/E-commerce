// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { map, Observable } from 'rxjs';
// import { environment } from '../../../../environments/environment.development';
// import { data, products } from '../../models/product/products.interface';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductsService {
//   private readonly httpClient = inject(HttpClient)


//   grtProducts(): Observable<data> {
//     return this.httpClient.get<data>(environment.baseUrl + 'products').pipe(map((res: any) => {
//       return res.data
//     }))
//   }
// }



import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { data, products } from '../../models/product/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient)


  getProducts(pageNumper: number = 1): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `products?page=${pageNumper}`)
  }
}
