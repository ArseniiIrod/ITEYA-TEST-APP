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
        phone: '+380754047158',
        password: '',
        confirmPassword: '',
        addresses: [
          {
            id: 1,
            addressType: 'Billing Address',
            address: 'Mazepy 99',
            city: 'Kiev',
            country: 'Poland',
            postCode: '79768'
          }
        ]
      },
      {
        id: 2,
        name: 'Roman',
        surname: 'Irod',
        username: 'RomanIrod',
        email: 'RomanIrod@gmail.com',
        phone: '+380734567158',
        password: '',
        confirmPassword: '',
        addresses: [
          {
            id: 1,
            addressType: 'Billing Address',
            address: 'Mazepy 9a',
            city: 'Lviv',
            country: 'Ukraine',
            postCode: '79068'
          }
        ]
      },
      {
        id: 3,
        name: 'Ostap',
        surname: 'Dudka',
        username: 'OstapDudka',
        email: 'OstapDudka@gmail.com',
        phone: '+380734565376',
        password: '',
        confirmPassword: '',
        addresses: [
          {
            id: 1,
            addressType: 'Billing Address',
            address: 'Mazepy 9a',
            city: 'Kharkiv',
            country: 'Ukraine',
            postCode: '79068'
          }
        ]
      },
      {
        id: 4,
        name: 'Natalia',
        surname: 'Doris',
        username: 'DorisNatalia',
        email: 'NataliaDoris@gmail.com',
        phone: '+380534457151',
        password: '',
        confirmPassword: '',
        addresses: [
          {
            id: 1,
            addressType: 'Billing Address',
            address: 'Mazepy 24b',
            city: 'Kiev',
            country: 'Ukraine',
            postCode: '79033'
          },
          {
            id: 2,
            addressType: 'Home Address',
            address: 'Mazepy 1h',
            city: 'Lviv',
            country: 'Poland',
            postCode: '79433'
          }
        ]
      },
      {
        id: 5,
        name: 'Ruslana',
        surname: 'Kucher',
        username: 'RuslanaKucher',
        email: 'RuslanaKucher@gmail.com',
        phone: '+380564549155',
        password: '1234',
        confirmPassword: '1234',
        addresses: [
          {
            id: 1,
            addressType: 'Billing Address',
            address: 'Mazepy 10a',
            city: 'Ternopil',
            country: 'Poland',
            postCode: '79068'
          }
        ]
      }
    ];

    return { users, authenticate };
  }

  genId(users: User[]): number {
    return users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 2;
  }
}
