import { HttpClientModule } from '@angular/common/http';
import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { VendingMachineItemComponent } from './vending-machine-item/vending-machine-item.component';
import { VendingMachineSlotComponent } from './vending-machine-slot/vending-machine-slot.component';

@NgModule({
  declarations: [AppComponent, VendingMachineItemComponent, VendingMachineSlotComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [{ provide: DEFAULT_CURRENCY_CODE, useValue: environment.currency }],
  bootstrap: [AppComponent],
})
export class AppModule {}
