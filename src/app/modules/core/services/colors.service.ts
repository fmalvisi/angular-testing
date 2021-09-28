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
  private localURL = "http://localhost:3000/colori"

  constructor(private http: HttpClient) {
    this.baseURL = this.localURL;
  }

  getColorList(): Promise<Color[]> {
    console.log("chiamato getColorList");
    this.fetchedColors = [];
    return this.http.get<Color[]>(this.baseURL).pipe(
      map(res => {
        console.log("getColorList response: ", res);
        if (!res) {

        } else {
          for (let currentColor of res) {
            currentColor.loaded = new Date().toISOString();
            this.fetchedColors.push(currentColor);
          }
        }
        return this.fetchedColors;
      })
    ).toPromise();
  }

  getColor(id: number) {
    console.log("chiamato getColor con id: ", id);
    const _promise = new Promise<Color>((resolve, reject) => {
      this.http.get<Color>(this.baseURL+"/"+id).toPromise().then(
        res => {
          console.log("getColor response: ", res);
          resolve(res);
        },
        error => {
          console.log('getColor reject', error);
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
