import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cliente } from '../../../../../../src/app/interfaces/cliente.interface';

@Component({
  selector: 'ds-modal',
  template: `
    <div *ngIf="visible" class="modal-backdrop">
      <div class="modal-content">
        <ng-content></ng-content>
        <button (click)="close()">Fechar</button>
        <button (click)="save.emit()">Salvar</button>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top:0; left:0; right:0; bottom:0;
      background: rgba(0,0,0,0.5);
      display:flex; justify-content:center; align-items:center;
    }
    .modal-content { background:white; padding:20px; border-radius:8px; }
  `],
  standalone: false
})
export class ModalComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() save = new EventEmitter<Cliente>();

  saveModal(cliente: Cliente) {
    this.save.emit(cliente);
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
