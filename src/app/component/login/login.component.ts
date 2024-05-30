import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [SharedModule]
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
