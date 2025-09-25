import { ChangeDetectionStrategy, Component, inject, input, Input, OnInit } from '@angular/core';
import { products, data } from '../../../core/models/product/products.interface';
import { ProductsComponent } from '../../../features/products/products.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CurrencyPipe, NgIf } from '@angular/common';
import { SplitPipe } from '../../pipes/split-pipe';
import { CartService } from '../../../features/cart/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../features/wishlist/wishlist.service';

@Component({
  selector: 'app-card',
  imports: [SplitPipe, RouterLink, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  // old code

  // new code
  allproducts = input.required<products[]>()
  itemsPerpage = input<number>()
  currentPage = input<number>()
  totalItems = input<number>()


  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)
  private readonly wishlistService = inject(WishlistService)


  addProductToCart(idCart: string): void {
    this.cartService.addProduct(idCart).subscribe(
      {
        next: (res) => {
          if (res.status === 'success') {
            this.toastrService.success(res.message)
            this.cartService.count.set(res.numOfCartItems)
          }
          // Optionally handle specific parts of the response here if needed
        }
      }
    )
  }

  // WishList Part

  wishListSet: string[] = []
  ngOnInit() {
    if (!this.wishlistService.wishlistLoaded) {
      this.loadWishlistFromServer();
    }
  }

  loadWishlistFromServer(): void {
    this.wishlistService.getloggedUserWishList().subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

  addProductToWishList(productId: string, event: Event): void {
    event.stopPropagation();
    this.wishlistService.addToWishList(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.wishListSet = res.data
          console.log(this.wishlistService.wishlistLoaded.value);
          this.wishlistService.wishlistLoaded.next(false)

          console.log(this.wishListSet);
          // this.wishlistService.wishlistSet.set(res.data)
          this.toastrService.success(res.message);
        }
      }
    });
  }

  removeProductFromWishList(productId: string, event: Event): void {
    event.stopPropagation();
    this.wishlistService.removeWishListProduct(productId).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.wishListSet = res.data
          console.log(this.wishListSet);
          // this.wishlistService.wishlistSet.set(res.data)

          this.toastrService.success(res.message);
        }
      }
    });
  }

  isInWishlist(productId: string) {

    return this.wishListSet.includes(productId)
  }
}
