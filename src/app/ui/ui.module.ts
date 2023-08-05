import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiRoutingModule } from './ui-routing.module';
import { LayoutModule } from './layout/layout.module';
import { HeaderComponent } from './layout/header/header.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiRoutingModule,
    LayoutModule,
  ],exports:[
LayoutModule
  ]
})
export class UiModule { }
