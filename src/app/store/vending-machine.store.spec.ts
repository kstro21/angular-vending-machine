import { TestBed } from '@angular/core/testing';

import { VendingMachineStore } from './vending-machine.store';

describe('VendingMachineStore', () => {
  let service: VendingMachineStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VendingMachineStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
