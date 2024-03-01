import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title: string = 'Cliente ';
  listCustomers: any[] = [];
  loading: boolean = false;

  displayedColumns: string[] = ['customers', 'actions'];
  dataSource!: MatTableDataSource<[]>;

  constructor(private _dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  loadCustomers() {
    this.loading = true;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSearch() {}

  dialogAddOrEdit() {}

  dialogDelete(id: any) {}
}
