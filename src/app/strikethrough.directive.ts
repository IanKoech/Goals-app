import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appStrikethrough]'
})
export class StrikethroughDirective {

  constructor(private elem:ElementRef) {
    this.elem.nativeElement.style.textDecoration='line-through';
   }

   @HostListener("click") onClicks(){
     this.textDecoration("line-through");
   }
   @HostListener("dblclick") onDoubleClicks(){
     this.textDecoration("none");
   }
  textDecoration(action:string){
    this.elem.nativeElement.style.textDecoration=action;
  }
}