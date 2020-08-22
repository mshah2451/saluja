import { TestBed } from '@angular/core/testing';

import { FileDowmloaderService } from './file.dowmloader.service';

describe('File.DowmloaderService', () => {
  let service: FileDowmloaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileDowmloaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
