import { Injectable } from '@angular/core';
import { Product } from '../Models/product.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Basket } from '../Models/basket.model';
import { UpdatedBasketDto } from '../Models/UpdatedBasketDto.model';
import { orderDto } from '../Models/orderDto.model';
import { ProductService } from './product.service';
import { updateProduct } from '../Models/updatedProduct.model';
import { MessageService } from 'primeng/api';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private products: Product[] = [];
  private basket: Basket;
  private apiUrl = 'https://localhost:7279/api/Basket';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  basketID: number
  updatedProduct: updateProduct;
  OrderControl: boolean = true;

  constructor(private http: HttpClient,
    private productService: ProductService,
    private messageService: MessageService,
    private translocoService:TranslocoService) {
    this.updateBasketID();
  }
  basketStock:string;
  basketStockDetail:string;
  basketNoProduct:string;
  basketNoProductDetail:string;
  orderCreated:string;
  orderCreatedDetail:string;
  orderCreateFailed:string;
  orderCreateFailedDetail:string;

  createOrder() {

    const totalPrice = this.products.reduce((sum, product) => sum + product.price, 0);

    const orderDto: orderDto = {
      productNames: this.productsSubject.getValue().map(product => product.name),
      createdDate: new Date(),
      basketId: this.basketID,
      totalPrice: totalPrice
    };


    this.products.forEach(product => {
      if (!this.productService.decreaseStockByOne(product)) {
        this.translocoService.selectTranslate('basketStockFailed').subscribe(translation => {
          this.basketStock = translation as string;
        });
        this.translocoService.selectTranslate('basketStockFailedDetail').subscribe(translation => {
          this.basketStockDetail = translation as string;
        });
        this.messageService.add({ severity: 'error', summary: this.basketStock, detail: this.basketStockDetail });

        this.OrderControl = false;
        return
      }
      else {
       
      }
    });
    if(this.products.length ===0) {
      this.OrderControl = false;
      this.translocoService.selectTranslate('basketNoProduct').subscribe(translation => {
        this.basketNoProduct = translation as string;
      });
      this.translocoService.selectTranslate('basketNoProductDetail').subscribe(translation => {
        this.basketNoProductDetail = translation as string;
      });
      this.messageService.add({ severity: 'error', summary: this.basketNoProduct, detail: this.basketNoProductDetail });
    }

    if (this.OrderControl) {
      this.http.post<orderDto>(this.apiUrl, orderDto)
        .subscribe(() => {
          this.ClearBasket()
          this.translocoService.selectTranslate('orderCreated').subscribe(translation => {
            this.orderCreated = translation as string;
          });
          this.translocoService.selectTranslate('orderCreatedDetail').subscribe(translation => {
            this.orderCreatedDetail = translation as string;
          });
          this.messageService.add({ severity: 'success', summary: "Başarılı", detail: "Sipariş Oluşturuldu." });
        }, (error) => {
          this.translocoService.selectTranslate('orderCreateFailed').subscribe(translation => {
            this.orderCreateFailed = translation as string;
          });
          this.translocoService.selectTranslate('orderCreateFailedDetail').subscribe(translation => {
            this.orderCreateFailedDetail = translation as string;
          });

          this.messageService.add({ severity: 'error', summary: this.orderCreateFailed, detail: this.orderCreateFailedDetail });
        });
    }
    this.OrderControl = true;
  }

  ClearBasket() {
    this.products.splice(0, this.products.length);
    this.productsSubject.next(this.products.slice());
    this.updateBasket(this.products, this.basket, this.basketID);
  }

  updateBasketID() {
    this.basketID = parseInt(localStorage.getItem('basketID') || '0', 10);
  }

  setBasketID(newBasketID: string) {
    localStorage.setItem('basketID', newBasketID);
    this.updateBasketID();
    this.basketProducts(this.basketID);
  }

  basketProducts(id: number) {
    this.products.splice(0, this.products.length);
    this.getBasket(id).subscribe(
      (result) => {
        this.basket = result;
        this.products = result.products;
        this.productsSubject.next(this.products.slice());
      }
    );
  }

  updateBasket(products: Product[], basket: Basket, basketId: number) {
    const url = `https://localhost:7279/api/Basket/${basketId}`;

    const productIds: number[] = products.map(product => product.id);

    const updatedBasketDto: UpdatedBasketDto = {
      id: basketId,
      products: productIds
    };

    this.http.put<UpdatedBasketDto>(url, updatedBasketDto).subscribe(
    );
  }

  removeFromBasket(product: Product) {
    const index = this.products.findIndex(p => p.name === product.name);

    if (index !== -1) {
      this.products.splice(index, 1);
      this.productsSubject.next(this.products.slice());
      this.updateBasket(this.products, this.basket, this.basketID);
    }
  }

  getBasket(basketId: number): Observable<Basket> {
    const url = `${this.apiUrl}/${basketId}`;
    return this.http.get<Basket>(url);
  }

  addToBasket(product: Product) {
    const existingProduct = this.products.find(p => p.name === product.name);

    if (!existingProduct) {
      this.products.push(product);
      this.productsSubject.next(this.products.slice());

      this.updateBasket(this.products, this.basket, this.basketID);
    }
  }

  getProducts(): Observable<Product[]> {
    //this.basketProducts(this.basketID);
    return this.productsSubject.asObservable();
  }

}
