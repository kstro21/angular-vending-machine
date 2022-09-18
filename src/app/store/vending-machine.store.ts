import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VendingMachineItem } from '../interfaces/vending-machine-item';

@Injectable({
  providedIn: 'root',
})
export class VendingMachineStore {
  private readonly storeSubject = new BehaviorSubject<VendingMachineItem[]>([]);

  readonly items$ = this.storeSubject.asObservable();

  get items(): VendingMachineItem[] {
    return this.storeSubject.getValue();
  }

  set items(val: VendingMachineItem[]) {
    this.storeSubject.next(val);
  }

  updateItemQuantity(itemId: string, newQuantity: number): void {
    const data = [...this.items];
    const index = data.findIndex((item) => item.id === itemId);

    if (index > -1) {
      const item = data[index];
      data.splice(index, 1, { ...item, quantity: newQuantity });

      this.items = data;
    }
  }
}
