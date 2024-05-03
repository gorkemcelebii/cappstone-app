import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { ApiService } from './api.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  ageDetectionData:any;
  filteredAgeDetectionData:any;

  startDate:string;
  endDate:string;

  constructor(private datePipe:DatePipe, private apiService:ApiService) { }

  formatStartDate(date:Date): string{
    return this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00.000000');
  }

  formatEndDate(date:Date): string{
    return this.datePipe.transform(date, 'yyyy-MM-ddT23:59:59.999999');
  }

  ngOnInit(): void {
    this.fetchData();

  }

  fetchData(startDate?:string, endDate?:string) {

    if ((startDate === undefined || startDate === null) && (endDate === undefined || endDate === null) ) {
      this.apiService.getAgeDetectionData().subscribe(data => {
        this.ageDetectionData = data;
        console.log(data);
    })
    }
    if ((startDate !== undefined || startDate !== null) && (endDate !== undefined || endDate !== null) ) {
      // Hem startDate hem de endDate tanımlıdır.
      this.apiService.getFilteredAgeDetectionData(startDate, endDate).subscribe(data => {
          this.ageDetectionData = data;
          console.log(data);
      });
  }
  }

  fetchFilteredData(startDate:string, endDate:string){
    this.apiService.getFilteredAgeDetectionData(startDate,endDate).subscribe(data => {
      this.filteredAgeDetectionData = data;
      console.log(data);
    })

  }

  applyFilters() {
    const startDate = this.formatStartDate(new Date(this.startDate));
    const endDate = this.formatEndDate(new Date(this.endDate));
    
    console.log(startDate);
    console.log("*******************************");
    console.log(endDate);
    // Burada startDate ve endDate kullanarak API'den veri alabilir ve grafikleri güncelle.

    this.fetchData(startDate,endDate);

    // Örneğin, rastgele veri üretelim

    // Güncellenmiş verilerle grafikleri yeniden oluştur (sadece ilk chart için bu.)
    // Not: Gerçek verileri almak için bu işlevi API isteği yapacak şekilde güncelle.
}



  

}
