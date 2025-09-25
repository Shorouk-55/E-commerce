import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateHeaderName } from 'node:http';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {

  private readonly fb = inject(FormBuilder)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly cartService = inject(CartService)


  id: string | null = null

  checkoutForm!: FormGroup
  ngOnInit(): void {
    this.initForm()
    this.getCartId()
  }

  initForm(): void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')]],
        city: [null, [Validators.required]]
      })
    })

  }


  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id')
        console.log(this.id)
      },
      error: (err) => {
        console.error(err)
      }
    })
  }


  submitForm(): void {
    if (this.checkoutForm.valid) {
      console.log(this.checkoutForm.value)
      console.log(this.id)
      this.cartService.checkoutSession(this.id, this.checkoutForm.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.status === 'success') {
            window.open(res.session.url, '_self')
          }
        },
        error: (err) => {
          console.error(err)
        }
      })

    }
    else {
      this.checkoutForm.markAllAsTouched()
    }
  }



}


