import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BackendBaseUrl} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }
  getString(): Observable<string> {
    const url = `${BackendBaseUrl}/values`;
    return this.http.get<string>(url);
  }
}
