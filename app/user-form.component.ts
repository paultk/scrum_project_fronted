import {Component} from '@angular/core';

import {User}    from './user';
import {UserService} from './user.service'
import {JsonTestClass} from "./json-test-class";
import {USERS} from "./mock-ansatte";

@Component({
  moduleId: module.id,
  selector: 'user-form',
  templateUrl: 'user-form.component.html',
  styleUrls: ['user-form.component.css']
})

export class UserFormComponent {

  constructor(private userService: UserService) {
  }

  field2: string = 'field2';
  fieldValue2: string = 'fieldValue';

  stillingsProsent = ['25', '50',
    '75', '100'];

  stillinger = ['Helsefagarbeider', 'Sykepleier', 'Assistent'];

  avdeling = ['St. Olavs Hospital', 'Sentrum sykehus', 'Lade hjelpehjem', 'Ranheim eldreboliger'];

  model = USERS[1];

  submitted = false;

  jsonTest= new JsonTestClass('dsffsd');

  testConnect(): void {
    // console.log('ping2');
    this.userService.testConnect2(this.jsonTest);

  }

  testConnect4(): void {
    console.log(this.model.fornavn)
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.model);
    this.userService.addUser(this.model);




  }

  printFunksjon(): void{
    console.log(this.model);
  }

  newHero() {
    // this.model = new User('ptkm' );
  }
}
