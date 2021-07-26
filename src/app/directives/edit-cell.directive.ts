import { HostListener, Directive, ElementRef, Renderer2 } from '@angular/core';


@Directive({
    selector: '[editCell]'
})

export class EditCellDirective {

    private input: HTMLInputElement | null = null;
    private span: HTMLSpanElement | null = null;

    constructor(private el: ElementRef, private renderer: Renderer2) {}


    private edit(isEditable: boolean) {
        this.span = this.el.nativeElement.querySelector('span') || document.createElement('span');
        this.input = this.el.nativeElement.querySelector('input') || this.el.nativeElement.querySelector('select') || document.createElement('input');
        if(!this.input || !this.span) return;
        
        if (isEditable) {
            this.renderer.setStyle(this.input, 'display', 'block');
            this.renderer.setStyle(this.span, 'display', 'none');
            this.input.focus();
        } else {
            this.renderer.setStyle(this.input, 'display', 'none');
            this.renderer.setStyle(this.span, 'display', 'block');
        }
    }

    @HostListener('dblclick') onMouseClick() {
        this.edit(true);
    }
    @HostListener('focusout') onBlur() {
        this.edit(false);
    }
}
