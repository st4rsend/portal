import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Subscription } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { getFunctions, httpsCallable } from 'firebase/functions';

import { environment } from '../../environments/environment';
import { GlobalService } from '../global.service';
import { AuthService } from '../services/auth.service';
import { UserEnv } from '../interfaces';

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

	private treeMaster: string = "ZfCByH4STh5NQTEN6wYp";
	private treeId: string = "Test";


	private assetsURL: string = "assets/";
	private sub: any;

	public appTheme: string = "light-theme";
	public treeControl = new NestedTreeControl<TreeNode>(node => node.children);
	public dataSource = new MatTreeNestedDataSource<TreeNode>();
	private fsSub: Subscription | null = null;
	private httpSub: Subscription | null = null;

	public linkType: boolean = false;
	public content = false;
	public ml = false;

	public userEnv: UserEnv | null = null;


  constructor(
			private route: ActivatedRoute,
			private httpClient: HttpClient, 
			private globalService: GlobalService,
			private authService: AuthService,
		) { 
		this.globalService.displayWish = true;
	}

	hasChild = (_: number, node: TreeNode) => !!node.children && node.children.length > 0;

	ngOnInit() {
		this.sub = this.route.params.subscribe(params => {
			this.appTheme = params['theme'];
		});

/*
		this.httpSub = this.httpClient.get(this.assetsURL + environment.treeFile).subscribe(data => {
			const cleanData = (nodes: any[]): TreeNode[] => {
				return nodes.map(node => ({
					name: node.name,
					path: node.path || undefined,
					svg: node.svg || undefined,
					firestore: node.firestore || undefined,
					children: Array.isArray(node.children) ? cleanData(node.children) : []
				}));
			};

			const cleanedData = cleanData(Object.values(data));
			this.dataSource.data = [...this.dataSource.data, ...cleanedData];
			this.dataSource.data.forEach(node => {
				this.expandNodes(node, this.globalService.expandedNodeIds);
			});

			setTimeout(() => {
				window.scrollTo(this.globalService.productionScrollPosition.x, this.globalService.productionScrollPosition.y);
			}, 0);
		});
*/
    let subAuth = this.authService.getAuthState();
    subAuth.subscribe((userEnv: UserEnv|null) => {
      this.userEnv = userEnv;
      if (this.userEnv == null) {
        this.authService.signInAnonymously();
      } else {
				let bearer: string = this.authService.getBearerToken();
				let url:string = "https://europe-west6-gcp-learning-project-195511.cloudfunctions.net/readContentTree"
				const params = new HttpParams()
					//.set("treemaster", this.treeMaster)
					//.set("treeid", this.treeId);
					.set("treemaster", environment.treeMaster)
					.set("treeid", environment.treeId);
				this.httpClient.get(url, {
					headers: {
						Authorization: `Bearer ${bearer}`,
						'Accept': 'application/json',
						'Cache-Control': 'no-cache',
						'Pragma': 'no-cache',
					},
					params}).subscribe({
						next:(data) => this.buildTree(data),
						error:(err) => console.log("Request failed", err)
					});
      	}
		});
	}

	private buildTree(data: any){
		console.log(JSON.stringify(data, null, 2));
		const cleanData = (nodes: any[]): TreeNode[] => {
			return nodes.map(node => ({
				name: node.name,
				path: node.path || undefined,
				svg: node.svg || undefined,
				firestore: node.ID || undefined,
				children: Array.isArray(node.children) ? cleanData(node.children) : []
			}));
		};
		const cleanedData = cleanData(data.Tree);
		//console.log('Cleaned Data:', JSON.stringify(cleanedData, null, 2));
		this.dataSource.data = [...cleanedData,...this.dataSource.data];
		this.dataSource.data.forEach(node => {
			this.expandNodes(node, this.globalService.expandedNodeIds);
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
	}

	onProductionClick() {
		this.globalService.productionScrollPosition = {x: window.scrollX, y: window.scrollY};
	}

	ngOnDestroy(): void {
		this.httpSub?.unsubscribe();
		this.fsSub?.unsubscribe();
	}
}
