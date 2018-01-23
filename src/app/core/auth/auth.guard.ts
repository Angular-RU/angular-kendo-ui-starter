import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  CanActivate,
  CanActivateChild
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { TempStateService } from '../navigation/tempState.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private auth: AuthService,
    private stateService: TempStateService
  ) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.auth.authenticated) {
      this.stateService.oldUrl = state.url;
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.auth.authenticated) {
      this.stateService.oldUrl = state.url;
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
