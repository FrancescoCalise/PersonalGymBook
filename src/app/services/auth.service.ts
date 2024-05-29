import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, authState, User } from '@angular/fire/auth';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

    constructor(private auth: Auth) {
      this.user$ = authState(this.auth).pipe(
        map(user => {
          if (user) {
            let u = user as User;
            return {
              displayName: u.displayName,
              email: u.email,
              // Mappa altre proprietà se necessario
            } as User;
          } else {
            return null;
          }
        })
      );
   }

  loginWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
  }

  logout() {
    return from(signOut(this.auth));
  }

  getUser() {
    return this.user$;
  }
}
