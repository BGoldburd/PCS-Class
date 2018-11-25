import { Component, Input } from '@angular/core';
import { Category } from '../shared/category';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent {
  @Input()
  category: Category;

  addItem(name: string, price: string) {
    this.category.items = this.category.items || [];
    this.category.items.push({
      name: name,
      price: price
    });
  }

  deleteItem(index: number) {
    this.category.items.splice(index, 1);
  }
}
