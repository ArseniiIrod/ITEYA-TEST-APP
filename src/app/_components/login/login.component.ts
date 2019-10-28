import { Component, OnInit } from '@angular/core';
// import { AuthenticationService } from '../../_services';
// import { Router } from '@angular/router';
import { User } from '../../_models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User = new User();
  userLoginData: FormGroup;

  constructor(
    // private authService: AuthenticationService,
    // private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userLoginData = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      password: ['', Validators.required ]
    });
  }

  // onLoginSubmit() {
  //   this.user = this.userLoginData.value;
  //   const loggedId = this.authService.login(this.user);

  //   loggedId ?  this.router.navigate(['/tasks/list']) : alert('Error logging!');
  // }

}
