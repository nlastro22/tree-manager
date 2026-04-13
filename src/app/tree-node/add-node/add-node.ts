import { Component, inject, model, output, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-node',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogModule],
  templateUrl: './add-node.html',
  styleUrl: './add-node.scss',
})
export class AddNode implements OnInit {
  private readonly dialogRef = inject(MatDialogRef);
  readonly add = output();
  readonly data = inject(MAT_DIALOG_DATA);

  addType = model<'child' | 'parent'>(this.data.addType);
  node = model(this.data.node);

  ngOnInit(): void {
    console.log(this.addType());
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.add.emit();
  }
}
