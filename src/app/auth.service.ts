import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate {

  constructor(
    private cookie: CookieService,
    private router: Router
  ) { }

  isAuthenticated(): boolean {
    const token = this.cookie.get('token')
    return !!token;
  }

  canActivate(): boolean {
    if (this.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
