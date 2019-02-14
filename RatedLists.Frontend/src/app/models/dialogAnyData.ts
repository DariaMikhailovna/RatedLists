import {Item} from './item';

export class DialogAnyData {
  isBulkAdd: boolean;
  name: string;
  id: string;
  itemNames: string[];
  items: Item[];
  firstItem: Item;
}
