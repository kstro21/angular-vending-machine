import { Component, OnInit } from '@angular/core';
import { VendingMachineItem } from './interfaces/vending-machine-item';
import { VendingMachineService } from './services/vending-machine.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VendingMachineStore } from './store/vending-machine.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  selectedItem: VendingMachineItem | null = null;
  soldItem: boolean = false;
  balance = 0;
  balanceChange = 0;
  items$: Observable<VendingMachineItem[]> = this.vendingMachineStore.items$;

  constructor(
    private vendingMachineService: VendingMachineService,
    private vendingMachineStore: VendingMachineStore
  ) {}

  ngOnInit(): void {
    this.vendingMachineService.loadItems().pipe(take(1)).subscribe();
  }

  private buyItem(): boolean {
    const result = this.vendingMachineService.buyItem(this.selectedItem, this.balance);
    if (result) {
      this.balanceChange += this.balance - (this.selectedItem?.price as number);
      this.balance = 0;
    }

    return result;
  }

  trackByItems(index: number, item: VendingMachineItem): string {
    return item.id;
  }

  onItemSelected(item: VendingMachineItem): void {
    this.selectedItem = item;
    this.soldItem = this.buyItem();
  }

  updateBalance(value: number): void {
    this.balance = value;
    this.soldItem = this.buyItem();
  }

  grabItem(): void {
    this.selectedItem = null;
    this.soldItem = false;
  }

  getChange(): void {
    this.balanceChange = 0;
  }
}
