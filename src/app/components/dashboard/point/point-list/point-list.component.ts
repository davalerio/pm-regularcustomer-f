import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IPoint, IPointCustomer } from 'src/app/interfaces/point.interface';
import { PointService } from 'src/app/services/point.service';

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.scss']
})
export class PointListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title: string = 'Puntos ';
  listRecords: IPointCustomer[] = [];
  loading: boolean = false;
  isDisabled: boolean = true;

  displayedColumns: string[] = ['fullname', 'type_document_id', 'document', 'actions'];
  dataSource!: MatTableDataSource<IPointCustomer>;

  constructor(
    private _pointService: PointService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadPoints();
  }

  loadPoints() {
    this.loading = true;
    this._pointService.getPointsCutomers().subscribe((data: any) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
      this.isDisabled = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSearch() {

  }
}
