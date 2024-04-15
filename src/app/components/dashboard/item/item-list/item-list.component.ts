import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemCreateEditComponent } from '../item-create-edit/item-create-edit.component';
import { IItem } from 'src/app/interfaces/item.interface';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title: string = 'Premios ';
  listRecords: IItem[] = [];
  loading: boolean = false;
  isDisabled: boolean = true;

  displayedColumns: string[] = ['item_category_id', 'name', 'description', 'status', 'actions'];
  dataSource!: MatTableDataSource<IItem>;

  constructor(
    private _itemService: ItemService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public _matPaginatorIntl: MatPaginatorIntl
  ) { }

  ngOnInit(): void {
    this.loadItems();
    this._matPaginatorIntl.itemsPerPageLabel = 'Registros por página';
  }

  loadItems() {
    this.loading = true;
    this._itemService.getRecords().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
      this.isDisabled = false;
    });
  }

  dialogAddOrEdit(id?: string) {
    const dialogRef = this._dialog.open(ItemCreateEditComponent, {
      width: '350px',
      disableClose: true,
      data: {
        item_id: id,
      }
    });

    console.log(id);

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.loadItems();
      }
    });
  }

  deleteItem(id: string) {
    this.loading = true;
    this._itemService.deleteRecord(id).subscribe((data) => {
      this._snackBar.open(`${this.title} eliminada`, 'Cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
      this.loading = false;
      this.loadItems();
    })
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
