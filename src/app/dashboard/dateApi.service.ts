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

  

  getFilteredAgeStats(startDate: string, endDate: string){
    let params = new HttpParams();
    params = params.append('start_date', startDate);
    params = params.append('end_date', endDate);

    const options = {params: params};

    return this.http.get<any>('http://127.0.0.1:8080/rest/results/age',options);
  }
  
  getGenderStats(){
    return this.http.get<any>('http://127.0.0.1:8080/rest/results/gender');
  }

  getAgeStats(){
    return this.http.get<any>('http://127.0.0.1:8080/rest/results/age');
  }

  getStoreList(){
    return this.http.get<any>('http://127.0.0.1:8080/rest/stores');
  }

  getAgeStatsByStore(storeId: number){
    return this.http.get<any>('http://127.0.0.1:8080/rest/age_group_counts/' + storeId);
  }

  getGenderStatsByStore(storeId: number){
    return this.http.get<any>('http://127.0.0.1:8080/rest/gender_counts/' + storeId);
  }

  getGenderStatsByAgeGroup(){
    return this.http.get<any>('http://127.0.0.1:8080/rest/results/getGenderCountByAgeGroup');
  }


}