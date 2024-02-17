import { TestBed } from '@angular/core/testing';

import { EsternalService } from './esternal.service';

describe('EsternalService', () => {
  let service: EsternalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EsternalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
