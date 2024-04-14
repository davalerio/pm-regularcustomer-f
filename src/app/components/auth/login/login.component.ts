import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  title: string = 'Cliente Frecuente';
  loading: boolean = true;
  hide: boolean = true;
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.form = this._formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  onFormSubmit() {
    this.loading = true;
    this._router.navigate(['/dashboard']);
    this._snackBar.open('Bienvenido', 'Cerrar', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
    this.loading = false;
  }
}
