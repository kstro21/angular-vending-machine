import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingMachineSlotComponent } from './vending-machine-slot.component';

describe('VendingMachineSlotComponent', () => {
  let component: VendingMachineSlotComponent;
  let fixture: ComponentFixture<VendingMachineSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendingMachineSlotComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendingMachineSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
