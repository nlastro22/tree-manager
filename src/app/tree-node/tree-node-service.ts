import { effect, Injectable, signal } from '@angular/core';
import { TreeNodeModel } from './tree-node.model';
import treeData from '../../../public/data.json';

@Injectable({
  providedIn: 'root',
})
export class TreeNodeService {
  private readonly TREE_DATA_KEY = 'tree-data';

  private _treeData = signal<TreeNodeModel[]>(this.getTreeData());
  readonly data = this._treeData.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(this.TREE_DATA_KEY, JSON.stringify(this._treeData()));
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
