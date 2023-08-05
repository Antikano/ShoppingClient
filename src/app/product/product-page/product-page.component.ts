import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from '../Models/product.model';
import { CategoryService } from '../services/category.service';
import { Category } from '../category/category.model';
import { BasketService } from '../services/basket.service';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductAddComponent } from '../product-add/product-add.component';
import { TRANSLOCO_SCOPE, TranslocoService } from '@ngneat/transloco';
import { Subscription } from 'rxjs';
import { ProductUpdateComponent } from '../product-update/product-update.component';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  providers: [DialogService, MessageService, { provide: TRANSLOCO_SCOPE, useValue: 'productList' }]
})
export class ProductPageComponent  {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService,
    private categoryService: CategoryService,
    private basketService: BasketService,
    public dialogService: DialogService,
    public messageService: MessageService,
    public translocoService: TranslocoService
  ) { }

  products: Product[] = [];
  filteredProducts: Product[] = this.products;
  selectedCategory!: string;
  selectedCity: Product | undefined;
  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  ref: DynamicDialogRef;
  productAddtoBasketSummary: string;
  productAddtoBasketDetail: string;
  addToBasketSubscription: Subscription;
  createProductSubscription: Subscription;



  childEvent(obj: Category) {
    this.selectedCategory = obj.name;
    if (this.selectedCategory === "All") {
      this.filteredProducts = this.products;
    } else {
      this.updateFilteredProducts();
    }
    this.dataSource.data = [...this.filteredProducts];
  }

  updateFilteredProducts() {
    this.filteredProducts = this.products.filter(product => product.categoryNames.includes(this.selectedCategory));
  }

  

  getBase64Image(base64Data: string): string {
    return this.productService.getBase64Image(base64Data);
  }

  addToBasket(product: Product) {
    this.basketService.addToBasket(product);
  }

  show() {
    this.ref = this.dialogService.open(ProductAddComponent, {
      header: 'Add a Product',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });
  }

  showProductUpdate(product: Product) {
    this.ref = this.dialogService.open(ProductUpdateComponent, {
      header: 'Update Product',
      width: '60%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      data: {
        productToUpdate: product
      }
    });
  }

 
}
