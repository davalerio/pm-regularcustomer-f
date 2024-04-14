import { Component, OnInit } from '@angular/core';
import { ICustomer } from 'src/app/interfaces/customer.interface';
import { IPointCustomer } from 'src/app/interfaces/point.interface';
import { CustomerService } from 'src/app/services/customer.service';
import { PointService } from 'src/app/services/point.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listCustomers: ICustomer[] = [];
  listPointsCustomers: IPointCustomer[] = [];
  loading: boolean = false;

  constructor(private _customerService: CustomerService, private _pointServices: PointService) { }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadPointsCustomers();
  }

  loadCustomers() {
    this.loading = true;
    this._customerService.getRecords().subscribe((data: any) => {
      this.listCustomers = data.length;
      this.loading = false;
    });
  }

  loadPointsCustomers() {
    this.loading = true;
    this._pointServices.getPointsCutomers().subscribe((data: any) => {
      this.listPointsCustomers = data.length;
      this.loading = false;
    });
  }
}
