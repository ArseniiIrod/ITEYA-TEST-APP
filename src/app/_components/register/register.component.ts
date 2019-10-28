import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
// import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  userRegisterData: FormGroup;

  constructor(
    // private authService: AuthenticationService,
    // private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userRegisterData = this.formBuilder.group({
      name: ['', Validators.required ],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.required ]
    });
  }

  // onRegisterSubmit() {
  //   this.user = this.userData.value;
  //   this.authService.registerUser(this.user);
  //   this.router.navigate(['/auth/login']);
  // }
}
