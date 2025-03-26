import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import katex from 'katex';

@Component({
  selector: 'app-katex',
  imports: [],
  templateUrl: './katex.component.html',
  styleUrl: './katex.component.sass'
})
export class KatexComponent implements AfterViewInit {
	@ViewChild('mathContainer') mathContainer!: ElementRef;
	@Input() data: any;

	maxLength: number = 500;
	ALLOWED_MACROS: string[] = [
		'\\frac', '\\sqrt', '\\sum', '\\int', '\\sin', '\\cos', '\\tan',
		'\\theta', '\\phi', '\\pi', '\\infty', '\\alpha', '\\beta'
	];

	ngAfterViewInit() {
		const sanitized = this.sanitizeInput(this.data);
		const result = this.analyzeLatex(sanitized);

		if (result.isValid) {
			katex.render(sanitized, this.mathContainer.nativeElement, {
				throwOnError: false
			});
		}	else {
			console.warn('Illegal Latex macros:', result.illegalMacros);
			katex.render('Invalid formula', this.mathContainer.nativeElement);
		}
	}

	sanitizeInput(input: string): string {
		const sanitized = input.replace(/[^\x20-\x7E]/g, '');
		return sanitized.substring(0, this.maxLength);
	}

	analyzeLatex(input: string): { isValid: boolean, illegalMacros: string[]} {
		const macroPattern = /\\[a-zA-Z]+/g;
		const foundMacros = input.match(macroPattern) || [];

		const uniqueMacros = [...new Set(foundMacros)];
		const illegalMacros  = uniqueMacros.filter(macro => !this.ALLOWED_MACROS.includes(macro));

		return {
			isValid: illegalMacros.length === 0,
			illegalMacros
		}
	}
}
