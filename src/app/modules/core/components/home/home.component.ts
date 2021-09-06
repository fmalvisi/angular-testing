import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/modules/shared/model/color';
import { ColorsService } from '../../services/colors.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  colorList: Color[] = [];

  constructor(private colorsService: ColorsService) { }

  ngOnInit(): void {
    this.populateList();
  }

  populateList() {
    this.colorsService.getColorList().then((colors: Color[]) => {
      this.colorList = colors;
    });
  }

}
