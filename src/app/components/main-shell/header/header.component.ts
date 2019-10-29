import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services';
import { Router } from '@angular/router';
import { RegisteredUser } from '../../../models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: RegisteredUser;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(
      registeredUser => (this.currentUser = registeredUser)
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
  }
}
