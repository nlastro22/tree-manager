import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TreeNodeModel } from './tree-node.model';

@Component({
  selector: 'app-tree-node',
  imports: [MatIconModule],
  templateUrl: './tree-node.html',
  styleUrl: './tree-node.scss',
})
export class TreeNode {
  node = input.required<TreeNodeModel>();
  ngOnInit() {
    console.log(this.node());
  }
}
