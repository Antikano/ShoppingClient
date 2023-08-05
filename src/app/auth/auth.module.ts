import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ToastModule } from 'primeng/toast';
import { TranslocoModule } from '@ngneat/transloco';
import { KeyboardModule } from 'ngs-virtual-keyboard';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ButtonModule,
    ReactiveFormsModule ,
    ToastModule,
    TranslocoModule,
    KeyboardModule
  ]
})
export class AuthModule { }
