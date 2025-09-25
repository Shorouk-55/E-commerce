import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarndsComponent } from './barnds.component';

describe('BarndsComponent', () => {
  let component: BarndsComponent;
  let fixture: ComponentFixture<BarndsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarndsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarndsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
