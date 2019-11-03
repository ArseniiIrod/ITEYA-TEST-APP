import { Component, OnInit, ViewChild } from '@angular/core';
import { User, Address } from '../../../models';
import { UsersService } from '../../../services';
import { MatSnackBar, MatDialog, MatTable } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  UserDialogComponent,
  UserAddressDialogComponent
} from '../../../components';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @ViewChild('useraddresses', {static: false}) table: MatTable<Address[]>;
  displayedColumns = [
    'id',
    'name',
    'surname',
    'username',
    'email',
    'phone',
    'actions'
  ];
  displayedColumnsUserAddress = [
    'addresstype',
    'address',
    'city',
    'country',
    'postcode',
    'actions'
  ];
  users: User[] = [];
  selectedUser: User;
  userData: FormGroup;
  userAddresses: Address[] = [];

  constructor(
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
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

  selectUser(user: User) {
    this.userAddresses = user.addresses;
    this.selectedUser = user;
    console.log(this.selectedUser);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => (this.users = users));
  }

  updateUser(userData: User): void {
    const user = userData;
    this.userService.updateUser(user).subscribe(
      data => {
        this.usersMessage(
          `User ${user.name} ${user.surname} updated successfully!`,
          'Close'
        );
        this.table.renderRows();
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
        this.getUsers();
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

  openUserDialog(action: string, user: User): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '20em',
      data: {
        user,
        action
      }
    });

    dialogRef.afterClosed().subscribe(dataUser => {
      if (dataUser && action === 'updateUser') {
        this.updateUser(dataUser);
      } else if (dataUser && action === 'deleteUser') {
        this.deleteUser(dataUser);
      }
    });
  }

  openUserAddressDialog(action: string, userAddresses: Address[]): void {
    const dialogRef = this.dialog.open(UserAddressDialogComponent, {
      width: '20em',
      data: {
        userAddresses,
        action
      }
    });

    dialogRef.afterClosed().subscribe(dataUserAddress => {
      console.log(dataUserAddress);
      if (dataUserAddress && action === 'addUserAddress') {
        this.selectedUser.addresses.push(dataUserAddress);
        this.updateUser(this.selectedUser);
        this.table.renderRows();
        // Works good
      } else if (dataUserAddress && action === 'updateUserAddress') {
        this.selectedUser.addresses = dataUserAddress;
        this.updateUser(this.selectedUser);
        this.getUsers();
        this.table.renderRows();
        console.log(this.selectedUser);
        // Works bad, find true solution
      } else if (userAddresses && action === 'deleteUserAddress') {
        this.selectedUser.addresses = this.selectedUser.addresses.filter(address => {
          return address !== dataUserAddress;
        });
        console.log(this.selectedUser);
        this.updateUser(this.selectedUser);
        this.table.renderRows();
        // Works bad, find true solution
      }
    });
  }
}
