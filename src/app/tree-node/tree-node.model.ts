export interface TreeNodeModel {
  id: string;
  label: string;
  items?: TreeNodeModel[];
  opened: boolean;
}
