import { products } from './../../core/models/product/products.interface';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './service/cart.service';
import { CurrencyPipe } from '@angular/common';
import { CarouselModule } from "ngx-owl-carousel-o";
import { RouterLink } from '@angular/router';
import { catchError, debounceTime, map, of, Subject, switchMap } from 'rxjs';
import { Cart, CartModel, Product2 } from './models/cart.interface';
import { AuthService } from '../../core/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, CarouselModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService)
  private readonly cookieService = inject(CookieService)
  updateCountSubject = new Subject<Product2>
  mesg: boolean = false
  allProducts: Cart = new CartModel()
  numberOfItems!: number
  counter: number[] = []
  ngOnInit(): void {
    if (this.cookieService.check('token')) {
      this.getLoggedUserCartData();
    }

    this.updateCountSubject.pipe(
      debounceTime(700),
      switchMap((res) => {
        return this.cartService.updateCartProductQuantity(res.product._id, res.count).pipe(
          map((res) => {
            console.log(res);
            return res.data;
          }), catchError(() => {
            return of([new CartModel()])
          })
        );
      })
    ).subscribe({
      next: (res) => {
        this.getLoggedUserCartData()
      }
    });
  }


  getLoggedUserCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.allProducts = res.data as Cart
        this.numberOfItems = res.numOfCartItems
        console.log(this.allProducts)
        for (let x of this.allProducts.products) {

          this.counter.push(x.count)
        }
      }
      ,
    })
  }

  deleteItemOfCard(itemId: string): void {
    this.cartService.removeSpacificItem(itemId).subscribe({
      next: (res) => {
        this.allProducts = res.data;
        this.numberOfItems = res.numOfCartItems
        this.cartService.count.set(res.numOfCartItems)
        console.log(res)
      }
    })
  }
  increaseCartItem(item: Product2, index: number) {
    this.counter[index] += 1
    console.log(this.counter, index)
    const cartona = { ...item, count: this.counter[index] }
    this.updateProductQuantity(cartona)
  }
  updateCartItem(item: Product2, index: number) {
    // this.counter[index] -= 1
    // console.log(this.counter, index)
    const cartona = { ...item, count: this.counter[index] }
    this.updateProductQuantity(cartona)
  }
  updateProductQuantity(cartona: Product2): void {
    this.updateCountSubject.next(cartona)
    // this.cartService.updateCartProductQuantity(itemId, count).pipe().subscribe({
    //   next: (res) => {
    //     this.allProducts = res.data;
    //     console.log(res)

    //   },
    //   error: (err) => {
    //     console.log(err)
    //   }
    // })
  }

  deleteAllProducts(): void {
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
        this.allProducts = {} as Cart;
        this.numberOfItems = res.numOfCartItems
        console.log(res)
      }
    })
  }
}



