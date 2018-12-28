import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BackendBaseUrl} from '../constants';
import {Item} from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }

  getString(): Observable<string> {
    const url = `${BackendBaseUrl}/values`;
    return this.http.get<string>(url);
  }

  addItem(item: Item): Observable<any> {
    const url = `${BackendBaseUrl}/values/AddItem`;
    const p = {
    };
    return this.http.post<any>(url, p);
  }
}
