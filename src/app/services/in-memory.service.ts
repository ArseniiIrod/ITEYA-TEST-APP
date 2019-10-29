import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class InMemoryService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const authenticate = { username: 'test', password: 'test' };

    const users = [
      {
        id: 1,
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
        id: 2,
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
      },
      {
        id: 3,
        name: 'Ostap',
        surname: 'Dudka',
        username: 'OstapDudka',
        email: 'OstapDudka@gmail.com',
        phone: +380734565376,
        password: '',
        confirmPassword: '',
        addressType: '',
        address: '',
        city: 'Kiev',
        postCode: '79068'
      },
      {
        id: 4,
        name: 'Natalia',
        surname: 'Doris',
        username: 'DorisNatalia',
        email: 'NataliaDoris@gmail.com',
        phone: +380534457151,
        password: '',
        confirmPassword: '',
        addressType: '',
        address: '',
        city: 'Lviv',
        postCode: '79068'
      },
      {
        id: 5,
        name: 'Ruslana',
        surname: 'Kucher',
        username: 'RuslanaKucher',
        email: 'RuslanaKucher@gmail.com',
        phone: +380564549155,
        password: '',
        confirmPassword: '',
        addressType: '',
        address: '',
        city: 'Lviv',
        postCode: '79068'
      }
    ];

    const cities = [
      { id: 0, name: 'Lviv' },
      { id: 1, name: 'Kiev' },
      { id: 2, name: 'Dnirpo' },
      { id: 3, name: 'Herson' }
    ];

    return { users, cities, authenticate };
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 2;
  }
}
