import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICategory } from 'src/app/interfaces/category.interface';
import { ItemCategoryService } from 'src/app/services/item-category.service';
import { CategoryCreateEditComponent } from '../category-create-edit/category-create-edit.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title: string = 'Categoria ';
  listRecords: ICategory[] = [];
  loading: boolean = false;

  displayedColumns: string[] = ['index', 'name', 'status', 'actions'];
  dataSource!: MatTableDataSource<ICategory>;

  constructor(
    private _itemCategory: ItemCategoryService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public _matPaginatorIntl: MatPaginatorIntl
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this._matPaginatorIntl.itemsPerPageLabel = 'Registros por página';
  }

  loadCategories() {
    this.loading = true;
    this._itemCategory.getRecords().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  dialogAddOrEdit(id?: string) {
    const dialogRef = this._dialog.open(CategoryCreateEditComponent, {
      width: '350px',
      disableClose: true,
      data: {
        item_category_id: id,
      }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.loadCategories();
      }
    });
  }

  deleteCategory(id: string) {
    this.loading = true;
    this._itemCategory.deleteRecord(id).subscribe((data) => {
      this._snackBar.open(`${this.title} eliminada`, 'Cerrar', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.loading = false;
      this.loadCategories();
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
