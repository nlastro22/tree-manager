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

  addRootNode(label: string): void {
    const newNode: TreeNodeModel = {
      id: Math.random().toString(),
      label: label,
      opened: false,
    };

    this._treeData.update((oldArray) => [...oldArray, newNode]);
  }

  addTreeNode(label: string, id: string, isChild: boolean): void | null {
    const newNode: TreeNodeModel = {
      id: Math.random().toString(),
      label: label,
      opened: false,
    };

    this._treeData.update((oldArray) => {
      if (isChild) {
        return this.addRecursiveChildNode(oldArray, id, newNode);
      } else {
        return this.addRecursiveParentNode(oldArray, id, newNode);
      }
    });
  }

  private addRecursiveChildNode(
    nodeArray: TreeNodeModel[],
    id: string,
    newNode: TreeNodeModel,
  ): TreeNodeModel[] {
    return nodeArray.map((node) => {
      if (node.id === id) {
        return { ...node, items: [...(node.items || []), newNode] };
      } else if (node.items && node.items.length > 0) {
        return { ...node, items: this.addRecursiveChildNode(node.items, id, newNode) };
      }
      return node;
    });
  }

  private addRecursiveParentNode(
    nodeArray: TreeNodeModel[],
    id: string,
    newNode: TreeNodeModel,
  ): TreeNodeModel[] {
    return nodeArray.map((node) => {
      if (node.id === id) {
        return { ...newNode, items: [node] };
      } else if (node.items && node.items.length > 0) {
        return { ...node, items: this.addRecursiveParentNode(node.items, id, newNode) };
      }
      return node;
    });
  }

  toggleNode(id: string): void {
    this._treeData.update((oldArray) => {
      return this.updateRecursive(id, oldArray);
    });
  }

  private updateRecursive(id: string, oldArray: TreeNodeModel[]): TreeNodeModel[] {
    return oldArray.map((node) => {
      if (id === node.id) {
        return { ...node, opened: !node.opened };
      } else if (node.items && node.items.length > 0) {
        return { ...node, items: this.updateRecursive(id, node.items) };
      }
      return node;
    });
  }

  expandAll(): void {
    this._treeData.update((oldArray) => {
      return this.toggleNodesRecursive(oldArray, true);
    });
  }

  collapseAll(): void {
    this._treeData.update((oldArray) => {
      return this.toggleNodesRecursive(oldArray, false);
    });
  }

  private toggleNodesRecursive(array: TreeNodeModel[], opened: boolean): TreeNodeModel[] {
    return array.map((node) => {
      const updatedNode = { ...node, opened: opened };
      if (node.items && node.items.length > 0) {
        updatedNode.items = this.toggleNodesRecursive(node.items, opened);
      }
      return updatedNode;
    });
  }

  deleteNode(id: string, withChildren: boolean): void {
    this._treeData.update((oldArray) => {
      if (withChildren) {
        return this.deleteNodeWithChildrenRecursive(id, oldArray);
      } else {
        return this.deleteNodeRecursive(id, oldArray);
      }
    });
  }

  private deleteNodeWithChildrenRecursive(id: string, array: TreeNodeModel[]): TreeNodeModel[] {
    const newArr = array.filter((node) => node.id !== id);
    return newArr.map((node) => ({
      ...node,
      items: node.items ? this.deleteNodeWithChildrenRecursive(id, node.items) : [],
    }));
  }

  private deleteNodeRecursive(id: string, array: TreeNodeModel[]): TreeNodeModel[] {
    return array.flatMap((node) => {
      if (node.id === id) {
        return node.items || [];
      } else if (node.items && node.items.length > 0) {
        return [{ ...node, items: this.deleteNodeRecursive(id, node.items) }];
      }
      return [node];
    });
  }
}
