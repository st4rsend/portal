import {
	Component,
	AfterViewInit,
	ElementRef,
	ViewChild,
	Input,
	OnChanges,
	SimpleChanges } from '@angular/core';
import DOMPurify from 'dompurify';
import * as Plotly from 'plotly.js-dist-min';
import { Data, Layout, Config } from 'plotly.js-dist-min';

interface SafeConfig extends Partial<Config> {
	sanitize?: boolean;
}


@Component({
  selector: 'app-plotly',
  imports: [],
  templateUrl: './plotly.component.html',
  styleUrl: './plotly.component.sass'
})
export class PlotlyComponent implements OnChanges, AfterViewInit {
	@Input() data: any;
	public graphData: Data[] = [];
	public layout: Partial<Layout> = {};
	public config: Partial<Config> = {};

/*
public graphData: Data[] = [
	{
		x: [1, 2, 3, 4],
		y: [10, 15, 13, 17],
		type: 'scatter'
	}
];
*/

	private initialized = false;
	private container!: HTMLElement;

	constructor(private el: ElementRef) {}

	ngAfterViewInit() {
		this.container = this.el.nativeElement.querySelector('.plot-container');
		this.initialized = true;
		this.renderPlot();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.initialized && (changes['data'] || changes['layout'])) {
			this.renderPlot();
		}
	}

	enforcePlotlySanitize(config?: SafeConfig): SafeConfig {
		return {
			...config,
			sanitize: true
		}
	}

// TODO fix function or better find suitable alternate 
	sanitizePlotlyObject(obj: any): any {
		if (Array.isArray(obj)) {
			return obj.map(this.sanitizePlotlyObject);
		} else if (typeof obj === 'object' && obj !== null) {
			const sanitizedObj: any = {};
			for (const key of Object.keys(obj)) {
				const value = obj[key];
				if (typeof value === 'string') {
					// Only sanitize known risky fields to avoid over-sanitizing labels etc.
					if (['text', 'hovertext', 'title', 'annotation', 'name'].includes(key.toLowerCase())) {
						sanitizedObj[key] = DOMPurify.sanitize(value);
					} else {
						sanitizedObj[key] = value;
					} 
				} else {
					sanitizedObj[key] = this.sanitizePlotlyObject(value);
				}
			}
			return sanitizedObj; 
		} else {
			return obj;
		}
	}

	private renderPlot() {
		//const aparsed = JSON.parse(this.data);
		//const parsed = this.sanitizePlotlyObject(aparsed);
		const parsed = JSON.parse(this.data);
		this.graphData = parsed.data;
		this.layout = parsed.layout;
		this.config = this.enforcePlotlySanitize(parsed.config ?? {});
		const div = this.el.nativeElement.querySelector('.plot-container');
		try {
			Plotly.react(this.container, this.graphData, this.layout, this.config);
		} catch(e) {
			console.error("Error parsing Plotly data: ", e);
		}
	}

	updatePlot(data: Data[], layout: Partial<Layout>, config?: Partial<Config>) {
		this.graphData = data;
		this.layout = layout;
		this.config = config ?? {};
		this.renderPlot();
	}

	onGraphClick(event: any) {
		console.log('Graph clicked:', event);
		alert(`Clicked on point: x=${event.points[0].x}, y=${event.points[0].y}`);
	}
}
