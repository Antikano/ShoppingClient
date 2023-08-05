import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginUser } from '../Model/LoginUser.model';
import { AuthService } from '../Services/auth.service';
import { MessageService } from 'primeng/api';
import { accessToken } from '../Model/accessToken.model';
import { Router } from '@angular/router';
import { TRANSLOCO_SCOPE, TranslocoService } from '@ngneat/transloco';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService, { provide: TRANSLOCO_SCOPE, useValue: 'login' }]
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private translocoService: TranslocoService,
    private jwtHelper: JwtHelperService) { }

  frm: FormGroup;
  submitted: boolean = false;
  loginSummary: string;
  loginDetail: string;
  isVirtualKeyboardEnabled = true;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }
  virtualKey() {
    this.isVirtualKeyboardEnabled = !this.isVirtualKeyboardEnabled;
  }

  get commponent() {
    return this.frm.controls;
  }
  toggleVirtualKeyboard() {
    this.isVirtualKeyboardEnabled = !this.isVirtualKeyboardEnabled;
  }

  LoginUser(data: LoginUser) {

    this.submitted = true;

    if (this.frm.invalid) {
      return;
    }

    else {
      const logUser: LoginUser = new LoginUser();
      logUser.username = data.username;
      logUser.password = data.password;

      this.authService.loginUser(logUser).subscribe(
        result => {
          const token: accessToken = result;
          console.log(token);
          if (token != null) {
            const expirationDate: Date = new Date(token.expiration);
            console.log(expirationDate);
            localStorage.setItem('accessToken', token.accessToken)

            const decodedToken = this.jwtHelper.decodeToken(token.accessToken);
            const basketID: number = decodedToken.basketID;
            localStorage.setItem('basketID', basketID.toString());

            this.translocoService.selectTranslate('loginSuccess').subscribe(translation => {
              this.loginSummary = translation as string;
            });
            this.translocoService.selectTranslate('loginSuccessDetail').subscribe(translation => {
              this.loginDetail = translation as string;
            });

            this.messageService.add({ severity: 'success', summary: this.loginSummary, detail: this.loginDetail });
            setTimeout(() => {
              this.router.navigate(['/products']);
            }, 2400);
            this.authService.identityCheck();
          }
        },
        error => {
          console.error("login hata");
          this.translocoService.selectTranslate('loginFailed').subscribe(translation => {
            this.loginSummary = translation as string;
          });
          this.translocoService.selectTranslate('loginFailedDetail').subscribe(translation => {
            this.loginDetail = translation as string;
          });
          this.messageService.add({ severity: 'error', summary: this.loginSummary, detail: this.loginDetail });
        }
      );
    }
  }
}
