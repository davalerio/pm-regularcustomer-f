import { Component, OnInit, ViewChild, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PointService } from 'src/app/services/point.service';
import { PointProfileComponent } from '../point-profile/point-profile.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPoint } from 'src/app/interfaces/point.interface';

@Component({
  selector: 'app-point-view',
  templateUrl: './point-view.component.html',
  styleUrls: ['./point-view.component.scss'],
})
export class PointViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title: string = 'Puntos Acumulados';
  loading: boolean = false;
  form!: FormGroup;
  pointsCustomer = signal<any>({});

  displayedColumns: string[] = ['index', 'document'];
  dataSource!: MatTableDataSource<IPoint>;

  constructor(
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _activedRoute: ActivatedRoute,
    private _pointService: PointService,
    private _router: Router
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
      address: [''],
      total_points: ['99999'],
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this._activedRoute.params.subscribe((params) => {
      this._pointService.getPointsDocument(params['document']).subscribe({
        next: (res: any) => {
          this.pointsCustomer.set(res);
          this.loading = false;
        },
      });
    });
  }

  dialogProfile(document: string) {
    const dialogRef = this._dialog.open(PointProfileComponent, {
      width: '500px',
      disableClose: true,
      data: {
        document: document
      }
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        console.log('Carga data en la tabla');
      }
    });
  }

  formClose() { }

  openDialog() { }
}
