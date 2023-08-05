import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterUser } from '../Model/RegisterUser.model';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../Services/auth.service';
import { TRANSLOCO_SCOPE, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService, { provide: TRANSLOCO_SCOPE, useValue: 'register' }]
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private translocoService: TranslocoService) { }

  frm: FormGroup;
  submitted: boolean = false;
  registerSummary: string;
  registerDetail: string;
  public isVirtualKeyboardEnabled:boolean=true;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      firstname: ["", [Validators.required]],
      surname: ["", [Validators.required]],
      username: ["", [Validators.required]],
      email: ["", [Validators.required,
      Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  toggleVirtualKeyboard() {
    this.isVirtualKeyboardEnabled = !this.isVirtualKeyboardEnabled;
  }
  userCreate(data: RegisterUser) {

    this.submitted = true;

    if (this.frm.invalid) {
      return;
    }
    else {
      const creUser: RegisterUser = new RegisterUser();
      creUser.firstname = data.firstname;
      creUser.surname = data.surname;
      creUser.username = data.username;
      creUser.email = data.email;
      creUser.password = data.password;

      this.authService.createUser(creUser).subscribe(
        result => {
          this.translocoService.selectTranslate('registerSuccess').subscribe(translation => {
            this.registerSummary = translation as string;
          });
          this.translocoService.selectTranslate('registerSuccessDetail').subscribe(translation => {
            this.registerDetail = translation as string;
          });
          this.messageService.add({ severity: 'success', summary: this.registerSummary, detail: this.registerDetail });
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2400);
        }, error => {

          this.translocoService.selectTranslate('registerFailed').subscribe(translation => {
            this.registerSummary = translation as string;
          });
          this.translocoService.selectTranslate('registerFailedDetail').subscribe(translation => {
            this.registerDetail = translation as string;
          });

          this.messageService.add({ severity: 'error', summary: this.registerSummary, detail: this.registerDetail });
        }
      );;
    }
  }

  get commponent() {
    return this.frm.controls;
  }
}
