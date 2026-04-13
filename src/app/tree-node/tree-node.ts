import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TreeNodeModel } from './tree-node.model';
import { TreeNodeService } from './tree-node-service';
import { Actions } from './actions/actions';

@Component({
  selector: 'app-tree-node',
  imports: [MatIconModule, Actions],
  templateUrl: './tree-node.html',
  styleUrl: './tree-node.scss',
})
export class TreeNode {
  private readonly treeService = inject(TreeNodeService);

  node = input.required<TreeNodeModel>();

  onNodeClick(): void {
    this.treeService.toggleNode(this.node().id);
  }
}
