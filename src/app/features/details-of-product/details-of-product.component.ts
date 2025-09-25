import { Component, inject, OnInit } from '@angular/core';
import { AllCategoriesService } from '../catergories/services/all-categories.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../core/models/category.interface';

@Component({
  selector: 'app-details-of-product',
  imports: [],
  templateUrl: './details-of-product.component.html',
  styleUrl: './details-of-product.component.css'
})
export class DetailsOfProductComponent implements OnInit {
  private readonly allCategoriesService = inject(AllCategoriesService)
  private readonly activatedRoute = inject(ActivatedRoute)
  id: string | null = null
  categoryDetails: Category = {} as Category
  ngOnInit(): void {
    this.getActivatedRouteData()
    this.getCategoryDetails()
  }
  getActivatedRouteData(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (routeData) => {
        console.log(routeData.get('id'))
        this.id = routeData.get('id')
      }
    })
  }


  getCategoryDetails(): void {
    this.allCategoriesService.spacificCategory(this.id).subscribe({
      next: (res) => {
        console.log(res)
        this.categoryDetails = res.data
        console.log(this.categoryDetails)
      }
    })
  }

}
