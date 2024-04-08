import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICategory } from 'src/app/interfaces/categories.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import { CategoriesAddOrEditComponent } from '../categories-add-or-edit/categories-add-or-edit.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title: string = 'Categoria ';
  listCategories: any[] = [];
  loading: boolean = false;

  displayedColumns: string[] = ['name', 'actions'];
  dataSource!: MatTableDataSource<ICategory>;

  constructor(
    private _categoryService: CategoriesService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.loading = true;
    this._categoryService.getAll().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    });
  }

  dialogAddOrEdit(id?: string) {
    const dialogRef = this._dialog.open(CategoriesAddOrEditComponent, {
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
    this._categoryService.deleteByID(id).subscribe((data) => {
      console.log(data);
      this._snackBar.open('Categoria eliminada con éxito', 'Ok');
      // this.loadCategories();
      this.loading = false;
    })
  }

  onSearch() { }

  applyFilter(event: Event) {
    // const filterValue = (event.target as HTMLInputElement).value;
    // this.datasource.filter = filterValue.trim().toLowerCase();

    // if (this.datasource.paginator) {
    //   this.datasource.paginator.firstPage();
    // }
  }



}
