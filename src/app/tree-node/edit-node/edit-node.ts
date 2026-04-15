import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-node',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogModule],
  templateUrl: './edit-node.html',
  styleUrl: './edit-node.scss',
})
export class EditNode {
  label = signal<string>('');
  save = output<string>();
  readonly dialogRef = inject(MatDialogRef);

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.save.emit(this.label());
  }
}
