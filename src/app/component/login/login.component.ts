import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class LoginComponent {
  user$ = this.authService.getUser();

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.loginWithGoogle().subscribe(() => {
      console.log('User logged in');
      this.router.navigate(['/home']); // Reindirizza l'utente alla home page dopo il login
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      console.log('User logged out');
    });
  }
}
