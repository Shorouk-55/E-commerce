import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../../core/services/category/category.service';
import { Category } from '../../../../core/models/category.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-populer-categories',
  imports: [CarouselModule],
  templateUrl: './populer-categories.component.html',
  styleUrl: './populer-categories.component.css'
})
export class PopulerCategoriesComponent implements OnInit {
  private readonly categoryService = inject(CategoryService)
  ngOnInit(): void {
    this.getCategoriesData()
  }
  allCategories!: Category[]
  getCategoriesData() {
    this.categoryService.getCategoryies().subscribe({
      next: (res) => {
        console.log(res.data)
        this.allCategories = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  categoriesOptions: OwlOptions = {
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 1000,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }
}


