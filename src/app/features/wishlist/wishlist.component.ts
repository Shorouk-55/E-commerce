import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from './wishlist.service';
import { Wishlist } from './models/wishlist.interface';
import { SplitPipe } from '../../shared/pipes/split-pipe';
import { CartService } from '../cart/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [SplitPipe, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService)
  private readonly cartService = inject(CartService)
  private readonly toastrService = inject(ToastrService)


  wishListSet: Wishlist[] = []
  // array of items[] 
  ngOnInit() {
    // if (!this.wishlistService.wishlistLoaded.value) {
    //   this.loadWishlistFromServer();
    // }

    this.checkLoading()
  }

  checkLoading() {
    this.wishlistService.wishlistLoaded.subscribe({
      next: () => {
        return this.wishlistService.getloggedUserWishList()
          .subscribe((res) => this.wishListSet = res.data || [])
      }
    })
  }

  // loadWishlistFromServer(): void {
  //   this.wishlistService.getloggedUserWishList().subscribe({
  //     next: (res) => {
  //       this.wishListSet = res.data
  //       console.log(this.wishListSet)
  //     }
  //   })
  // }


  addToCart(id: string): void {
    this.cartService.addProduct(id).subscribe({
      next: (res) => {
        console.log(res)
        if (res.status === 'success') {
          this.toastrService.success(res.message)
        }
      }
    })
  }


  removeFromWishlist(id: string): void {
    this.wishlistService.removeWishListProduct(id).subscribe({
      next: (res) => {
        console.log(res)
        if (res.status === 'success') {
          // إزالة العنصر من المصفوفة محلياً
          this.wishListSet = this.wishListSet.filter(item => item._id !== id) || [];

          this.toastrService.success(res.message)
        }
      }
    })
  }

}
