import { Component, input } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TreeNodeModel } from '../tree-node.model';

@Component({
  selector: 'app-delete-node',
  imports: [MatDialogModule],
  templateUrl: './delete-node.html',
  styleUrl: './delete-node.scss',
})
export class DeleteNode {
  node = input.required<TreeNodeModel>();
}
