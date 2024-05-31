import { Injectable } from '@angular/core';
import { Auth, authState, signInWithPopup, GoogleAuthProvider, signOut } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { RoleType } from '../interface/roles';

export interface User {
  displayName: string | null;
  email: string | null;
  uid: string;
  emailVerified: boolean;
  photoURL: string | null;
  isAnonymous: boolean;
  role: RoleType;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.userSubject = new BehaviorSubject<User | null>(null);
    this.user$ = this.userSubject.asObservable();

    authState(this.auth).pipe(
      filter((user) => !!user), // Filtro gli stati nulli
      map((user: any) => {
        const currentUser: User = {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          role: RoleType.User // Assuming a default role, modify as needed
        };
        this.userSubject.next(currentUser);
        return currentUser;
      })
    ).subscribe();
  }

  async loginWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async logout() {
    await signOut(this.auth);
    this.userSubject.next(null);
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }
}
