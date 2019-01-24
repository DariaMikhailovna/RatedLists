import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BackendBaseUrl} from '../constants';
import {Item} from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    const url = `${BackendBaseUrl}/items`;
    return this.http.get<Item[]>(url);
  }

  addItem(item: Item): Observable<any> {
    const url = `${BackendBaseUrl}/items/`;
    return this.http.post<any>(url, item);
  }

  deleteItem(itemId: string): Observable<any> {
    const url = `${BackendBaseUrl}/items/${itemId}`;
    return this.http.delete<any>(url);
  }

  updateItem(item: Item): Observable<any> {
    const url = `${BackendBaseUrl}/items/`;
    return this.http.put<any>(url, item);
  }

  getItemName(itemId: string): Observable<string> {
    const url = `${BackendBaseUrl}/items/${itemId}`;
    return this.http.get<string>(url);
  }
}
