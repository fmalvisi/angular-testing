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
  colorForm : FormGroup = this.fb.group({
    id: [''],
    name: [''],
    year: [''],
    color: [''],
    pantone_value: [''],
    loaded: [''],
    edited_by: [''],
    check: [false, [Validators.requiredTrue]]
  });

  constructor(private route: ActivatedRoute,
    private colorService: ColorsService,
    private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.currentId = paramMap.get('colorId') || '';
      if (this.currentId !== '') {
          this.colorService.getColor(+this.currentId).then((res: Color) => {
            console.log("colore caricato", res);
            this.selectedColor = res;
            this.createForm();
          }).catch((error) => {
            this.selectedColor = undefined;
          })
      } else {
        //new color
        this.selectedColor = this.generateNewColorStub(); //Collisions
        this.createForm();
      }
    })
  }

  createForm() {
    this.colorForm.removeControl("id");
    this.colorForm.removeControl("name");
    this.colorForm.removeControl("year");
    this.colorForm.removeControl("color");
    this.colorForm.removeControl("pantone_value");
    this.colorForm.removeControl("loaded");
    this.colorForm.removeControl("edited_by");
    this.colorForm.setControl("id", this.fb.control({value: '', disabled: true}, [Validators.required, Validators.min(1)]));
    this.colorForm.setControl("name", this.fb.control('', [Validators.required, Validators.minLength(1)]));
    this.colorForm.setControl("year", this.fb.control('', [Validators.min(1970)]));
    this.colorForm.setControl("color", this.fb.control('', [Validators.required, Validators.pattern("^#([a-fA-F0-9]{6})$")]));
    this.colorForm.setControl("pantone_value", this.fb.control('', [Validators.required, Validators.pattern("^([0-9]{2}-[0-9]{4})$")]));
    this.colorForm.setControl("loaded", this.fb.control({value: '', disabled: true}, []));
    this.colorForm.setControl("edited_by", this.fb.control({value: '', disabled: true}, []));
    this.colorForm.patchValue({
      id: this.selectedColor?.id,
      name: this.selectedColor?.name,
      year: this.selectedColor?.year,
      color: this.selectedColor?.color,
      pantone_value: this.selectedColor?.pantone_value,
      loaded: this.selectedColor?.loaded,
      edited_by: this.selectedColor?.edited_by
    });
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
