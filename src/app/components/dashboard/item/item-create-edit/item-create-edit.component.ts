import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IItem } from 'src/app/interfaces/item.interface';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-create-edit',
  templateUrl: './item-create-edit.component.html',
  styleUrls: ['./item-create-edit.component.scss']
})
export class ItemCreateEditComponent implements OnInit {

  title: string = 'Item ';
  operation: string = 'Agregar';
  loading: boolean = false;
  hide: boolean = true;
  id: string | undefined;
  form!: FormGroup;

  constructor(
    private _itemService: ItemService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<ItemCreateEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IItem
  ) {
    this.form = this._formBuilder.group({
      item_category_id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });

    this.id = data.item_id;
  }

  ngOnInit(): void {
    this.esEditar(this.id);
  }

  esEditar(id: string | undefined) {
    if (id != undefined) {
      this.operation = 'Editar ';
      this.getItems(id)
    }
  }

  getItems(id: string) {
    this.loading = true
    this._itemService.getRecord(id).subscribe((data) => {
      this.form.setValue({
        item_category_id: data.item_category_id,
        name: data.name,
        description: data.description
      })
      this.loading = false
    })
  }

  formAddOrEdit() {
    const item: IItem = {
      item_category_id: this.form.value.item_category_id,
      name: this.form.value.name,
      description: this.form.value.description
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return
    }

    this.loading = true

    if (this.id != undefined) {
      this._itemService.updateRecord(this.id, item).subscribe({
        next: (data) => {
          this._snackBar.open(`${this.title} actualizado`, 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
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
      this._itemService.createRecord(item).subscribe({
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
