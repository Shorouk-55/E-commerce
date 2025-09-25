import { Component, inject, OnInit } from '@angular/core';
import { AllCategoriesService } from './services/all-categories.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ACategory } from './models/category.interface';
import { FilterPipe } from '../../shared/pipes/filter-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catergories',
  imports: [NgxPaginationModule, FormsModule, FilterPipe, RouterLink],
  templateUrl: './catergories.component.html',
  styleUrl: './catergories.component.css'
})
export class CatergoriesComponent implements OnInit {
  private readonly allCategoriesService = inject(AllCategoriesService)
  allCategoriesData: ACategory[] = []

  pageSize!: number
  p!: number
  total!: number

  test: string = ''

  ngOnInit(): void {
    this.getAllCategoriesData()
  }
  getAllCategoriesData(pageNumber: number = 1): void {
    this.allCategoriesService.allCategories(pageNumber).subscribe({
      next: (res) => {
        console.log(res)
        this.allCategoriesData = res.data
        console.log(this.allCategoriesData)
        this.pageSize = res.metadata.limit
        this.p = res.metadata.currentPage
        this.total = res.results
      }
    })
  }

  // getSpacificCategory(): void {
  //   this.allCategoriesService.spacificCategory()
  // }
}
