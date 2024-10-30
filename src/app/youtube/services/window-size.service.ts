import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService {
  screenWidth$: Observable<number>;

  private breakPointObserver: BreakpointObserver;

  constructor(breakPointObserver: BreakpointObserver) {
    this.breakPointObserver = breakPointObserver;
    this.screenWidth$ = this.breakPointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
      .pipe(
        map((result) => {
          if (result.breakpoints[Breakpoints.XLarge]) {
            return 1920;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            return 1280;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            return 960;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            return 600;
          }
          return window.innerWidth;
        }),
      );
  }
}
