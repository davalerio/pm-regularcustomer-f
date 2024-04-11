import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPoint, IPointCustomer } from 'src/app/interfaces/point.interface';

@Component({
  selector: 'app-point-profile',
  templateUrl: './point-profile.component.html',
  styleUrls: ['./point-profile.component.scss']
})
export class PointProfileComponent implements OnInit {

  loading: boolean = false;
  form!: FormGroup;
  isDisabled: boolean = true;
  isReadOnly: boolean = true;
  document: string | undefined;

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<PointProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPointCustomer
  ) {
    this.form = this._formBuilder.group({
      firstname: [''],
      second_name: [''],
      lastname: [''],
      lastname_mother: [''],
      type_document: [''],
      document: [''],
      birthdate: [''],
      email: [''],
      phone: [''],
      ubigeo: [''],
      address: ['']
    });
    this.document = data.document;
  }
  ngOnInit(): void {

  }

  formAddOrEdit() {

  }

  formClose() {
    this._dialogRef.close();
  }
}
