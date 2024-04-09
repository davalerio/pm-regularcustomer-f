import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { CustomerComponent } from './customer/customer.component';
import { SidenavComponent } from './ui/sidenav/sidenav.component';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DashboardComponent } from './dashboard.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateEditComponent } from './category/category-create-edit/category-create-edit.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemCreateEditComponent } from './item/item-create-edit/item-create-edit.component';
import { PointComponent } from './point/point.component';
import { PointListComponent } from './point/point-list/point-list.component';
import { PointCreateComponent } from './point/point-create/point-create.component';
import { PointViewComponent } from './point/point-view/point-view.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    CustomerComponent,
    SidenavComponent,
    ToolbarComponent,
    CustomerListComponent,
    ProductsComponent,
    ProductListComponent,
    CategoryComponent,
    ItemComponent,
    CategoryListComponent,
    CategoryCreateEditComponent,
    ItemListComponent,
    ItemCreateEditComponent,
    PointComponent,
    PointListComponent,
    PointCreateComponent,
    PointViewComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
