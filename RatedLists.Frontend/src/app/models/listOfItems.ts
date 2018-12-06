import {Item, ITEMS} from './item';

export class ListOfItems {
 name: string;
 listOfItems: Item[];
}
export const LISTOFITEMS: ListOfItems[] = [
  {
    name: 'Name11',
    listOfItems: [ITEMS[0]]
  },
  {
    name: 'Name22',
    listOfItems: [ITEMS[1], ITEMS[0]]
  },
  {
    name: 'Name33',
    listOfItems: [ITEMS[2], ITEMS[1]]
  },
];
