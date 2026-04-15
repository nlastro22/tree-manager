import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-node',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogModule],
  templateUrl: './edit-node.html',
  styleUrl: './edit-node.scss',
})
export class EditNode {
  readonly data = inject(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef);
  label = model(this.data.label);

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
