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

  private getTreeNode(id: string): TreeNodeModel | null {
    const foundNode = this._treeData().find((node) => node.id === id);

    if (foundNode) {
      return foundNode;
    }
    return null;
  }

  addTreeNode(label: string, parentId: string): void | null {
    const newNode: TreeNodeModel = {
      id: Math.random().toString(),
      label: label,
      opened: false,
    };

    const parent = this.getTreeNode(parentId);
    if (!parent) {
      return null;
    }
    parent?.items?.push(newNode);

    this._treeData.update((oldArray) => {
      return oldArray.map((node) => (node.id === parent.id ? parent : node));
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
