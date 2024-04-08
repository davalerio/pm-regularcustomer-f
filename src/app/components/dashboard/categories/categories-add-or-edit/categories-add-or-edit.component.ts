import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ICategory } from 'src/app/interfaces/categories.interface';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-add-or-edit',
  templateUrl: './categories-add-or-edit.component.html',
  styleUrls: ['./categories-add-or-edit.component.scss']
})
export class CategoriesAddOrEditComponent implements OnInit {

  title: string = 'Categoria ';
  operation: string = 'Agregar';
  loading: boolean = false;
  hide: boolean = true;
  id: string | undefined;
  form!: FormGroup;

  constructor(
    private _categoryService: CategoriesService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _dialogReft: MatDialogRef<CategoriesAddOrEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICategory
  ) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]]
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
    this._categoryService.getByID(id).subscribe((data) => {
      console.log(data)
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
    this._categoryService.create(category).subscribe((data) => {
      this._snackBar.open(`${this.title} registrado`, 'Cerrar')
      this._dialogReft.close(true);
      this.loading = false
    })
  }

  formCancelar() {
    this._dialogReft.close(false);
  }
}
