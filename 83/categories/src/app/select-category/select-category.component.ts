import { Component, Input } from '@angular/core';
import { Categories } from '../shared/categories';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent {
  @Input()
  categories: Categories;
  @Input()
  selectedIndex;
  
  selectIndex(index: number) {
    this.selectedIndex.selected = index;
  }

  deleteCategory(index: number) {
    if (index < 0) {
      return;
    }
    this.categories.splice(index, 1);
  }

  addCategory(category: string) {
    this.categories = this.categories || [];
    this.categories.push({
      categoryName: category
    });
    this.selectedIndex.selected = this.categories.length - 1;
  }

}
