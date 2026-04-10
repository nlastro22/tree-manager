import { effect, Injectable, signal } from '@angular/core';
import { TreeNodeModel } from './tree-node.model';
import * as treeData from '../../../public/data.json';

@Injectable({
  providedIn: 'root',
})
export class TreeNodeService {
  private readonly TREE_DATA_KEY = 'tree-data';

  treeData = signal<TreeNodeModel[]>(this.getTreeData());

  constructor() {
    effect(() => {
      localStorage.setItem(this.TREE_DATA_KEY, JSON.stringify(this.treeData()));
    });
  }

  getTreeData(): TreeNodeModel[] {
    const data = localStorage.getItem(this.TREE_DATA_KEY);
    if (data) {
      return JSON.parse(data) as TreeNodeModel[];
    }
    return treeData as TreeNodeModel[];
  }
}
