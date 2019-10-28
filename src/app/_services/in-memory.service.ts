import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
// import { RequestInfo } from 'angular-in-memory-web-api/interfaces';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const users = [
      {
        id: 0,
        name: 'Arsenii',
        surname: 'Irod',
        username: 'ArseniiIrod',
        email: 'ArssenIrod@gmail.com',
        phone: +380734047158,
        password: '',
        confirmPassword: '',
        addressType: '',
        address: '',
        city: 'Lviv',
        postCode: '79068'
      },
      {
        id: 1,
        name: 'Roman',
        surname: 'Irod',
        username: 'RomanIrod',
        email: 'RomanIrod@gmail.com',
        phone: +380734567158,
        password: '',
        confirmPassword: '',
        addressType: '',
        address: '',
        city: 'Dnipro',
        postCode: '79068'
      }
    ];
    const cities = [
      {id: 0, name: 'Lviv'},
      {id: 1, name: 'Kiev'},
      {id: 2, name: 'Dnirpo'},
      {id: 3, name: 'Herson'},
    ];

    return { users, cities };
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 2;
  }
}
