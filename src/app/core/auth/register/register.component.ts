import { Subscription } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  subscription: Subscription = new Subscription();
  errorMassage: string = '';
  isLoading: boolean = false;
  flag: boolean = true;

  private readonly authService = inject(AuthService)
  // to navigate after success register to login page using Programmatic navigation=>(Router)
  private readonly router = inject(Router)
  private readonly fb = inject(FormBuilder)

  //! old way to create form without FormBuilder
  // formRegister: FormGroup = new FormGroup({
  //   name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
  //   rePassword: new FormControl(null, [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]),
  //   phone: new FormControl(null, [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')]),
  // }, { validators: this.confirmPassword });

  formRegister!: FormGroup
  // create function to give values for the property (best practice )
  initFormGroup() {
    this.formRegister =
      this.fb.group({
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern('^[A-Za-z\d]{6,}$')]], //old pattern -> '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        rePassword: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern('^01[0125][0-9]{8}$')]],
      }, {
        validators: this.confirmPassword
      })
  }
  ngOnInit(): void {
    this.initFormGroup()
  }



  // make sure that the value of password is the same of the repassword 
  confirmPassword(group: AbstractControl) {
    if (group.get('password')?.value === group.get('rePassword')?.value) {
      return null
    }
    else {
      group.get('rePassword')?.setErrors({ mismached: true })
      return { mismached: true }
    }
  }

  register(): void {
    if (this.formRegister.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;
      console.log(this.formRegister.value);
      this.subscription = this.authService.getUserSignupData(this.formRegister.value).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log(response);
          if (response.message === 'success') {
            setTimeout(() => {
              this.router.navigate(['/login'])
            }, 1500);
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.log(error);
          this.errorMassage = error.error.message;
          console.log(this.errorMassage)
        }
      });
    }
    else {
      this.formRegister.markAllAsTouched();
    }
  }
}
