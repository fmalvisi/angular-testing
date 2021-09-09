import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/modules/shared/model/color';

@Component({
  selector: 'app-color-card',
  templateUrl: './color-card.component.html',
  styleUrls: ['./color-card.component.scss']
})
export class ColorCardComponent implements OnDestroy {
  @Input() color!: Color;

  constructor(protected router: Router) { }

  editColor() {
    this.router.navigate(['/color', this.color.id])
  }

  ngOnDestroy() {}

}
