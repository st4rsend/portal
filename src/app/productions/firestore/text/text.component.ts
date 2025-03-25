import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import DOMPurify from 'dompurify'


@Component({
  selector: 'app-text',
  imports: [],
  templateUrl: './text.component.html',
  styleUrl: './text.component.sass'
})
export class TextComponent {
	@Input() data: any;
	public inner: string ="";

	constructor(
		private sanitizer: DomSanitizer,
	) {}

	ngOnInit(): void {
		this.data = DOMPurify.sanitize(this.data, {
			ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'i', 'b', 'p', 'li', 'ul', 'pre', 'button'],
			ADD_ATTR: []
		});
		this.inner = this.sanitizer.bypassSecurityTrustHtml(this.data) as string;
	}
}
