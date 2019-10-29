import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../models';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(users: User[], searchText: string, prop: string): any[] {
    if (!users) {
      return [];
    }
    if (!searchText) {
      return users;
    }

    searchText = searchText.toLowerCase();
    return users.filter(user => {
      return user.name.toLowerCase().includes(searchText) ||
        user.username.toLowerCase().includes(searchText) ||
        user.surname.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText);
    });
  }
}
