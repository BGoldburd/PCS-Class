import { Component } from '@angular/core';
import { Person } from './shared/person';
import { Address } from './shared/address';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Great FirstAngularApp';

  theAddress: Address = {
    street: '1771 Madison Ave',
    city: 'Lakewood',
    zip: '08701'
  }

  thePerson: Person = {
    firstName: 'Donald',
    lastName: 'Trump',
    // street: '1771 Madison Ave',
    // city: 'Lakewood',
    // zip: '08701'
    // address: this.theAddress
  };
}
