import { Component, inject, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-node',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatError,
  ],
  templateUrl: './add-node.html',
  styleUrl: './add-node.scss',
})
export class AddNode {
  private readonly dialogRef = inject(MatDialogRef);
  readonly add = output();
  readonly data = inject(MAT_DIALOG_DATA);

  addType = model<'child' | 'parent' | 'root'>(this.data.addType);
  label = model<string>(this.data.label);
  node = model(this.data.node);

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
