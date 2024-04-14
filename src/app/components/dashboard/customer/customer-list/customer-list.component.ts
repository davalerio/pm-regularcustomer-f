import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ICustomer } from 'src/app/interfaces/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title: string = 'Clientes ';
  listRecords: ICustomer[] = [];
  loading: boolean = false;

  displayedColumns: string[] = ['index', 'fullname', 'document', 'email', 'phone', 'actions'];
  dataSource!: MatTableDataSource<ICustomer>;

  constructor(
    private _customerService: CustomerService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public _matPaginatorIntl: MatPaginatorIntl
  ) { }


  ngOnInit(): void {
    this.loadCustomer();
    this._matPaginatorIntl.itemsPerPageLabel = 'Registros por página';
  }

  loadCustomer() {
    this.loading = true;
    this._customerService.getRecords().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSearch() { }
}