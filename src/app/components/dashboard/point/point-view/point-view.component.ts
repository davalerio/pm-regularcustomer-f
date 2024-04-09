import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PointService } from 'src/app/services/point.service';

@Component({
  selector: 'app-point-view',
  templateUrl: './point-view.component.html',
  styleUrls: ['./point-view.component.scss']
})
export class PointViewComponent implements OnInit {

  title: string = 'Puntos Acumulados';
  loading: boolean = false;
  form!: FormGroup;
  inputDisabled: boolean = true;
  pointsCustomer = signal<any>({});

  constructor(private _formBuilder: FormBuilder, private _activedRoute: ActivatedRoute, private _pointService: PointService, private _router: Router) {
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
      address: [''],
      total_points: ['99999'],
    });
  }

  ngOnInit(): void {
    this._activedRoute.params.subscribe(params => {
      this._pointService.getPointsDocument(params['document']).subscribe({
        next: ((res: any) => {
          this.pointsCustomer.set((res));
        })
      })
    })
  }

  formAddOrEdit() { }
  formClose() {
    this._router.navigate(['/dashboard/points/']);
  }
}