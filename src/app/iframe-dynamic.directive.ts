import { Directive, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appIframeDynamic]',
    standalone: false
})
export class IframeDynamicDirective implements OnInit, OnDestroy {

	private listener!: () => void;
	private observer!: MutationObserver;
	private resize_obs!: ResizeObserver;

	private timer!: ReturnType<typeof setInterval>;

  get element() {
    return this.elementRef.nativeElement;
  }

  get contentHeight() {
		if (this.element.contentDocument) {
    	return this.element.contentDocument.body.scrollHeight;
		} 
  }


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

	ngOnInit() {

  	this.listener = this.renderer.listen(this.element, 'load', () => {
			this.setFrameHeight(this.contentHeight);
			this.timer = setInterval(
				() => { this.setFrameHeight(this.contentHeight);},
				2000);
    	this.observer = new MutationObserver((mutations) => {
      	this.setFrameHeight(this.contentHeight);
    	});
			if (this.element.contentDocument) {
    		this.observer.observe(this.element.contentDocument.body, {
      		attributes: true,
      		childList: true,
      		characterData: true,
      		subtree: false
    		});
			}
  	});
 	}

	setFrameHeight(height: number) {
		this.renderer.setStyle(
		this.element,
		'height',
		`${height}px`
 		);
	}

	ngOnDestroy() {
		if (this.timer) {	clearInterval(this.timer); }
		this.observer.disconnect();
		this.listener();
	}
}
