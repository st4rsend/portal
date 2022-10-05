import { Directive, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appIframeDynamic]'
})
export class IframeDynamicDirective implements OnInit, OnDestroy {

	private listener!: () => void;
	private observer!: MutationObserver;

  get element() {
    return this.elementRef.nativeElement;
  }

  get contentHeight() {
		if (this.element.contentDocument) {
    	return this.element.contentDocument.body.scrollHeight;
		} 
/*
	else {
			console.log("4000");
			return 4000
		}
*/
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

	ngOnInit() {
  	this.listener = this.renderer.listen(this.element, 'load', () => {
			this.setFrameHeight(this.contentHeight);

    	this.observer = new MutationObserver((mutations) => {
      	//console.log('Mutation happened', this.contentHeight);
      	this.setFrameHeight(this.contentHeight);
    	});
			console.log(this.element.contentWindow.body);
			if (this.element.contentDocument) {
    		this.observer.observe(this.element.contentDocument.body, {
      		attributes: true,
      		childList: true,
      		characterData: true,
      		//subtree: true
    		});
			} else {
				console.log("SNIFF");
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
		this.observer.disconnect();
		this.listener();
	}
}
