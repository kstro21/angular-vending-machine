import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { VendingMachineItem } from '../interfaces/vending-machine-item';
import { VendingMachineStore } from '../store/vending-machine.store';

import { VendingMachineService } from './vending-machine.service';

describe('VendingMachineService', () => {
  let service: VendingMachineService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let item: VendingMachineItem;
  let itemsStore: jasmine.SpyObj<VendingMachineStore>;

  beforeEach(() => {
    item = {
      id: 'item-2',
      name: 'Pepsi',
      image: '/assets/images/pepsi.png',
      quantity: 15,
      price: 1.8,
    };

    const itemsStoreSpy = jasmine.createSpyObj('VendingMachineStore', ['updateItemQuantity']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VendingMachineService, { provide: VendingMachineStore, useValue: itemsStoreSpy }],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);

    service = TestBed.inject(VendingMachineService);
    itemsStore = TestBed.inject(VendingMachineStore) as jasmine.SpyObj<VendingMachineStore>;
  });

  afterEach(() => {
    httpTestingController.verify();
    itemsStore.updateItemQuantity.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if no item provided', () => {
    expect(service.buyItem(null, 0)).toBe(false);
  });

  it('should return false if no enough balance', () => {
    expect(service.buyItem(item, 0)).toBe(false);
  });

  it('should return false if the item is sold out', () => {
    item.quantity = 0;
    expect(service.buyItem(item, 0)).toBe(false);
  });

  it('should return true', () => {
    expect(service.buyItem(item, item.price + 1)).toBe(true);

    expect(itemsStore.updateItemQuantity).toHaveBeenCalledOnceWith(item.id, item.quantity - 1);
  });
});
