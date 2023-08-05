import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { BasketComponent } from './basket/basket.component';
import { AuthGuard } from '../guards/AuthGuard.guard';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  { path: 'products', component: ProductPageComponent, canActivate: [AuthGuard] },

  { path: "basket", component: BasketComponent, canActivate: [AuthGuard] },

  { path: "productupdate", component: ProductUpdateComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
