import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IItem } from 'src/app/interfaces/item.interface';
import { IPoint } from 'src/app/interfaces/point.interface';
import { ItemCategoryService } from 'src/app/services/item-category.service';
import { ItemService } from 'src/app/services/item.service';
import { PointService } from 'src/app/services/point.service';

@Component({
  selector: 'app-point-exchange',
  templateUrl: './point-exchange.component.html',
  styleUrls: ['./point-exchange.component.scss']
})
export class PointExchangeComponent implements OnInit {

  title: string = 'Canje de Puntos';
  loading: boolean = false;
  form!: FormGroup;
  selectCategories: any[] = [];
  selectItems: any[] = [];

  selectedItem!: string;
  selectedItemValue!: string;

  dataProducto: any

  document: string | undefined;

  constructor(
    private _itemService: ItemService,
    private _itemCategoryService: ItemCategoryService,
    private _pointService: PointService,
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<PointExchangeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IItem) {
    this.form = this._formBuilder.group({
      category_id: ['', []],
      item: ['', []],
      description: ['', []],
      point: ['', []],
    })
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this._itemCategoryService.getRecords().subscribe((data) => {
      this.selectCategories = data;
    })
  }

  AllItems() {
    const categoryID = this.form.get('category_id')?.value;
    this._itemService.getItemByCategory(categoryID).subscribe((data) => {
      this.selectItems = data;
    })
  }


  formAdd() {
    // this._itemService.getItemByCategory(this.form.value.description).subscribe((data) => {
    //   console.log(data);
    // })

    const point: IPoint = {
      type_document_id: 'dbe794e1-f70c-11e8-b6f9-d69aa9b6ae73',
      document: '46789226',
      points: (-this.form.value.point)
    }

    this._pointService.createRecord(point).subscribe((data) => {
      this._snackBar.open('Punto creado', 'Cerrar', {
        duration: 2000
      });
      this._dialogRef.close(true);
    })
  }

  onSelectionChange() {
    this.selectedItemValue = this.selectedItem;
    this._itemService.getRecord(this.selectedItem).subscribe((data) => {
      this.dataProducto = data;
      this.form.setValue({
        category_id: data.item_category_id,
        item: data.name,
        description: data.description,
        point: data.point_value,
      })
    })
  }

  // newPoint() {
  //   this._pointService.createRecord(this.form.value).subscribe((data) => {
  //     this._snackBar.open('Punto creado', 'Cerrar', {
  //       duration: 2000
  //     });
  //     this.dialogClose();
  //   })
  // }

  dialogClose() {
    this._dialogRef.close();
  }

}
