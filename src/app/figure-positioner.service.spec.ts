import { TestBed } from '@angular/core/testing';

import { FigurePositionerService } from './figure-positioner.service';

describe('FigurePositionerService', () => {
  let service: FigurePositionerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FigurePositionerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
