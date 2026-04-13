import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-node',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogModule],
  templateUrl: './add-node.html',
  styleUrl: './add-node.scss',
})
export class AddNode {
  private readonly dialogRef = inject(MatDialogRef);
  readonly add = output();

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.add.emit();
  }
}
