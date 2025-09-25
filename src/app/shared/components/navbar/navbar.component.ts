import { Component, computed, HostListener, inject, Input, input, OnDestroy, OnInit, PLATFORM_ID, Signal, signal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/service/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {


  scroll: boolean = false
  @HostListener('window:scroll') onScroll(): void {
    if (scrollY > 0) {
      this.scroll = true
    }
    else {
      this.scroll = false
    }
  }



  private readonly authService = inject(AuthService)
  private readonly cartService = inject(CartService)
  private readonly id = inject(PLATFORM_ID)
  count: Signal<number> = computed(() => this.cartService.count())

  @Input({ required: true }) isLogin!: boolean


  constructor(private flowbiteService: FlowbiteService) { }

  ngOnInit(): void {
    this.flowbite()
    if (isPlatformBrowser(this.id)) {
      this.getAllDataCart()
    }
  }

  getAllDataCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.count.set(res.numberOfItems)
      }
    })
  }


  flowbite() {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }



  singOut(): void {
    this.authService.logOut()
  }
}
