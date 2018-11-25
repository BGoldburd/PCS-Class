import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { SelectCategoryComponent } from './select-category/select-category.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListComponent,
    SelectCategoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
