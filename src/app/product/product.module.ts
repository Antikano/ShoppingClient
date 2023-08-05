import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { TableModule } from 'primeng/table';


import { MatGridListModule } from '@angular/material/grid-list';

import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { CategoryComponent } from './category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ProductAddComponent } from './product-add/product-add.component';
import { FileUploadModule } from 'primeng/fileupload';
import { ChipsModule } from "primeng/chips";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { BasketComponent } from './basket/basket.component';
import { DataViewModule } from 'primeng/dataview';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { TranslocoModule } from '@ngneat/transloco';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductPageComponent } from './product-page/product-page.component';


@NgModule({
  declarations: [
    ProductListComponent,
    CategoryComponent,
    ProductAddComponent,
    BasketComponent,
    ProductUpdateComponent,
    ProductPageComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    TableModule,
    MatGridListModule,
    DropdownModule,
    ListboxModule,
    FormsModule,
    ButtonModule,
    FileUploadModule,
    ChipsModule,
    InputTextModule,
    InputTextareaModule,
    MultiSelectModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    DataViewModule,
    DynamicDialogModule,
    ToastModule,
    DialogModule,
    ReactiveFormsModule,
    TranslocoModule

  ]
})
export class ProductModule { }
