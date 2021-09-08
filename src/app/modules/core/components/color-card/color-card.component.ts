import { Component, Input, OnDestroy } from '@angular/core';
import { Color } from 'src/app/modules/shared/model/color';

@Component({
  selector: 'app-color-card',
  templateUrl: './color-card.component.html',
  styleUrls: ['./color-card.component.scss']
})
export class ColorCardComponent implements OnDestroy {
  @Input() color!: Color;

  constructor() { }

  ngOnDestroy() {}

}
