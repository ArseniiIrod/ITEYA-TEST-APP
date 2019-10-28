import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/_services';
import { User } from '../../../_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: User[] = [];

  constructor(
    private userService: UsersService,

  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

}
