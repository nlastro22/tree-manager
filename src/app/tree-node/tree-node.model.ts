import { NodeType } from './node-type.model';

export interface TreeNodeModel {
  id: string;
  label: string;
  items?: TreeNodeModel[];
  type: NodeType;
  opened: boolean;
}
