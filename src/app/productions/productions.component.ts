import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatLegacyCheckboxChange as MatCheckboxChange } from '@angular/material/legacy-checkbox';
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

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.appTheme = params['theme'];
		});
		this.httpClient.get(this.assetsURL + environment.treeFile).subscribe(data => {
			for ( let item of Object.values(data)) {
				this.dataSource.data.push(item as ProductionNode);
			}
			// Force MatTree redesign
			this.dataSource.data = [...this.dataSource.data];
			//console.log(this.dataSource.data);
		});
	}

	hasChild = (_: number, node: ProductionNode) => !!node.children && node.children.length > 0;

}
