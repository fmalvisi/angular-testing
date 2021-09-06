import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Color } from '../../shared/model/color';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  baseURL: string;

  constructor(private http: HttpClient) {
    this.baseURL = "https://reqres.in/api/colori";
  }

  getColorList() {
    console.log("chiamato getColorList");
    const _promise = new Promise<Color[]>((resolve, reject) => {
      this.http.get<any>(this.baseURL).toPromise().then(
        res => {
          console.log("getColorList response: ", res);
          let colorList = [];
          if (!res || !res.data) {
            
          } else {
            colorList = res.data;
          }
          resolve(res.data);
        },
        error => {
          console.log('getColorList reject', error);
          reject(error);
        }
      );
    });
    return _promise;
  }

  getColor(id: number) {
    console.log("chiamato getColor con id: ", id);
    const _promise = new Promise<Color>((resolve, reject) => {
      this.http.get<Color>(this.baseURL+"/"+id).toPromise().then(
        res => {
          console.log("getColorList response: ", res);
          res.loaded = new Date().toISOString();
          resolve(res);
        },
        error => {
          console.log('getColorList reject', error);
          reject(error);
        }
      );
    });
    return _promise;
  }
}
