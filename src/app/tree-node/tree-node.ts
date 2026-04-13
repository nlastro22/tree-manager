import { Component, inject, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TreeNodeModel } from './tree-node.model';
import { TreeNodeService } from './tree-node-service';

@Component({
  selector: 'app-tree-node',
  imports: [MatIconModule],
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
