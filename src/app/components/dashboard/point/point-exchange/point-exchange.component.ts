import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPoint } from 'src/app/interfaces/point.interface';

@Component({
  selector: 'app-point-exchange',
  templateUrl: './point-exchange.component.html',
  styleUrls: ['./point-exchange.component.scss']
})
export class PointExchangeComponent implements OnInit {

  title: string = 'Canje de Puntos';
  loading: boolean = false;
  form!: FormGroup;

  constructor(
    private _snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    private _dialogRef: PointExchangeComponent,
    @Inject(MAT_DIALOG_DATA) public data: IPoint) {
    this.form = this._formBuilder.group({

    })
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  dialogClose() {

  }

}
