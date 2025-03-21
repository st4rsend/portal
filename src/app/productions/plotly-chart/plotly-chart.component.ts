import { Component, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Plotly from 'plotly.js-dist-min';
import { Data, Layout, Config } from 'plotly.js-dist-min';

@Component({
  selector: 'app-plotly-chart',
  imports: [],
  templateUrl: './plotly-chart.component.html',
  styleUrl: './plotly-chart.component.sass'
})
export class PlotlyChartComponent implements OnChanges, AfterViewInit {
	@Input() data: Data[] = [];
	@Input() layout: Partial<Layout> = {};
	@Input() config: Partial<Config> = {};

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
		const div = this.el.nativeElement.querySelector('.plot-container');
		Plotly.react(this.container, this.data, this.layout, this.config);
	}

	updatePlot(data: Data[], layout: Partial<Layout>, config?: Partial<Config>) {
		this.data = data;
		this.layout = layout;
		this.config = config ?? {};
		this.renderPlot();
	}
}
