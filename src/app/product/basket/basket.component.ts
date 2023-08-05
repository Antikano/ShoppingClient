import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../Models/product.model';
import { BasketService } from '../services/basket.service';
import { ProductService } from '../services/product.service';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { Basket } from '../Models/basket.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'basket' }]
})
export class BasketComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  public products: Product[] = [];
  basket: Basket;
  basketID: number = parseInt(localStorage.getItem('basketID') || '0', 10);

  ngOnInit(): void {
    this.basketService
      .getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe((products) => {
        
        this.products = products;
      });
  }

  constructor(
    private basketService: BasketService,
    private productService: ProductService
  ) {}

  addProduct(product: Product) {
    this.basketService.addToBasket(product);
  }

  removeFromBasket(product: Product) {
    this.basketService.removeFromBasket(product);
  } 

  CreateOrder(){
    this.basketService.createOrder();
  }

  increaseQuantity(product: Product) {
    product.quantity++;
  }

  getBase64Image(base64Data: string): string {
    return this.productService.getBase64Image(base64Data);
  }

  // decreaseQuantity(product: Product) {
  //   if (product.quantity - 1 === 0) {
  //     this.removeFromBasket(product);
  //   } else {
  //     product.quantity--;
  //   }
  // }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
