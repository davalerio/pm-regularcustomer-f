import { BreakpointObserver } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(
    private _router: Router,
    private _observer: BreakpointObserver,
    private _changeDetector: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this._observer.observe(['(min-width: 1330px)']).subscribe((data: any) => {
      if (data.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'over';
        this.sidenav.open();
      }
    });
    this._changeDetector.detectChanges();
  }

  onLogout() {
    this._router.navigate(['/login']);
  }
}
