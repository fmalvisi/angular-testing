import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Color } from '../../shared/model/color';
import { ColorsService } from '../services/colors.service';

import { ColorListResolver } from './color-list.resolver';

class MockColorsService {
    colors = [
      {
        "id": 1,
        "name": "cerulean",
        "year": 2000,
        "color": "#98B2D1",
        "pantone_value": "15-4020",
        "loaded": "2011-02-005 14:02:13"
      }
    ]
    getColorList(): Promise<Color[]> {
      const _promise = new Promise<Color[]>((resolve, reject) => {
        resolve(this.colors);
      });
      return _promise;
    }
  }
describe('ColorListResolverService', () => {
    let resolver: ColorListResolver;
    let route: ActivatedRouteSnapshot;
    let snapshot: RouterStateSnapshot

  beforeEach(() => {
    
    let httpMock: HttpTestingController;
    route = new ActivatedRouteSnapshot();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ColorsService, useClass: MockColorsService}]
    });
    httpMock = TestBed.inject(HttpTestingController);
    resolver = TestBed.inject(ColorListResolver);
  });

  it('should create', () => {
      expect(resolver).toBeTruthy();
      route.data = {id: 1}
      snapshot = {url: '', root: route};
      spyOn(resolver['colorService'], 'getColorList').and.callThrough();
      resolver.resolve(route, snapshot);
      expect(resolver['colorService'].getColorList).toHaveBeenCalledTimes(1);
  })
});
