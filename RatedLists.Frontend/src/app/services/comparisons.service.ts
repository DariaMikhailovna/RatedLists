import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BackendBaseUrl} from '../constants';
import {Comparison} from '../models/comparison';

@Injectable({
  providedIn: 'root'
})
export class ComparisonsService {

  constructor(private http: HttpClient) { }

  getComparisons(): Observable<Comparison[]> {
    const url = `${BackendBaseUrl}/comparisons`;
    return this.http.get<Comparison[]>(url);
  }

  addComparison(comparison: Comparison): Observable<any> {
    const url = `${BackendBaseUrl}/comparisons/`;
    return this.http.post<any>(url, comparison);
  }

  deleteComparison(comparisonId: string): Observable<any> {
    const url = `${BackendBaseUrl}/comparisons/${comparisonId}`;
    return this.http.delete<any>(url);
  }

  updateComparison(comparison: Comparison): Observable<any> {
    const url = `${BackendBaseUrl}/comparisons/`;
    return this.http.put<any>(url, comparison);
  }
}
