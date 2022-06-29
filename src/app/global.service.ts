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

	private displayPanel = new Subject<boolean>();
	public displayWish:boolean = true


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
			this.displayPanel.next(val);
		} else {
			this.displayPanel.next(false);
		}
	}
	getDisplayPanel(): Observable<boolean> {
		return this.displayPanel.asObservable();
	} 
}
