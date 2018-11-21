import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnotherComponent } from './another/another.component';
import { PersonComponent } from './person/person.component';
import { AddressComponent } from './address/address.component';
import { StateComponent } from './address/state/state.component';

@NgModule({
  declarations: [
    AppComponent,
    AnotherComponent,
    PersonComponent,
    AddressComponent,
    StateComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
