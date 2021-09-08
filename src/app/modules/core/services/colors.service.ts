import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Color } from '../../shared/model/color';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  baseURL: string;
  fetchedColors: Color[] = [];

  constructor(private http: HttpClient) {
    this.baseURL = "https://reqres.in/api/colori";
  }

  getColorList(): Promise<Color[]> {
    console.log("chiamato getColorList");
    this.fetchedColors = [];
    return this.http.get<any>(this.baseURL).pipe(
      map(res => {
        console.log("getColorList response: ", res);
        if (!res || !res.data) {

        } else {
          for (let currentColor of res.data) {
            currentColor.loaded = new Date().toISOString();
            this.fetchedColors.push(currentColor);
          }
        }
        return this.fetchedColors;
      })
    ).toPromise();
  }

  /*getColorList(): Color[] {
    console.log("chiamato getColorList");
    this.fetchedColors = [];
    this.http.get<any>(this.baseURL).subscribe(
      res => {
        console.log("getColorList response: ", res);
        if (!res || !res.data) {

        } else {
          for (let currentColor of res.data) {
            currentColor.loaded = new Date().toISOString();
            this.fetchedColors.push(currentColor);
          }
        }
        return this.fetchedColors;
      },
      error => {
        console.log('getColorList reject', error);
        alert(error);
        return null;
      }
    );
  } */

  getColor(id: number) {
    console.log("chiamato getColor con id: ", id);
    const _promise = new Promise<Color>((resolve, reject) => {
      this.http.get<Color>(this.baseURL+"/"+id).toPromise().then(
        res => {
          console.log("getColorList response: ", res);
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

  editOrAddColor(editedColor: Color) {
    if (!!editedColor && !!editedColor.id) {
      for (let currentColor of this.fetchedColors) {
        if (currentColor.id === editedColor.id) {
          currentColor = editedColor //TODO TEST
          return;
        }
      }
      this.fetchedColors.push(editedColor);
    }
  }
}
