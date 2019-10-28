import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { User } from '../../../_models';
import { UsersService } from '../../../_services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns = ['id', 'name', 'surname', 'username', 'email', 'phone', 'actions'];
  users$: Observable<User[]>;
  // users: User[] = [];
  private searchTerms = new Subject<string>();

  constructor(private userService: UsersService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => this.userService.searchUser(term))
    );
  }

  // delete(user: User): void {
  //   this.users$ = this.users$.filter(h => h !== user);
  //   this.userService.deleteUser(this.users$).subscribe();
  // }
}
