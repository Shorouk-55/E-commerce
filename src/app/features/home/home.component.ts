import { Component, inject, OnInit } from '@angular/core';
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { PopulerCategoriesComponent } from "./components/populer-categories/populer-categories.component";
import { PopulerProductsComponent } from "./components/populer-products/populer-products.component";
import { WishlistComponent } from "../wishlist/wishlist.component";

@Component({
  selector: 'app-home',
  imports: [MainSliderComponent, PopulerCategoriesComponent, PopulerProductsComponent, WishlistComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
