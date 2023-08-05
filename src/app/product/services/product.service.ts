import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/product.model';
import { create_product } from '../Models/create_product.model';
import { Observable, Subject } from 'rxjs';
import { updateProduct } from '../Models/updatedProduct.model';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private apiUrl = 'https://localhost:7279/api/Product';

  constructor(private http: HttpClient, private messageService: MessageService) { }
  
  private createProductSubject = new Subject<void>();

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/withCategoryName');
  }

  create(product: create_product) {
    this.http.post<create_product>(this.apiUrl, product)
      .subscribe(() => {
        this.createProductSubject.next();
      });
  }

  decreaseStockByOne(prod: Product): boolean {
    if (prod.stock > 0) {
      const creProduct: updateProduct = new updateProduct();
      creProduct.name = prod.name;
      creProduct.price = prod.price;
      creProduct.stock = prod.stock - 1;
      creProduct.description = "prod.description";
      creProduct.ImageData = prod.imageData;
  
      this.update(creProduct, prod.id);
  
      return true; 
    } else {
      
      return false; 
    }
  }
  

  update(product: updateProduct, productId: number) {
    const url = `https://localhost:7279/api/Product/${productId}`;
    debugger
    this.http.put<updateProduct>(url, product).subscribe(
      () => {
        this.createProductSubject.next();
      }
    );
  }

  get createProduct$(): Observable<void> {
    return this.createProductSubject.asObservable();
  }

  get updateProduct$(): Observable<void> {
    return this.createProductSubject.asObservable();
  }

  getBase64Image(base64Data: string): string {
    return base64Data;
  }

}