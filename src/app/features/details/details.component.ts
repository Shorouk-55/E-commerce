import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacificProductService } from './services/spacific-product.service';
import { ObjectUnsubscribedError } from 'rxjs';
import { products } from '../../core/models/product/products.interface';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartService } from '../cart/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly spacificProductService = inject(SpacificProductService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)


  id: string | null = null
  photos!: string[]

  productData: products = {} as products

  ngOnInit(): void {
    this.getActiveRouteDetails()
    this.getProductDetails()
  }
  getActiveRouteDetails(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (routeData) => {
        // console.log(routeData.get('id'))
        this.id = routeData.get('id')
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  getProductDetails(): void {
    this.spacificProductService.productDetails(this.id).subscribe({
      next: (res) => {
        this.productData = res.data
        console.log(this.productData)
        this.photos = res.data.images
        console.log(this.photos)

      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    navSpeed: 700,
    // navText: ['', ''],
    items: 1,
    nav: false
  }



  addProductToCart(idCart: string): void {
    this.cartService.addProduct(idCart).subscribe(
      {
        next: (res) => {
          if (res.status === 'success') {
            this.toastrService.success(res.message)
          }
          console.log(res)
        },
        error: (err) => {
          console.log(err)
        },
      }
    )
  }
}