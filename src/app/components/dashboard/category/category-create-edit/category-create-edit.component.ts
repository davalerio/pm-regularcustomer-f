import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from 'src/app/interfaces/category.interface';
import { ItemCategoryService } from 'src/app/services/item-category.service';

@Component({
  selector: 'app-category-create-edit',
  templateUrl: './category-create-edit.component.html',
  styleUrls: ['./category-create-edit.component.scss']
})
export class CategoryCreateEditComponent implements OnInit {

  title: string = 'Categoria ';
  operation: string = 'Agregar';
  loading: boolean = false;
  hide: boolean = true;
  id: string | undefined;
  form!: FormGroup;

  constructor(
    private _itemCategory: ItemCategoryService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<CategoryCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICategory
  ) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
    });

    this.id = data.item_category_id;
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: string | undefined) {
    if (id != undefined) {
      this.operation = 'Editar ';
      this.getCategories(id)
    }
  }

  getCategories(id: string) {
    this.loading = true
    this._itemCategory.getRecord(id).subscribe((data) => {
      this.form.setValue({
        name: data.name
      })
      this.loading = false
    })
  }

  formAddOrEdit() {
    const category: ICategory = {
      name: this.form.value.name
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    this.loading = true

    if (this.id != undefined) {
      this._itemCategory.updateRecord(this.id, category).subscribe({
        next: (data) => {
          this._snackBar.open(`${this.title} actualizado`, 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          })
          this._dialogRef.close(true);
          this.loading = false
        },
        error: (err) => {
          console.log(err)
          this._snackBar.open(`Error al actualizar ${this.title}`, 'Cerrar')
          this.loading = false
        }
      })
    } else {
      this._itemCategory.createRecord(category).subscribe({
        next: (data) => {
          this._snackBar.open(`${this.title} registrado`, 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          this._dialogRef.close(true);
          this.loading = false
        },
        error: (err) => {
          const message = err.error.message;
          this._snackBar.open(`${message}`, 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          })
          this.loading = false
        }
      })
    }


  }

  dialogClose() {
    this._dialogRef.close(false);
  }
}
