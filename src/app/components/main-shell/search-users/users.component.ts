import { Component, OnInit } from '@angular/core';
import { User } from '../../../models';
import { UsersService } from '../../../services';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns = [
    'id',
    'name',
    'surname',
    'username',
    'email',
    'phone',
    'actions'
  ];
  users: User[] = [];
  selectedUser: User;
  userData: FormGroup;

  constructor(
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getUsers();

    this.userData = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => (this.users = users));
  }

  selectUser(user: User) {
    this.selectedUser = user;

    this.userData.setValue({
      id: this.selectedUser.id,
      name: this.selectedUser.name,
      surname: this.selectedUser.surname,
      username: this.selectedUser.username,
      phone: this.selectedUser.phone,
      email: this.selectedUser.email
    });
  }

  updateUser(): void {
    const user = this.userData.value;
    this.userService.updateUser(user).subscribe(
      data => {
        this.usersMessage(
          `User ${user.name} ${user.surname} updated successfully!`,
          'Close'
        );
        this.selectedUser = null;
        this.getUsers();
      },
      error => {
        this.usersMessage(`${error}`, 'Close');
      }
    );
  }

  deleteUser(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe(
      data => {
        this.usersMessage(
          `User ${user.name} ${user.surname} deleted successfully!`,
          'Close'
        );
      },
      error => {
        this.usersMessage(`${error}`, 'Close');
      }
    );
  }

  usersMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}
