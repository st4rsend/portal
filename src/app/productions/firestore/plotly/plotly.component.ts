import { Component, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
import { Data, Layout, Config } from 'plotly.js-dist-min';

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

	private renderPlot() {
		const parsed = JSON.parse(this.data);
		this.graphData = parsed.data;
		this.layout = parsed.layout;
		this.config = parsed.config ?? {};
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
