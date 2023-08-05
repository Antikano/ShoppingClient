import { Component } from '@angular/core';
import { TRANSLOCO_SCOPE, TranslocoService } from '@ngneat/transloco';
import { SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'header' }]
})
export class HeaderComponent {

  constructor(public authSer: AuthService,
    private translocoService: TranslocoService) {
    authSer.identityCheck();
  }

  languageOptions: SelectItem[] = [
    { label: 'Türkçe', value: 'tr' },
    { label: 'English', value: 'en' }
  ];

  changeLanguage(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  signOut() {
    localStorage.removeItem("accessToken");
    this.authSer.identityCheck();
  }
}
