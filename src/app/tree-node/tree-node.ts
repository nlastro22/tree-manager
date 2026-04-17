import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TreeNodeModel } from './tree-node.model';
import { TreeNodeService } from './tree-node-service';
import { Actions } from './actions/actions';
import { MatDialog } from '@angular/material/dialog';
import { AddNode } from './add-node/add-node';
import { DeleteNode } from './delete-node/delete-node';
import { EditNode } from './edit-node/edit-node';

@Component({
  selector: 'app-tree-node',
  imports: [MatIconModule, Actions],
  templateUrl: './tree-node.html',
  styleUrl: './tree-node.scss',
})
export class TreeNode {
  private readonly treeService = inject(TreeNodeService);
  private readonly dialog = inject(MatDialog);

  nodes = input.required<TreeNodeModel[]>();

  onNodeClick(node: TreeNodeModel): void {
    this.treeService.toggleNode(node.id);
  }

  onAddEvent(type: 'child' | 'parent', node: TreeNodeModel): void {
    const dialogRef = this.dialog.open(AddNode, {
      data: { addType: type, node: node },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        const isChild = type === 'child' ? true : false;
        this.treeService.addTreeNode(result, node.id, isChild);
      }
    });
  }

  onDeleteEvent(node: TreeNodeModel): void {
    const dialogRef = this.dialog.open(DeleteNode, {
      data: { label: node.label },
      width: '35rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.treeService.deleteNode(node.id, false);
      } else if (result === 'delete-all') {
        this.treeService.deleteNode(node.id, true);
      }
    });
  }

  onEditEvent(node: TreeNodeModel): void {
    const dialogRef = this.dialog.open(EditNode, { data: { label: node.label } });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.treeService.changeLabel(node.id, result);
      }
    });
  }
}
