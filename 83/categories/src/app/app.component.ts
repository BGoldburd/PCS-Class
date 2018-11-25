import { Component } from '@angular/core';
import { Categories } from './shared/categories';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'categories';

  categories: Categories = [
    {
      categoryName: "MP3 Players",
      items: [
        {
          name: 'sansa',
          price: '55.99'
        },
        {
          name: 'iPod',
          price: '135.00'
        },
        {
          name: 'sony',
          price: '45.89'
        }
      ]
    },
    {
      categoryName: "Computers",
      items: [
        {
          name: 'lenovo',
          price: '355.00'
        },
        {
          name: 'dell',
          price: '535.99'
        },
        {
          name: 'mac',
          price: '1,345.00'
        }
      ]
    },
    {
      categoryName: "Smart Phones",
      items: [
        {
          name: 'iPhone',
          price: '855.00'
        },
        {
          name: 'android',
          price: '535.00'
        },
        {
          name: 'windows',
          price: '345.99'
        }
      ]
    },
    {
      categoryName: "Printers"
    }
  ];

  selectedIndex = {
    selected: -1
  };
}
