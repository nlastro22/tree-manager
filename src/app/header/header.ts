import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TreeNodeService } from '../tree-node/tree-node-service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private treeService = inject(TreeNodeService);

  onExpandBtnClick(): void {
    this.treeService.expandAll();
  }

  onCollapseBtnClick(): void {
    this.treeService.collapseAll();
  }

  onAddRootBtnClick(): void {
    console.log();
  }
}
