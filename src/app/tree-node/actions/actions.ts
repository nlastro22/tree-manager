import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-actions',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './actions.html',
  styleUrl: './actions.scss',
})
export class Actions {
  readonly add = output<'child' | 'parent'>();
  readonly delete = output();
  readonly edit = output();

  onAddChildClick(): void {
    this.add.emit('child');
  }

  onAddParentClick(): void {
    this.add.emit('parent');
  }

  onDeleteBtnClick(): void {
    this.delete.emit();
  }

  onEditBtnClick(): void {
    this.edit.emit();
  }
}
