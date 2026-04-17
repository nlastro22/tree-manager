import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { TreeNodeService } from '../tree-node/tree-node-service';
import { MatDialog } from '@angular/material/dialog';
import { AddNode } from '../tree-node/add-node/add-node';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIcon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private treeService = inject(TreeNodeService);
  readonly dialog = inject(MatDialog);

  onExpandBtnClick(): void {
    this.treeService.expandAll();
  }

  onCollapseBtnClick(): void {
    this.treeService.collapseAll();
  }

  onAddRootBtnClick(): void {
    const dialogRef = this.dialog.open(AddNode, {
      data: { addType: 'root' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.treeService.addRootNode(result.label, result.group);
      }
    });
  }
}
