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
    id: [{value: '', disabled: true}, [Validators.required, Validators.min(1)]],
    name: ['', [Validators.required, Validators.minLength(1)]],
    year: ['', [Validators.maxLength(4), Validators.min(1970)]],
    color: ['', [Validators.required, Validators.pattern("^#([a-fA-F0-9]{6})$")]],
    pantone_value: ['', [Validators.required, Validators.pattern("^([0-9]{2}-[0-9]{4})$")]],
    loaded: [{value: '', disabled: true}, []],
    edited_by: [{value: '', disabled: true}, []],
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
      id: Math.ceil((Math.random() * (999 - 100) + 100)),
      color: "#000000",
      name: "inserisci nome qui",
      pantone_value: "00-0000",
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
