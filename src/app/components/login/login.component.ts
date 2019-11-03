import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { Router } from '@angular/router';
import { User } from '../../models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  userLoginData: FormGroup;
  error: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.userLoginData = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLoginSubmite() {
    this.user = this.userLoginData.value;
    this.authenticationService
      .login(this.user.username, this.user.password)
      .pipe(first())
      .subscribe(
        data => {
          if (data) {
            this.router.navigate(['/app/dashboard']);
          }
        },
        error => {
          this.error = error;
        }
      );
  }
}
