import { FilterPipe } from './../../shared/pipes/filter-pipe';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CardComponent } from "../../shared/components/card/card.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from "@angular/forms";
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, FilterPipe, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
  providers: [FilterPipe]
})
export class ProductsComponent {
  private readonly productsService = inject(ProductsService)

  pageSize!: number
  p!: number
  total!: number
  searchTerm: WritableSignal<string> = signal('')
  pageSignal: WritableSignal<number> = signal(1);

  allproducts = toSignal(
    toObservable(this.pageSignal).pipe(
      switchMap(page => this.productsService.getProducts(page).pipe(
        map(res => {
          this.p = res.metadata.currentPage;
          this.pageSize = res.metadata.limit;
          this.total = res.results;
          return res.data;
        })
      ))
    ),
    { initialValue: [] }
  );

  onPageChange(page: number) {
    this.pageSignal.set(page);
  }

  clearSearch(): void {
    this.searchTerm.set('')
  }

  // old code 
  // allproducts!: products[];
  // searchTerm: string = ''

  // pageSize!: number
  // p!: number
  // total!: number
  // ngOnInit(): void {
  //   this.getProductsData()
  // }
  // getProductsData(pageNumber: number = 1) {
  //   this.productsService.grtProducts(pageNumber).subscribe({
  //     next: (res) => {
  //       console.log(res.data)
  //       this.allproducts = res.data
  //       this.pageSize = res.metadata.limit
  //       this.p = res.metadata.currentPage
  //       this.total = res.results
  //     }
  //   })
  // }
}
