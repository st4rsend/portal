import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

export interface PanelItem {
	app: string;
	value: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

	private _panelItemsMap = new Map<string, PanelItem>();
	get panelItemsMap(): ReadonlyMap<string, PanelItem> {
		return this._panelItemsMap;
	}
	private _panelItems$ = new BehaviorSubject<ReadonlyMap<string, PanelItem>>(this.panelItemsMap); 
	get panelItems$(): Observable<ReadonlyMap<string, PanelItem>>{
		return this._panelItems$.asObservable();
	}

	private displayPanelSub = new Subject<boolean>();
	public displayWish:boolean = true;

	private stickyBottomSub = new BehaviorSubject<boolean>(false);
	public stickyBottom:boolean = false;

  public expandedNodeIds: string[] = [];

	addPanelItems(app: string, value: boolean) {
		const panelItem: PanelItem = {
			app,
			value: value
		};
		this._panelItemsMap.set(app, panelItem);
		this.notify();
	}
	private notify() {
		this._panelItems$.next(this._panelItemsMap);
	}

	setDisplayPanel(val: boolean) {
		if ( this.displayWish ) {
			this.displayPanelSub.next(val);
		} else {
			this.displayPanelSub.next(false);
		}
	}
	getDisplayPanel(): Observable<boolean> {
		return this.displayPanelSub.asObservable();
	} 

	setStickyBottom(val: boolean) {
		this.stickyBottomSub.next(val);
	}
	getStickyBottom(): Observable<boolean> {
		return this.stickyBottomSub.asObservable();
	}


}
