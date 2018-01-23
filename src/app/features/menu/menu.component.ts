import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
    `a:hover {
        cursor:pointer;
       }`
  ]
})
export class MenuComponent {
  constructor(
    private translate: TranslateService,
    private auth: AuthService,
    private router: Router
  ) {}

  setLanguage(localeId: string) {
    localStorage.setItem('localeId', localeId);
    this.translate.use(localeId);
    window.location.reload();
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('./');
  }
}
