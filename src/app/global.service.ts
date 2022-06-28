import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }

	private displayPanel = new Subject<boolean>();

	setDisplayPanel(val: boolean) {
		this.displayPanel.next(val);
	}

	getDisplayPanel(): Observable<boolean> {
		return this.displayPanel.asObservable();
	} 
}
