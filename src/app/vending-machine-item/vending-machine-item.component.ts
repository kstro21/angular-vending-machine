import { Component, EventEmitter, Input, Output } from '@angular/core';
import { VendingMachineItem } from '../interfaces/vending-machine-item';

@Component({
  selector: 'app-vending-machine-item',
  templateUrl: './vending-machine-item.component.html',
  styleUrls: ['./vending-machine-item.component.css'],
})
export class VendingMachineItemComponent {
  @Input()
  item!: VendingMachineItem;

  @Input()
  selected = false;

  @Output()
  selectItem = new EventEmitter<VendingMachineItem>();

  get soldOut(): boolean {
    return this.item?.quantity === 0;
  }

  onClick(): void {
    this.selectItem.emit(this.item);
  }
}
