import { Component, inject, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TreeNodeModel } from './tree-node.model';
import { TreeNodeService } from './tree-node-service';
import { Actions } from './actions/actions';
import { MatDialog } from '@angular/material/dialog';
import { AddNode } from './add-node/add-node';
import { DeleteNode } from './delete-node/delete-node';

@Component({
  selector: 'app-tree-node',
  imports: [MatIconModule, Actions],
  templateUrl: './tree-node.html',
  styleUrl: './tree-node.scss',
})
export class TreeNode {
  private readonly treeService = inject(TreeNodeService);
  private readonly dialog = inject(MatDialog);

  node = input.required<TreeNodeModel>();
  isHovering = signal(false);

  onNodeClick(): void {
    this.treeService.toggleNode(this.node().id);
  }

  onAddEvent(type: 'child' | 'parent'): void {
    const dialogRef = this.dialog.open(AddNode, {
      data: { addType: type, node: this.node() },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const isChild = type === 'child' ? true : false;
        this.treeService.addTreeNode(result, this.node().id, isChild);
      }
    });
  }

  onDeleteEvent(): void {
    const dialogRef = this.dialog.open(DeleteNode, {
      data: { label: this.node().label },
      width: '35rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
