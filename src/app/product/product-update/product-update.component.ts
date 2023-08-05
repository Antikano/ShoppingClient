import { Component, OnInit } from '@angular/core';
import { Product } from '../Models/product.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadEvent } from 'primeng/fileupload';
import { updateProduct } from '../Models/updatedProduct.model';
import { ProductService } from '../services/product.service';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss'],
  providers:[{provide:TRANSLOCO_SCOPE, useValue:'productUpdate'}]
})
export class ProductUpdateComponent implements OnInit {
  UpProduct: Product;

  constructor(private ref: DynamicDialogRef,
              private config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private productService:ProductService) { }
  submitted: boolean = false;
  frm: FormGroup;
  imageCreProduct: string = "";
  ngOnInit() {
    
    this.UpProduct = this.config.data.productToUpdate;
    this.frm = this.formBuilder.group({
      name: [this.UpProduct.name, [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      price: [this.UpProduct.price, [Validators.required,
      Validators.min(0),
      ]],
      stock: [this.UpProduct.stock, [Validators.required,
      Validators.min(0),
      ]],
      description: [this.UpProduct.description, [Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)
      ]]
    })
    this.imageCreProduct = this.UpProduct.imageData;
  }
  get commponent() {
    return this.frm.controls;
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

  updateProduct(data: updateProduct){
    this.submitted = true;
   
    if (this.frm.invalid || this.imageCreProduct == "") {
      
      return;
    }
    else {
      const creProduct: updateProduct = new updateProduct();
      creProduct.name = data.name;
      creProduct.price = data.price;
      creProduct.stock = data.stock;
      creProduct.description = data.description;
      creProduct.ImageData = this.imageCreProduct;
      
      this.productService.update(creProduct,this.UpProduct.id)

      this.ref.close()
    }
  }
  
}