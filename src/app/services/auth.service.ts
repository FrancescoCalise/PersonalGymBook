import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signOut, authState } from '@angular/fire/auth';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = authState(this.auth);

  constructor(private auth: Auth) { }

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
