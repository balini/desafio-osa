import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'ds-table',
  template: `
    <table class="ds-table margin-20 width-90">
      <thead>
        <tr>
          <th *ngFor="let col of columns">{{ col | titlecase }}</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of data; let i = index">
          <td *ngFor="let col of columns">
            <ng-container *ngIf="col === 'ações' && actionsTemplate; else defaultCell">
              <ng-container
                *ngTemplateOutlet="actionsTemplate; context: { $implicit: row, index: i }"
              ></ng-container>
            </ng-container>
            <ng-template #defaultCell>{{ row[col] }}</ng-template>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    .ds-table { width: 100%; border-collapse: collapse; }
    .ds-table th, .ds-table td { border: 1px solid #ddd; padding: 8px; }
    .ds-table th { background-color: #f5f5f5; text-align: left; }
    .ds-table tbody tr:hover { background-color: #f1f1f1; }
  `],
  standalone: false
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @ContentChild(TemplateRef) actionsTemplate!: TemplateRef<any>;
}
