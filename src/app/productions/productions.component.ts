import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { environment } from '../../environments/environment';


import { GlobalService } from '../global.service';
import { HttpClient } from '@angular/common/http';

interface ProductionNode {
	name: string;
	path?: string;
	url?: string;
	children?: ProductionNode[];
}

@Component({
  selector: 'app-productions',
  templateUrl: './productions.component.html',
  styleUrls: ['./productions.component.sass']
})

export class ProductionsComponent implements OnInit {


	private assetsURL: string = "assets/";
	private sub: any;

	public appTheme: string = "light-theme";
	public treeControl = new NestedTreeControl<ProductionNode>(node => node.children);
	public dataSource = new MatTreeNestedDataSource<ProductionNode>();

	public linkType: boolean = false;
	public content = false;
	public ml = false;

  constructor(
			private route: ActivatedRoute,
			private httpClient: HttpClient, 
			private globalService: GlobalService) { 
		this.globalService.displayWish = true;
	}

	hasChild = (_: number, node: ProductionNode) => !!node.children && node.children.length > 0;

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.appTheme = params['theme'];
		});
		this.httpClient.get(this.assetsURL + environment.treeFile).subscribe(data => {
			for ( let item of Object.values(data)) {
				this.dataSource.data.push(item as ProductionNode);
			}
			// tree expoand state management
			this.dataSource.data.forEach(node => {
				this.expandNodes(node, this.globalService.expandedNodeIds);
			});
			// Force MatTree redesign
			this.dataSource.data = [...this.dataSource.data];
			//console.log(this.dataSource.data);
			setTimeout(() => {
				window.scrollTo(this.globalService.productionScrollPosition.x, this.globalService.productionScrollPosition.y);
			}, 0);
		});
	}

	expandNodes(node: ProductionNode, expandedNodeIds: string[]) {
		if (expandedNodeIds.includes(node.name)) {
			this.treeControl.expand(node);
		}

		if (node.children) {
			node.children.forEach(child => {
				this.expandNodes(child, expandedNodeIds);
			});
		}
	}

	trackByName(index: number, item: ProductionNode) {
		return item.name;
	}

	onToggle(node: ProductionNode, isExpanded: boolean) {
		const index = this.globalService.expandedNodeIds.indexOf(node.name);
		if (isExpanded && index === -1) {
			this.globalService.expandedNodeIds.push(node.name);
		} else if (!isExpanded && index !== -1) {
			this.globalService.expandedNodeIds.splice(index, 1);
		}
	}

	onProductionClick() {
		this.globalService.productionScrollPosition = {x: window.scrollX, y: window.scrollY};
	}
}
