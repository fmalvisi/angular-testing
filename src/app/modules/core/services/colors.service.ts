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
    console.log("arrivato colore", editedColor)
    if (!!editedColor && !!editedColor.id) {
      console.log("colore definito");
      let found = false;
      this.fetchedColors.forEach((value, index) => {
        console.log("cerco colore")
        if (value.id === editedColor.id) {
          console.log("colore trovato", value.id)
          this.fetchedColors[index] = editedColor;
          console.log("nuovo array colori", this.fetchedColors);
          found = true;
          return;
        }
      });
      if (!found) {
        console.log("colore nuovo");
        this.fetchedColors.push(editedColor);
      }
    }
    
    console.log("nuovo array colori", this.fetchedColors);
  }
}
