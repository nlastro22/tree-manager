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

  addTreeNode(label: string, parentId: string): void | null {
    const newNode: TreeNodeModel = {
      id: Math.random().toString(),
      label: label,
      opened: false,
    };

    this._treeData.update((oldArray) => {
      return this.addRecursiveNode(oldArray, parentId, newNode);
    });
  }

  addRecursiveNode(
    nodeArray: TreeNodeModel[],
    id: string,
    newNode: TreeNodeModel,
  ): TreeNodeModel[] {
    return nodeArray.map((node) => {
      if (node.id === id) {
        return { ...node, items: [...(node.items || []), newNode] };
      } else if (node.items && node.items.length > 0) {
        return { ...node, items: this.addRecursiveNode(node.items, id, newNode) };
      }
      return node;
    });
  }

  toggleNode(id: string): void {
    this._treeData.update((oldArray) => {
      return this.updateRecursive(id, oldArray);
    });
  }

  updateRecursive(id: string, oldArray: TreeNodeModel[]): TreeNodeModel[] {
    return oldArray.map((node) => {
      if (id === node.id) {
        return { ...node, opened: !node.opened };
      } else if (node.items && node.items.length > 0) {
        return { ...node, items: this.updateRecursive(id, node.items) };
      }
      return node;
    });
  }
}
