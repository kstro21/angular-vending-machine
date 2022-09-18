import { VendingMachineStore } from './../store/vending-machine.store';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { VendingMachineItem } from '../interfaces/vending-machine-item';

@Injectable({
  providedIn: 'root',
})
export class VendingMachineService {
  constructor(private http: HttpClient, private vendingMachineStore: VendingMachineStore) {}

  loadItems(): Observable<VendingMachineItem[]> {
    return this.http.get<VendingMachineItem[]>('/assets/items.json').pipe(
      map((result) => {
        this.vendingMachineStore.items = result;
        return result;
      })
    );
  }

  buyItem(item: VendingMachineItem | null, balance: number): boolean {
    if (!item || balance === 0 || item.quantity === 0) {
      return false;
    }

    const result = balance >= item.price;

    if (result) {
      this.vendingMachineStore.updateItemQuantity(item.id, item.quantity - 1);
    }
    return result;
  }
}
