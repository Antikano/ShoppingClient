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
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [DialogService, MessageService, { provide: TRANSLOCO_SCOPE, useValue: 'productList' }]
})

export class ProductListComponent implements OnInit {

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

  ngOnInit(): void {
    this.getProducts();
    this.createProductSubscription = this.productService.createProduct$.subscribe(() => {
      this.getProducts();
    });
  }

  

  public getProducts(): void {
    this.productService.getProducts()
      .subscribe(
        products => {
          console.log(products);
          this.products = products;
          this.filteredProducts = products;
          this.dataSource.data = this.products;
          this.dataSource.paginator = this.paginator;
        },
        error => {
          console.log('Hata oluştu:', error);
        }
      );
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

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    if (this.addToBasketSubscription) {
      this.addToBasketSubscription.unsubscribe();
    }
  }
}