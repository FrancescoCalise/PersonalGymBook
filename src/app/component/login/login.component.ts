import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user$ = this.authService.getUser();

  constructor(private authService: AuthService) { }

  login() {
    this.authService.loginWithGoogle().subscribe(() => {
      console.log('User logged in');
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      console.log('User logged out');
    });
  }
}
