import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { jwtDecode } from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
import { OrderService } from '../checkout/services/order.service';
import { Order } from '../../core/models/order.interface';
import { SlicePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {
  private readonly authService = inject(AuthService)
  private readonly cookieService = inject(CookieService)
  private readonly orderService = inject(OrderService)

  allorders: Order[] = []

  ngOnInit(): void {
    this.orderService.getUserId()
    this.getUserAllOrderds()
  }

  getUserAllOrderds(): void {
    this.orderService.getAllOrders().subscribe({
      next: (res) => {
        this.allorders = res
        console.log(this.allorders)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }






}
