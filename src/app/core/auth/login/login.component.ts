import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  messageError: string = '';
  isLoading: Boolean = false;
  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)
  private readonly cookieService = inject(CookieService)

  subscribtion: Subscription = new Subscription();

  // formLogin: FormGroup = new FormGroup({
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
  // });
  ngOnInit(): void {
    this.initForm()
  }

  formLogin!: FormGroup
  initForm(): void {
    this.formLogin = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
    })
  }

  login(): void {
    if (this.formLogin.valid) {
      this.subscribtion.unsubscribe();
      this.isLoading = true;
      // console.log(this.formLogin.value);
      this.subscribtion = this.authService.getUserSinginData(this.formLogin.value).subscribe({
        next: (response) => {
          this.messageError = ''
          this.isLoading = false;
          console.log(response);
          if (response.message === 'success') {

            this.cookieService.set('token', response.token),
              // use this to decode token in console
              console.log(this.authService.decodedToken());
            setTimeout(() => {
              this.router.navigate(['/home'])
            }, 1500);
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
          this.messageError = error.error.message;
          console.log(this.messageError)
        }
      });
    }
    else {
      this.formLogin.markAllAsTouched();
    }
  }

}
