import { CurrencyPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendingMachineItem } from '../interfaces/vending-machine-item';

import { VendingMachineItemComponent } from './vending-machine-item.component';

describe('VendingMachineItemComponent', () => {
  let component: VendingMachineItemComponent;
  let fixture: ComponentFixture<VendingMachineItemComponent>;

  let item: VendingMachineItem;
  let currencyPipe: CurrencyPipe;

  beforeEach(async () => {
    item = {
      id: 'item-2',
      name: 'Pepsi',
      image: '/assets/images/pepsi.png',
      quantity: 15,
      price: 1.8,
    };

    await TestBed.configureTestingModule({
      declarations: [VendingMachineItemComponent],
      providers: [CurrencyPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(VendingMachineItemComponent);
    currencyPipe = TestBed.inject(CurrencyPipe);

    component = fixture.componentInstance;
    component.item = item;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render', () => {
    const itemElement: HTMLElement = fixture.nativeElement;
    expect(itemElement.querySelector('img')?.src).toContain(item.image);
    expect(itemElement.querySelector('button span')?.textContent?.trim()).toBe(
      item.quantity.toString()
    );
    expect(itemElement.querySelector('.price')?.textContent?.trim()).toBe(
      currencyPipe.transform(item.price) as string
    );
  });
});
