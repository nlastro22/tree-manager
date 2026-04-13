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

  onAddChildClick(): void {
    this.add.emit('child');
  }
}
