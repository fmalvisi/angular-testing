import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[rgbDirective]'
})
export class RgbDirective {

  constructor(private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) { }

  @Input('hexvalue') set rgbDirective(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    //there can only be one
    const exists = this.document.getElementById('rgbHint');
    if(result){
      var r= parseInt(result[1], 16);
      var g= parseInt(result[2], 16);
      var b= parseInt(result[3], 16);
      const rgbColor = "rgb: " + r + ", " + g + ", " + b;
      if (exists) {
        exists.innerHTML = rgbColor;
      } else {
        const child = this.document.createElement('div');
        child.id = "rgbHint";
        child.innerHTML = rgbColor;
        this.renderer.addClass(this.elementRef.nativeElement, 'rgbDirective');
        this.renderer.insertBefore(this.document.getElementsByClassName('rgbDirective')[0].parentNode, child, this.elementRef.nativeElement);
      }
    } 
  }

}
