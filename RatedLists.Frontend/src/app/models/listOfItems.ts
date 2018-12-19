import {Item, ITEMS} from './item';

export class ListOfItems {
 name: string;
 items: Item[];
}
export const LISTOFITEMS: ListOfItems[] = [
  {
    name: 'Name11',
    items: [ITEMS[0]]
  },
  {
    name: 'Name22',
    items: [ITEMS[1], ITEMS[0]]
  },
  {
    name: 'Name33',
    items: [ITEMS[2], ITEMS[1]]
  },
];
