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
      // donut chart için servis olacak
    this.apiService.getAgeStats().subscribe(data => {
      this.apiData = data;

      let values: number[] = Object.values(data);
      let maxValue = Math.max(...values);

      console.log(maxValue);

      this.updateDonutChart(data); 
    });
    this.apiService.getStoreList().subscribe(data => {
      this.storeList = data;
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
      horizontalBars: true,
      axisY: {
        offset: 80
      }
    };

    var dailySalesChart = new Chartist.Bar('#dailySalesChart', updatedValues, optionsHorizontalBarChart);

    this.startAnimationForBarChart(dailySalesChart);
  }

  updateDonutChart(data: Map<string, number>) {
    var updatedValues = {
      series: Object.values(data)
    };

        // Renk paleti fonksiyonu (dynamik olarak renk paleti oluşturacak fonksiyon)
function generateColors(numColors) {
  var colors = [];
  for (var i = 0; i < numColors; i++) {
    colors.push('#' + Math.floor(Math.random() * 16777215 ).toString(16)); // Rastgele renkler üretme
  }
  return colors;
}

    const optionsDonutChart: any = {
      chartPadding:30,
      labelOffset: 50,
      labelDirection: 'explode',
      colors: generateColors(updatedValues.series.length),
      labelInterpolationFnc: function(value) {
        return Math.round(value / updatedValues.series.reduce((a, b) => a + b, 0) * 100) + '%';
      },
      
    };
    

    var donutChart = new Chartist.Pie('#donutChart', updatedValues, optionsDonutChart);

    donutChart.on('draw', function(data) {
      if (data.type === 'slice') {
        var pathLength = data.element._node.getTotalLength();
        
        data.element.attr({
          'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
        });
        
        var animationDefinition = {
          'stroke-dashoffset': {
            id: 'anim' + data.index,
            dur: 1000,
            from: -pathLength + 'px',
            to:  '0px',
            easing: Chartist.Svg.Easing.easeOutQuint,
            fill: 'freeze'
          }
        };
        
        data.element.attr({
          'stroke-dashoffset': -pathLength + 'px'
        });
        
        data.element.animate(animationDefinition, false);
      }
    });

    // For the animation to start we need to set (and remove) a delay on the next redraw
    var seq = 0;
    donutChart.on('draw', function() {
      if (seq === Object.keys(data).length) {
        seq = 0;
      }
      seq++;
    });
  }
}
