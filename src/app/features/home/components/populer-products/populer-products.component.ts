import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { products } from '../../../../core/models/product/products.interface';
import { ProductsService } from '../../../../core/services/products/products.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-populer-products',
  imports: [CardComponent],
  templateUrl: './populer-products.component.html',
  styleUrl: './populer-products.component.css'
})
export class PopulerProductsComponent {
  private readonly productsService = inject(ProductsService)

  // new code
  allproducts = toSignal<products[]>(this.productsService.getProducts().pipe(map((res: any) => {
    return res.data.slice(0, 12)
  }),));


  // old code
  // ngOnInit(): void {
  //   this.getProductsData()
  // }
  // getProductsData() {
  //   this.productsService.grtProducts().subscribe({
  //     next: (res: data) => {
  //       console.log(res.data)
  //       this.allproducts = res.data
  //     },
  //     error: (err) => {
  //       console.log(err)
  //     }
  //   })
  // }
}


