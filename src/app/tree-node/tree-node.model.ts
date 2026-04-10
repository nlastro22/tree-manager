export interface TreeNodeModel {
  label: string;
  items?: TreeNodeModel[];
  opened?: boolean;
}
