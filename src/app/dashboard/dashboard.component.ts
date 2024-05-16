import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { DatePipe } from '@angular/common';
import { DateApiService } from './dateApi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  apiData: any;
  storeData: any;
  startDate: string;
  endDate: string;
  selectedStoreId: number;
  storeList: any[];

  constructor(private datePipe: DatePipe, private apiService: DateApiService) { }
    // multilinechart barlı olan.
  createMultiLineChart() {
    new Chartist.Bar('#multiLineChart', {
      labels: ['0-2', '4-6', '8-12', '15-20','20-25','25-32','32-38','38-43','43-48','48-53','60-100'],
      series: [
        [0, 0, 0, 0,0, 0, 0, 0,0, 0, 0,],
        [600, 400, 800, 700,232, 300, 520, 230,320, 760, 240,],
        [400, 300, 700, 650,400, 300, 700, 300,620, 340, 180,],
      ]
    }, {
      seriesBarDistance: 10,
      axisX: {
        offset: 40
      },
      axisY: {
        offset: 40,
        labelInterpolationFnc: function(value) {
          return value
        },
        scaleMinSpace: 15
      },
      

      
    });
  }

  //düz linechart 1
  createLineChart() {
    const data = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 7, 8, 5], 
 
      ]
    };
  
    const options = {
    };
  
    new Chartist.Line('#lineChart', data, options);
  }
  // ikinci düz line chart
  createSecondLineChart() {
    const data = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      series: [
        [12, 9, 7, 8, 5], 
    
      ]
    };
    const options = {
    };
  
    // Grafik oluşturma
    new Chartist.Line('#secondLineChart', data, options);
  }

  

  formatStartDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00.000000');
  }

  formatEndDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-ddT23:59:59.999999');
  }

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  ngOnInit() {
    this.fetchData();
    this.createMultiLineChart();
    this.createLineChart();
    this.createSecondLineChart();
 
  
  }


  fetchData(startDate?: string, endDate?: string) {

    const selectedStoreId = this.selectedStoreId;

    if ((startDate === undefined || startDate === null) && (endDate === undefined || endDate === null)) {
      if((selectedStoreId === undefined || selectedStoreId === null)){
        this.apiService.getAgeStats().subscribe(data => {
          this.updateAgeGraph(data);
          console.log(data);
        });

        this.apiService.getGenderStats().subscribe(data => {
          this.updateGenderGraph(data);
          console.log(data);
        });
        

      }
      else if(selectedStoreId !== undefined && selectedStoreId !== null){
        //TODO
      
      }
    }
    else if ((startDate !== undefined || startDate !== null) && (endDate !== undefined || endDate !== null) ) {
      if((selectedStoreId === undefined || selectedStoreId === null)){
        this.apiService.getFilteredAgeStats(startDate, endDate).subscribe(data => {
          this.updateAgeGraph(data);
          console.log(data);
        });
        this.apiService.getFilteredGenderStats(startDate,endDate).subscribe(data => {
          this.updateGenderGraph(data);
          console.log(data);
        })
      }
      else if(selectedStoreId !== undefined && selectedStoreId !== null){
        //TODO
      }

    }

    
    this.apiService.getGenderStats().subscribe(data => {
      this.apiData = data;
      console.log(data);

      let values: number[] = Object.values(data);
      let maxValue = Math.max(...values);

      console.log(maxValue)

      this.updateGenderGraph(data);
    });

    this.apiService.getAgeStats().subscribe(data => {
      this.apiData = data;
      this.updateAgeGraph(data);

     
    });  
  }

  applyFilters() {
    const startDate = this.formatStartDate(new Date(this.startDate));
    const endDate = this.formatEndDate(new Date(this.endDate));

    console.log(startDate);
    console.log("*******************************");
    console.log(endDate);

    this.fetchData(startDate,endDate);
  }

  updateGenderGraph(data: Map<string, number>) {
    var updatedValues = {
      labels: Object.keys(data),
      series: [Object.values(data)]
    };

    
    const optionsHorizontalBarChart: any = {
      seriesBarDistance: 10,
      horizontalBars: true,
      axisY: {
        offset: 50
      },
    };

    var horizontalBarChart = new Chartist.Bar('#horizontalBarChart', updatedValues, optionsHorizontalBarChart);

    this.startAnimationForBarChart(horizontalBarChart);
    
  }

  updateAgeGraph(data: Map<string, number>) {
    var updatedValues = {
      labels: Object.keys(data),
      series: [Object.values(data)]
    };

    const optionsHorizontalBarChart: any = {
      low:0,
      high:200,
      seriesBarDistance: 50,
      axisY: {
        offset: 60
      },
      axisX:{
        offset: 20,
      }
    };

    var dailySalesChart = new Chartist.Bar('#ageBarChart', updatedValues, optionsHorizontalBarChart);

    this.startAnimationForBarChart(dailySalesChart);
  }



    


   

    // For the animation to start we need to set (and remove) a delay on the next redraw
   
}
