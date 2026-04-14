import { Component, inject, model } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-node',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-node.html',
  styleUrl: './delete-node.scss',
})
export class DeleteNode {
  readonly dialogRef = inject(MatDialogRef);
  readonly data = inject(MAT_DIALOG_DATA);
  readonly label = model(this.data.label);

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
