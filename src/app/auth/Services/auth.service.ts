import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../Model/RegisterUser.model';
import { create_product } from 'src/app/product/Models/create_product.model';
import { LoginUser } from '../Model/LoginUser.model';
import { accessToken } from '../Model/accessToken.model';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7279/api/Users';
  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  identityCheck() {
    const token: string = localStorage.getItem("accessToken");
    let expired: boolean;

    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true
      debugger
    }
    _isAuthenticated = token != null && !expired
  }

  get isAuthentication(): boolean {
    return _isAuthenticated;
  }

  createUser(user: RegisterUser): Observable<string> {
    return this.http.post<string>(this.apiUrl, user);
  }

  loginUser(user: LoginUser): Observable<accessToken> {
    return this.http.post<accessToken>(this.apiUrl + '/login', user);
  }
}
export let _isAuthenticated: boolean;