import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/modules/shared/model/color';

@Component({
  selector: 'app-color-card',
  templateUrl: './color-card.component.html',
  styleUrls: ['./color-card.component.scss']
})
export class ColorCardComponent implements OnDestroy {
  @Input() color: Color | undefined;

  constructor(protected router: Router) { }

  editColor() {
    if (!!this.color) {
      this.router.navigate(['/color', this.color.id]);
    }
  }

  ngOnDestroy() {}

}
