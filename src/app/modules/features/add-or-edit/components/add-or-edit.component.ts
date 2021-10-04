import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  colorForm : FormGroup = this.fb.group({});

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
      this.colorForm.addControl("id", this.fb.control(this.selectedColor?.id, [Validators.required, Validators.min(1)]));
      this.colorForm.addControl("name", this.fb.control(this.selectedColor?.name, [Validators.required, Validators.minLength(1)]));
      this.colorForm.addControl("year", this.fb.control(this.selectedColor?.year, [Validators.min(1970)]));
      this.colorForm.addControl("color", this.fb.control(this.selectedColor?.color, [Validators.required, Validators.pattern('')]));
      this.colorForm.addControl("pantone_value", this.fb.control(this.selectedColor?.pantone_value, [Validators.required, Validators.pattern('')]));
      this.colorForm.addControl("loaded", this.fb.control(this.selectedColor?.loaded, []));
      this.colorForm.addControl("edited_by", this.fb.control(this.selectedColor?.edited_by, []));
      this.colorForm.addControl("check", this.fb.control(false, [Validators.requiredTrue]));
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

  submit() {
    console.log("submit called");
    this.colorService.editOrAddColor(this.selectedColor!);
  }

}
