import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulerProductsComponent } from './populer-products.component';

describe('PopulerProductsComponent', () => {
  let component: PopulerProductsComponent;
  let fixture: ComponentFixture<PopulerProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopulerProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopulerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
