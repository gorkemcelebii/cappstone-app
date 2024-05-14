import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getAgeDetectionData() {
    return this.http.get<any>('http://127.0.0.1:8080/rest/results');
  }

  getFilteredAgeDetectionData(startDate: string, endDate: string) {
    let params = new HttpParams();
  params = params.append('start_date', startDate);
  params = params.append('end_date', endDate);

  const options = { params: params };
    return this.http.get<any>('http://127.0.0.1:8080/rest/results',options);
  }

  getResultsByStore(storeId: any){


    return this.http.get<any>('http://127.0.0.1:8080/rest/findResultByStore/' + storeId);
  }

  getStoreList(){
    return this.http.get<any>('http://127.0.0.1:8080/rest/stores');
  }
}