import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './features/home/home.component';
import { BarndsComponent } from './features/barnds/barnds.component';
import { ProductsComponent } from './features/products/products.component';
import { CatergoriesComponent } from './features/catergories/catergories.component';
import { DetailsComponent } from './features/details/details.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { CartComponent } from './features/cart/cart.component';
import { authGuard } from './core/guards/auth-guard';
import { blankGuard } from './core/guards/blank-guard';
import { AllordersComponent } from './features/allorders/allorders.component';
import { ForgetPasswordComponent } from './core/auth/forgetPassword/forget-password/forget-password.component';
import { DetailsOfProductComponent } from './features/details-of-product/details-of-product.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { SpacificBrandComponent } from './features/barnds/spacific-brand/spacific-brand.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // auth
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: ([blankGuard]),
        children: [
            { path: 'login', component: LoginComponent, title: 'login page' },
            { path: 'register', component: RegisterComponent, title: 'register page' },
            { path: 'forgetpassword', component: ForgetPasswordComponent, title: 'ForgetPassword page' }
        ]
    },
    // blank
    {
        path: '',
        component: BlankLayoutComponent,
        canActivate: ([authGuard]),
        children: [
            { path: 'home', component: HomeComponent, title: 'home page' },
            { path: 'brands', component: BarndsComponent, title: 'brands page' },
            { path: 'products', component: ProductsComponent, title: 'products page' },
            { path: 'wishlist', component: WishlistComponent, title: 'wishlist page' },
            { path: 'categories', component: CatergoriesComponent, title: 'categories page' },
            { path: 'details/:slug/:id', component: DetailsComponent, title: 'details page' },
            { path: 'details/:id', component: DetailsComponent, title: 'details page' },
            { path: 'checkout/:id', component: CheckoutComponent, title: 'checkout page' },
            { path: 'spacificBrand/:id', component: SpacificBrandComponent, title: 'Brand details' },
            { path: 'cart', component: CartComponent, title: 'cart page' },
            { path: 'allorders', component: AllordersComponent, title: 'allOrders' },
            { path: 'details-of-product/:id', component: DetailsOfProductComponent, title: 'detailsOfCategory' },
        ]
    },
    { path: '**', component: NotfoundComponent, title: 'notfound' }
];
