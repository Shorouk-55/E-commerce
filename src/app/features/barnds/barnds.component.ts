import { Component, inject, signal } from '@angular/core';
import { BrandService } from './service/brand.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/pipes/filter-pipe';
import { CommonModule } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-barnds',
  imports: [NgxPaginationModule, FormsModule, FilterPipe, CommonModule, RouterLink],
  templateUrl: './barnds.component.html',
  styleUrl: './barnds.component.css'
})
export class BarndsComponent {
  private readonly brandService = inject(BrandService)
  pageSize!: number
  p!: number
  total!: number
  search = signal('')
  // allBrands: Brand[] = []
  pageSignal = signal(1)
  allBrands = toSignal(
    toObservable(this.pageSignal).pipe(
      switchMap(page => this.brandService.getAllbrands(page).pipe(map(res => {
        this.pageSize = res.metadata.limit;
        this.p = this.pageSignal();
        this.total = res.results;
        return res.data || []
      }))
      )
    ),
    { initialValue: [] }

  )
  onpageChange(page: number): void {
    this.pageSignal.set(page)
  }

  clearSearch(): void {
    this.search.set('')
  }



  // ngOnInit(): void {
  //   this.getAllBrandsData()
  // }

  // getAllBrandsData(pageNumber: number = 1): void {
  //   this.brandService.getAllbrands(pageNumber).subscribe({
  //     next: (res) => {
  //       this.allBrands = res.data
  //       console.log(res)
  //       this.pageSize = res.metadata.limit
  //       this.p = res.metadata.currentPage
  //       this.total = res.results
  //     }
  //   })
  // }




}
