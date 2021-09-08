import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { Color } from '../../shared/model/color';
import { ColorsService } from '../services/colors.service';

@Injectable({
  providedIn: 'root'
})
export class ColorListResolver implements Resolve<Color[]> {
  constructor(
    private colorService: ColorsService) {

    }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Color[]> | Promise<Color[]> | Color[] {
    console.log("resolver called");
    return this.colorService.getColorList();

  }
}

