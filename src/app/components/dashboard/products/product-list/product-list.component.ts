import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  title: string = 'Producto '
  listProducts: [] = [];
  loading: boolean = false;

  constructor() {}
  ngOnInit(): void {}

  dialogAddOrEdit() {}

  dialogDelete() {}

  onSearch() {}

  applyFilter(event: Event) {}
}
