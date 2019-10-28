import { Component, OnInit } from '@angular/core';
import { User, City } from '../../../_models';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { UsersService } from 'src/app/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})

export class CreateUserComponent implements OnInit {
  isLinear = false;
  userData: FormGroup;
  users: User[] = [];
  user: User;
  cities: City[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {
    this.user = new User();
   }

  ngOnInit() {
    this.userData = this.formBuilder.group({
      formArray: this.formBuilder.array([
        this.formBuilder.group({
          name: new FormControl('', [
            Validators.required,
            Validators.minLength(2)
          ]),
          surname: new FormControl('', [
            Validators.required,
            Validators.minLength(2)
          ]),
          username: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
          ]),
          email: new FormControl('', [
            Validators.required,
            Validators.pattern('^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$')
          ]),
          phone: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
          ]),
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
          ]),
          confirmPassword: new FormControl('', [
            Validators.required,
          ]),
        }, { validator: this.MustMatch('password', 'confirmPassword')}),
        this.formBuilder.group({
          addressType: new FormControl('', Validators.required),
          address: new FormControl('', Validators.required),
          city: new FormControl('', Validators.required),
          postalCode: new FormControl('', Validators.required),
        }),
      ])
    });

    this.getAllCities();
    this.getUsers();
  }

  get formArray(): AbstractControl | null { return this.userData.get('formArray'); }
  get name() { return this.formArray.get([0]).get('name'); }
  get surname() { return this.formArray.get([0]).get('surname'); }
  get username() { return this.formArray.get([0]).get('username'); }
  get email() { return this.formArray.get([0]).get('email'); }
  get phone() { return this.formArray.get([0]).get('phone'); }
  get password() { return this.formArray.get([0]).get('password'); }
  get confirmPassword() { return this.formArray.get([0]).get('confirmPassword'); }
  get addressType() { return this.formArray.get([1]).get('addressType'); }
  get address() { return this.formArray.get([1]).get('address'); }
  get city() { return this.formArray.get([1]).get('city'); }
  get postalCode() { return this.formArray.get([1]).get('postalCode'); }

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

  getAllCities(): void {
    this.userService.getAllCities().subscribe(cities => this.cities = cities);
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  onRegisterSubmit(): void {
    this.user.name = this.name.value;
    this.user.surname = this.surname.value;
    this.user.username = this.username.value;
    this.user.email = this.email.value;
    this.user.phone = this.phone.value;
    this.user.password = this.password.value;
    this.user.confirmPassword = this.confirmPassword.value;
    this.user.addressType = this.addressType.value;
    this.user.address = this.address.value;
    this.user.city = this.city.value;
    this.user.postalCode = this.postalCode.value;

    if (!this.user) { return; }

    this.userService.addUser(this.user).subscribe(
      user => {
        if (user) {
          this.userData.reset();
          this.router.navigate(['/app/dashboard']);
        }
      },
      error => {
        console.log(`Error ${error.name}. Error description ${error.text}`);
      }
    );
  }

}
