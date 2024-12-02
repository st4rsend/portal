import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.sass'],
    standalone: false
})
export class ContactsComponent implements OnInit {

	apropos: boolean = false;

  constructor(private globalService: GlobalService) { 
		this.globalService.displayWish = true;
		this.globalService.addPanelItems("cartpole", true);
	}

  ngOnInit(): void {
  }

	aproposClick(): void {
		this.apropos = !this.apropos;
	}

}
