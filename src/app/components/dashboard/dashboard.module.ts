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
import { ItemsComponent } from './items/items.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryCreateEdit } from './category/category-create-edit/category-create-edit.component';


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
    ItemsComponent,
    CategoryListComponent,
    CategoryCreateEdit
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule
  ]
})
export class DashboardModule { }
