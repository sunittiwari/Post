import { TestBed, inject } from '@angular/core/testing';

import { PostdetailsService } from './postdetails.service';

describe('PostdetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostdetailsService]
    });
  });

  it('should be created', inject([PostdetailsService], (service: PostdetailsService) => {
    expect(service).toBeTruthy();
  }));
});
