import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductModule } from './product/product.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import {CookieService} from 'ngx-cookie-service';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslocoRootModule } from './transloco-root.module';


@NgModule({
  declarations: [
    AppComponent
  ],providers:[CookieService,MessageService],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UiModule,
    BrowserAnimationsModule,
    ProductModule,
    HttpClientModule,
    AuthModule,
    ToastModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: ()=>localStorage.getItem("accessToken"),
        allowedDomains:["localhost:7279"]
      },
    }),
    TranslocoRootModule
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
