import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { AuthService, _isAuthenticated } from '../auth/Services/auth.service';
import { BasketService } from '../product/services/basket.service';

export const AuthGuard: CanActivateFn = (route, state) => {

  const jwtHelper = inject(JwtHelperService)
  const router = inject(Router)
  const message = inject(MessageService)
  const auth = inject(AuthService)
  const basket = inject(BasketService)
  
  if (!_isAuthenticated) {
    router.navigate(["login"])
    
    return false
  }
  basket.setBasketID(localStorage.getItem('basketID'));
  return true;
};
