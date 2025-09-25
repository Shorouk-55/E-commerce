import { Component, inject, OnInit } from '@angular/core';
import { InputComponent } from "../../../../shared/components/input/input.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forget-password',
  imports: [InputComponent, ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly cookieService = inject(CookieService)
  step: number = 1
  ngOnInit(): void {
    this.initForm()

  }



  emailForm!: FormGroup
  verifyForm!: FormGroup
  resetForm!: FormGroup

  initForm(): void {
    this.emailForm = this.fb.group({
      email: [null, [Validators.required]]
    })
    this.verifyForm = this.fb.group({
      resetCode: [null, [Validators.required]]
    })
    this.resetForm = this.fb.group({
      email: [null, [Validators.required]],
      newPassword: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
    })
  }


  formStep1(): void {
    if (this.emailForm.valid) {
      this.authService.forgotPassword(this.emailForm.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.statusMsg === 'success') {
            this.step += 1
          }
        }
      })
    }

  }
  formStep2(): void {
    if (this.verifyForm.valid) {
      this.authService.verifyCode(this.verifyForm.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.status === 'Success') {
            this.step += 1
          }
        }
      })
    }

  }
  formStep3(): void {
    if (this.resetForm.valid) {
      this.authService.resetPassword(this.resetForm.value).subscribe({
        next: (res) => {
          console.log(res)
          this.cookieService.set('token', res.token)
          this.router.navigate(['/home'])
        }
      })
    }

  }
}
