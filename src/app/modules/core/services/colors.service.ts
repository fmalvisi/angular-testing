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
            if (!currentColor.loaded) {
              currentColor.loaded = new Date().toISOString();
            }
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

  editColor(editedColor: Color) {
    console.log("arrivato colore", editedColor)
    if (!!editedColor && !!editedColor.id) {
      console.log("chiamato putColor con id: ", editedColor.id);
      this.http.put<Color>(this.baseURL+"/"+editedColor.id, editedColor).toPromise().then(
        res => {
          console.log("putColor response: ", res);
        },
        error => {
          console.log('putColor reject', error);
        }
      );
    }
  }

  addColor(newColor: Color) {
    console.log("arrivato colore", newColor)
    if (!!newColor && !!newColor.id) {
      console.log("chiamato postColor con id: ", newColor.id);
      this.http.post<any>(this.baseURL, newColor).toPromise().then(
        res => {
          console.log("postColor response: ", res);
        },
        error => {
          console.log('postColor reject', error);
        }
      );
    }
  }

  
}
