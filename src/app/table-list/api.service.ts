import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // API'den verileri getirmek için bir fonksiyon tanımlayın
  getAgeDetectionData() {
    return this.http.get<any>('http://127.0.0.1:8080/rest/results');
  }
}