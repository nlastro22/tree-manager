import { Component, computed, inject, signal } from '@angular/core';
import { TreeNode } from './tree-node/tree-node';
import { TreeNodeService } from './tree-node/tree-node-service';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [TreeNode, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('Tree-Angular');
  private readonly treeService = inject(TreeNodeService);

  nodes = computed(() => this.treeService.data());
}
