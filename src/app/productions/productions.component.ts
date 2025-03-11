import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { environment } from '../../environments/environment';


import { GlobalService } from '../global.service';
import { HttpClient } from '@angular/common/http';

import {AuthService} from '../services/auth.service';
import {FirestoreService} from '../services/firestore.service';
import {UserEnv} from '../interfaces';

interface TreeNode {
	name: string;
	path?: string;
	children: TreeNode[];
}

@Component({
    selector: 'app-productions',
    templateUrl: './productions.component.html',
    styleUrls: ['./productions.component.sass'],
    standalone: false
})

export class ProductionsComponent implements OnInit {


	private assetsURL: string = "assets/";
	private sub: any;

	public appTheme: string = "light-theme";
	public treeControl = new NestedTreeControl<TreeNode>(node => node.children);
	public dataSource = new MatTreeNestedDataSource<TreeNode>();

	public linkType: boolean = false;
	public content = false;
	public ml = false;

	public userEnv: UserEnv | null = null;

  constructor(
			private route: ActivatedRoute,
			private httpClient: HttpClient, 
			private globalService: GlobalService,
			private authService: AuthService,
			private firestoreService: FirestoreService,
		) { 
		this.globalService.displayWish = true;
	}

	hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.appTheme = params['theme'];
		});
		this.httpClient.get(this.assetsURL + environment.treeFile).subscribe(data => {
			const cleanData = (nodes: any[]): TreeNode[] => {
				return nodes.map(node => ({
					name: node.name,
					path: node.path || undefined,
					children: Array.isArray(node.children) ? cleanData(node.children) : []
				}));
			};

			const cleanedData = cleanData(Object.values(data));
			//console.log('Cleaned Data:', JSON.stringify(cleanedData, null, 2));
			this.dataSource.data = cleanedData;

			this.dataSource.data.forEach(node => {
				this.expandNodes(node, this.globalService.expandedNodeIds);
			});

			setTimeout(() => {
				window.scrollTo(this.globalService.productionScrollPosition.x, this.globalService.productionScrollPosition.y);
			}, 0);
		});

		let sub = this.authService.getAuthState();
		sub.subscribe((userEnv: UserEnv|null) => {
			this.userEnv = userEnv;
			//console.log("userEnv: ", this.userEnv);
			if (this.userEnv == null) {
				console.log('logging');
				this.authService.signInAnonymously();
			} else {
				console.log("logged");
			}
		});
	}

	expandNodes(node: TreeNode, expandedNodeIds: string[]) {
		if (expandedNodeIds.includes(node.name)) {
			this.treeControl.expand(node);
		}

		if (node.children) {
			node.children.forEach(child => {
				this.expandNodes(child, expandedNodeIds);
			});
		}
	}

	trackByName(index: number, item: TreeNode) {
		return item.name;
	}

	//onToggle(node: TreeNode, isExpanded: boolean) {
	async onToggle(node: TreeNode, isExpanded: boolean) {
		const index = this.globalService.expandedNodeIds.indexOf(node.name);
		if (isExpanded && index === -1) {
			this.globalService.expandedNodeIds.push(node.name);
		} else if (!isExpanded && index !== -1) {
			this.globalService.expandedNodeIds.splice(index, 1);
		}

		let datatest = "new line 121 test getdoc to remove and implement as intended"; 
		//datatest = await this.firestoreService.asyncReadConv('4rjqoGnSJxtCIGUOAXIP');
		console.log(datatest);


	}

	onProductionClick() {
		this.globalService.productionScrollPosition = {x: window.scrollX, y: window.scrollY};
	}
}
