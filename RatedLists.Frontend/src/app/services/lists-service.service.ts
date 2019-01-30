import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {BackendBaseUrl} from '../constants';
import {HttpClient} from '@angular/common/http';
import {Item} from '../models/item';
import {ListOfItems} from '../models/listOfItems';

@Injectable({
  providedIn: 'root'
})
export class ListsServiceService {

  constructor(private http: HttpClient) { }

  addList(name: string): Observable<any> {
    const url = `${BackendBaseUrl}/lists/${name}`;
    return this.http.get<any>(url);
  }

  getLists(): Observable<ListOfItems[]> {
    const url = `${BackendBaseUrl}/lists`;
    return this.http.get<ListOfItems[]>(url);
  }
}
