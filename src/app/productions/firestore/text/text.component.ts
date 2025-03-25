import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  imports: [],
  templateUrl: './text.component.html',
  styleUrl: './text.component.sass'
})
export class TextComponent {
 @Input() data: any;
}
