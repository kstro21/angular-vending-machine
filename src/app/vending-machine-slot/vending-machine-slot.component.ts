import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-vending-machine-slot',
  templateUrl: './vending-machine-slot.component.html',
  styleUrls: ['./vending-machine-slot.component.css'],
})
export class VendingMachineSlotComponent {
  denominations = [
    { value: 0.1, styleClass: 'btn-secondary' },
    { value: 0.2, styleClass: 'btn-secondary' },
    { value: 0.5, styleClass: 'btn-secondary' },
    { value: 1, styleClass: 'btn-warning' },
  ];

  @Input()
  totalAmount = 0;

  @Output()
  changeAmount = new EventEmitter<number>();

  get hasAmount(): boolean {
    return this.totalAmount > 0;
  }

  coinClick(value: number): void {
    this.totalAmount += value;

    this.changeAmount.emit(this.totalAmount);
  }
}
