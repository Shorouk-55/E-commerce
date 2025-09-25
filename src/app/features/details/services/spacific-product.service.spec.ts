import { TestBed } from '@angular/core/testing';

import { SpacificProductService } from './spacific-product.service';

describe('SpacificProductService', () => {
  let service: SpacificProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpacificProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
