import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'ds-button',
  template: `<button [ngClass]="variant" (click)="onClick.emit()"><ng-content></ng-content></button>`,
  styleUrls: ['./button.component.css'],
  standalone: false
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Output() onClick = new EventEmitter<void>();
}
