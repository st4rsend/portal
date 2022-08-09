import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';


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

	public treeControl = new NestedTreeControl<ProductionNode>(node => node.children);
	public dataSource = new MatTreeNestedDataSource<ProductionNode>();

	public linkType: boolean = false;
	public content = false;
	public ml = false;

  constructor(
			private httpClient: HttpClient, 
			private globalService: GlobalService) { 
		this.globalService.displayWish = false;
	}

	ngOnInit() {
		this.httpClient.get("assets/production-tree.json").subscribe(data => {
			for ( let item of Object.values(data)) {
				this.dataSource.data.push(item as ProductionNode);
			}
			// Force MatTree redesign
			this.dataSource.data = [...this.dataSource.data];
		});
	}

	hasChild = (_: number, node: ProductionNode) => !!node.children && node.children.length > 0;

}
