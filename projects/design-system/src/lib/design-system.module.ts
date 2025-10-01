import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';

import { InputComponent } from './components/input/input.component';
import { ModalComponent } from './components/modal/modal.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    TableComponent,
    ModalComponent
  ],
  imports: [
    CommonModule, 
    FormsModule
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    TableComponent,
    ModalComponent
  ]
})
export class DesignSystemModule {}
