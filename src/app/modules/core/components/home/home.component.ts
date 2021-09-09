import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Color } from 'src/app/modules/shared/model/color';
import { ColorsService } from '../../services/colors.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  colorList: Color[] = [];

  constructor(private colorsService: ColorsService,
    private route: ActivatedRoute,
    protected router: Router) {
    this.route.data.subscribe((data) => {
      console.log("activated route data", data);
      this.colorList = data.colorList;
    });
  }

  ngOnInit(): void {
  }

  addColor() {
    this.router.navigate(["/color", '']);
  }
}
