import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { CustomersComponent } from './customers/customers.component';
import { SidenavComponent } from './ui/sidenav/sidenav.component';
import { ToolbarComponent } from './ui/toolbar/toolbar.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DashboardComponent } from './dashboard.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateEditComponent } from './category/category-create-edit/category-create-edit.component';
import { ItemListComponent } from './item/item-list/item-list.component';
import { ItemCreateEditComponent } from './item/item-create-edit/item-create-edit.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    CustomersComponent,
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
    ItemCreateEditComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
