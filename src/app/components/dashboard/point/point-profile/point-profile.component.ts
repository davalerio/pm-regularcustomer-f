import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICustomer } from 'src/app/interfaces/customer.interface';
import { IPoint, IPointCustomer } from 'src/app/interfaces/point.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { PointService } from 'src/app/services/point.service';
import { __addDisposableResource } from 'tslib';

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
    private _pointService: PointService,
    private _customerService: CustomerService,
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<PointProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPointCustomer
  ) {
    this.form = this._formBuilder.group({
      firstname: ['cargando...'],
      second_name: ['cargando...'],
      lastname: ['cargando...'],
      lastname_mother: ['cargando...'],
      type_document: ['cargando...'],
      document: ['cargando...'],
      birthdate: ['cargando...'],
      email: ['cargando...'],
      phone: ['cargando...'],
      ubigeo: ['cargando...'],
      address: ['cargando...'],
    });
    this.document = data.document;
  }
  ngOnInit(): void {
    this.esEditar(this.document);
  }

  esEditar(document: string | undefined) {
    if (document != undefined) {
      this.getCustomer(document);
    }
  }

  getCustomer(document: string) {
    this.loading = true;
    this._pointService.getPointsDocument(document).subscribe((data) => {
      this.form.setValue({
        firstname: data.firstname,
        second_name: data.second_name,
        type_document: data.type_document,
        lastname: data.lastname,
        lastname_mother: data.lastname_mother,
        document: data.document,
        birthdate: data.birthdate,
        email: data.email,
        phone: data.phone,
        ubigeo: data.ubigeo,
        address: data.address
      });
      this.loading = false
    })
  }

  // formAddOrEdit() {
  //     const customer: ICustomer = {
  //       document: this.form.value.document,
  //       firstname: this.form.value.firstname,
  //       second_name: this.form.value.second_name,
  //       lastname: this.form.value.lastname,
  //       lastname_mother: this.form.value.lastname_mother,
  //       birthdate: this.form.value.birthdate,
  //       email: this.form.value.email,
  //       phone: this.form.value.phone,
  //       ubigeo: this.form.value.ubigeo,
  //       address: this.form.value.address
  //     }
  //   }

  formClose() {
    this._dialogRef.close();
  }
}
