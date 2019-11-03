import { Component, OnInit } from '@angular/core';
import { User, Address } from 'src/app/models';
import { MatSnackBar } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { UsersService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  isLinear = false;
  userData: FormGroup;
  userAddressData: FormGroup;
  users: User[] = [];
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userData = this.formBuilder.group(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]),
        surname: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25)
        ]),
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25)
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(
            '^([A-Z|a-z|0-9](.|_){0,1})+[A-Z|a-z|0-9]@([A-Z|a-z|0-9])+((.){0,1}[A-Z|a-z|0-9]){2}.[a-z]{2,3}$'
          )
        ]),
        phone: new FormControl('', [
          Validators.required,
          Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$'),
          Validators.minLength(4),
          Validators.maxLength(12)
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4)
        ]),
        confirmPassword: new FormControl('', [Validators.required])
      },
      { validator: this.MustMatch('password', 'confirmPassword') }
    );

    this.userAddressData = this.formBuilder.group({
      addressType: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      postCode: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ])
    });

    this.getUsers();
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => (this.users = users));
  }

  onRegisterSubmit(): void {
    const addresses: Address[] = [];
    addresses.push(this.userAddressData.value);

    const newUser = { ...this.userData.value, addresses };
    this.user = newUser;

    this.userService.addUser(this.user).subscribe(
      user => {
        if (user) {
          this.users.push(this.user);
          this.router.navigate(['/app/dashboard']);
          this.createUserMessage(
            `User ${user.name} ${user.surname} created successfully!`,
            'Close'
          );
        }
      },
      error => {
        this.createUserMessage(`${error}`, 'Close');
      }
    );
  }

  createUserMessage(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2500
    });
  }
}
