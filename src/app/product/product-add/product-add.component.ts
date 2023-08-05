import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { create_product } from '../Models/create_product.model';
import { InputNumber } from 'primeng/inputnumber';
import { FileUploadEvent } from 'primeng/fileupload';
import { Product } from '../Models/product.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../category/category.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { TRANSLOCO_SCOPE, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  providers:[{provide:TRANSLOCO_SCOPE, useValue:'productAdd'}]
})
export class ProductAddComponent implements OnInit {

  public product: Product;
  public Gcategories: Category[] = [];

  selectedCategories!: Category[];


  constructor(private service: ProductService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private messageService: MessageService,
    private translocoService:TranslocoService) { }

  frm: FormGroup;
  imageCreProduct: string = "";
  submitted: boolean = false;

  productAddSummary: string;
  productAddDetail: string;


  ngOnInit(): void {
    this.getCategories();
    
    
    this.frm = this.formBuilder.group({
      name: ["", [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      price: ["", [Validators.required,
      Validators.min(0),
      ]],
      stock: ["", [Validators.required,
      Validators.min(0),
      ]],
      description: ["", [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
      ]],
      categories :["",[Validators.required]
        ]
    
    })


  }
  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(
        (categories: Category[]) => {
          console.log(categories);
          this.Gcategories = categories;
        },
        (error: any) => {
          console.log('Hata oluştu:', error);
        }
      );
  }

  onUpload(event: FileUploadEvent): void {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;
      this.imageCreProduct = base64String;

    };
    reader.readAsDataURL(file);
  }


  createProduct(data: create_product) {
    
    this.submitted = true;
    
    if (this.frm.invalid || this.imageCreProduct == "") {
      
      return;
    }
    else {
      const creProduct: create_product = new create_product();
      creProduct.name = data.name;
      creProduct.price = data.price;
      creProduct.stock = data.stock;
      creProduct.description = data.description;
      creProduct.ImageData = this.imageCreProduct;

      this.selectedCategories = data.categories;
      
      this.selectedCategories.forEach((category: Category) => {
        creProduct.categoriesName.push(category.name);
      });

      this.service.create(creProduct);
      
      this.dialogRef.close()

      this.translocoService.selectTranslate('productAddSuccess').subscribe(translation => {
        this.productAddSummary = translation as string;
      });
      this.translocoService.selectTranslate('productAddDetail').subscribe(translation => {
        this.productAddDetail = translation as string;
      });
      this.messageService.add({ severity: 'success', summary: this.productAddSummary, detail: this.productAddDetail });
      
    }

  }

  

  get commponent() {
    return this.frm.controls;
  }
}