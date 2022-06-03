import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass']
})
export class ContactsComponent implements OnInit {

	apropos: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

	aproposClick(): void {
		this.apropos = !this.apropos;
	}

}
