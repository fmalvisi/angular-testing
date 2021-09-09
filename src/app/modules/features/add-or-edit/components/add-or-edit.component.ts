import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ColorsService } from 'src/app/modules/core/services/colors.service';
import { Color } from 'src/app/modules/shared/model/color';

@Component({
  selector: 'app-add-or-edit',
  templateUrl: './add-or-edit.component.html',
  styleUrls: ['./add-or-edit.component.scss']
})
export class AddOrEditComponent implements OnInit {
  currentId: string = '';
  selectedColor: Color | undefined;
  colorForm = this.fb.group({
    id: ['', Validators.required, Validators.min(1)],
    name: ['', Validators.required, Validators.minLength(1)],
    year: [''],
    color: ['', Validators.required, Validators.pattern('')],
    pantone_value: ['', Validators.required, Validators.pattern('')],
    loaded: [''],
    edited_by: [''],
    check: [false, Validators.requiredTrue]
  })

  constructor(private route: ActivatedRoute,
    private colorService: ColorsService,
    private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.currentId = paramMap.get('colorId') || '';
      if (this.currentId !== '') {
          this.colorService.getColor(+this.currentId).then((res: Color) => {
            this.selectedColor = res;
          }).catch((error) => {
            this.selectedColor = undefined;
          })
      } else {
        //new color
        this.selectedColor = this.generateNewColorStub(); //Collisions
      }
    })
  }

  private generateNewColorStub(): Color {
    const now = new Date();
    return {
      id: (Math.random() * (999 - 100) + 100),
      color: "#000000",
      name: "inserisci nome qui",
      pantone_value: "xxx-xxxxx",
      year: now.getFullYear(),
      loaded: now.toISOString(),
      edited_by: "You"
    }
  }

  get id() {
    return this.colorForm.get('id');
  }

  get name() {
    return this.colorForm.get('name');
  }

  get year() {
    return this.colorForm.get('year');
  }

  get color() {
    return this.colorForm.get('color');
  }

  get pantone_value() {
    return this.colorForm.get('pantone_value');
  }

  get loaded() {
    return this.colorForm.get('loaded');
  }

  get edited_by() {
    return this.colorForm.get('edited_by');
  }

  submit() {
    this.colorService.editOrAddColor(this.selectedColor!);
  }

}
