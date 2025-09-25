import { Component, inject } from '@angular/core';
import { BrandService } from '../service/brand.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-spacific-brand',
  imports: [],
  templateUrl: './spacific-brand.component.html',
  styleUrl: './spacific-brand.component.css'
})
export class SpacificBrandComponent {
  private readonly brandService = inject(BrandService)
  private readonly activatedRoute = inject(ActivatedRoute)
  brandId = this.activatedRoute.snapshot.paramMap.get('id') || ''
  brandDetails = toSignal(this.brandService.getSpecificBrand(this.brandId).pipe(map(res => {
    return res.data
  })), { initialValue: null })
}
