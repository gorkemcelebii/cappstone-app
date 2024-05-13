import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateApiService {

  constructor(private http: HttpClient) { }
  getFilteredAgeDetectionData(startDate: string, endDate: string) {
    let params = new HttpParams();
  params = params.append('start_date', startDate);
  params = params.append('end_date', endDate);

  const options = { params: params };
    return this.http.get<any>('http://127.0.0.1:8080/rest/results',options);
  }

  getFilteredGenderStats(startDate: string, endDate: string){
    let params = new HttpParams();
    params = params.append('start_date', startDate);
    params = params.append('end_date', endDate);

    const options = {params: params};

    return this.http.get<any>('http://127.0.0.1:8080/rest/results/gender',options);
  }

  getGenderStats(){
    return this.http.get<any>('http://127.0.0.1:8080/rest/results/gender');
  }

  getFilteredAgeStats(startDate: string, endDate: string){
    let params = new HttpParams();
    params = params.append('start_date', startDate);
    params = params.append('end_date', endDate);

    const options = {params: params};

    return this.http.get<any>('http://127.0.0.1:8080/rest/results/age',options);
  }
  

  getAgeStats(){
    return this.http.get<any>('http://127.0.0.1:8080/rest/results/age');
  }

  getStoreList(){
    return this.http.get<any>('http://127.0.0.1:8080/rest/stores');
  }


}