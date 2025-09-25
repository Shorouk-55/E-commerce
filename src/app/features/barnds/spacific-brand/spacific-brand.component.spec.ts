import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacificBrandComponent } from './spacific-brand.component';

describe('SpacificBrandComponent', () => {
  let component: SpacificBrandComponent;
  let fixture: ComponentFixture<SpacificBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpacificBrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacificBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
