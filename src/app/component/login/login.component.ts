import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { FirestoreService } from '../../services/firestore.service';
import { Role, RoleType } from '../../interface/roles';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [SharedModule]
})
export class LoginComponent {
  user = this.authService.currentUser;
  roles$: Observable<Role[]>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private firestoreService: FirestoreService<Role>
  ) {
    this.firestoreService.setCollectionName('roles');
    this.roles$ = new Observable<Role[]>();
  }

  async login() {
    try {
      await this.authService.loginWithGoogle();
      console.log('User logged in');

      const user = this.authService.currentUser;
      if (user) {
        this.firestoreService.setCollectionName('roles');
        (await this.firestoreService.getItem(user.uid)).pipe(
          switchMap((role: Role | undefined) => {
            if (role) {
              user.role = role.type;
              return of(role);
            } else {
              let newRole: Role = {
                id: user.uid,
                type: RoleType.User,
                ownerId: user.uid
              };
              return this.firestoreService.addItem(newRole).then(() => {
                user.role = RoleType.User;
                return newRole;
              });
            }
          }),
          catchError(error => {
            console.error('Error fetching role: ', error);
            return of(undefined);
          })
        ).subscribe();

        this.router.navigate(['/home']);
      } else {
        throw new Error('User is not authenticated');
      }
    } catch (error) {
      console.error('Error during login: ', error);
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      console.log('User logged out');
    } catch (error) {
      console.error('Error during logout: ', error);
    }
  }
}
