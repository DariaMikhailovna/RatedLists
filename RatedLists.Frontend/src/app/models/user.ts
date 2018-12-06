import {ListOfItems} from './listOfItems';

export class User {
  login: string;
  password: string;
  lists: ListOfItems[] = [];
}
