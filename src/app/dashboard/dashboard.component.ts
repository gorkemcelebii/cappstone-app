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

  apiData:any;

  storeData:any;

  startDate: string;
  endDate: string;

  selectedStoreId: number;
  constructor(private datePipe: DatePipe, private apiService: DateApiService) { }

  storeList: any[];

  formatStartDate(date:Date): string{
    return this.datePipe.transform(date, 'yyyy-MM-ddT00:00:00.000000');
  }

  formatEndDate(date:Date): string{
    return this.datePipe.transform(date, 'yyyy-MM-ddT23:59:59.999999');
  }

  

  
  
  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }
      });

      seq = 0;
  };
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
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

  startAnimationForPieChart(chart) {
    // Pie chart animation function
    chart.on('draw', function(data) {
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
            to: '0px',
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
  };
  ngOnInit() {

    this.fetchData();

    


      const dataDailySalesChart: any = {
          labels: ['0-2', '4-6', '8-12', '15-20', '20-25', '25-32', '32-38','38-43','43-48','48-53','60-100'],
          series: [
              [100, 200, 30, 40, 50, 60, 38,35,23,53,23]
          ]
      };
        
     const optionsDailySalesChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 300, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
      }

      var dailySalesChart = new Chartist.Bar('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      this.startAnimationForLineChart(dailySalesChart);


      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      const dataCompletedTasksChart: any = {
          labels: ['12pm', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
          series: [
              [230, 750, 450, 300, 280, 700, 200, 100]
          ]
      };

     const optionsCompletedTasksChart: any = {
          lineSmooth: Chartist.Interpolation.cardinal({
              tension: 0
          }),
          low: 0,
          high: 1000,
          chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
      }

      var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

      // start animation for the Completed Tasks Chart - Line Chart
      this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */
    const websiteViewsData: any ={
      labels: ["Male", "Female"],
      series: [[31,31]]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0},
      
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', websiteViewsData, optionswebsiteViewsChart, responsiveOptions);

    websiteViewsChart.on('draw', function(data) {
      if(data.type === 'bar') {
        if(data.seriesIndex === 0) {
          data.element.attr({
            style: 'stroke: turquoise' // İlk seri mavi renkte
          });
        } else if(data.seriesIndex === 1) {
          data.element.attr({
            style: 'stroke: pink' // İkinci seri kırmızı renkte
          });
        }
      }
    });

    this.startAnimationForLineChart(websiteViewsChart);
      /* ----------==========     Pie Chart initialization    ==========---------- */

var dataPieChart = {
  series: [20,50,30],
};
var optionsPieChart = {
  total: 100,
  showLabel: true,
};
var pieChart = new Chartist.Pie('#pieChart', dataPieChart,optionsPieChart);

this.startAnimationForPieChart(pieChart);  //animasyon çalışmıyor buna bakılacak.


  }

  updateGenderGraph(data: Map<string,number>, maxValue: any){
    var updatedValues = {
      labels : Object.keys(data),
      series : [Object.values(data)]
    }

    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: maxValue,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0},
      
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', updatedValues, optionswebsiteViewsChart, responsiveOptions);

    this.startAnimationForLineChart(websiteViewsChart);
  }

  updateAgeGraph(data: Map<string,number>, maxValue: any){
    var updatedValues = {
      labels : Object.keys(data),
      series : [Object.values(data)]
    }

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
      }),
      low: 0,
      high: maxValue,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
  }

  var dailySalesChart = new Chartist.Bar('#dailySalesChart', updatedValues, optionsDailySalesChart);

  this.startAnimationForLineChart(dailySalesChart);


  }
  
  fetchData() {
    this.apiService.getGenderStats().subscribe(data => {
      this.apiData = data;
      console.log(data);

      let values: number[] = Object.values(data);

      let maxValue = Math.max(...values);

      console.log(maxValue)

      this.updateGenderGraph(data, maxValue + 10);

    });

    this.apiService.getAgeStats().subscribe(data => {
      this.apiData = data;
      // Diziyi spread operatörü ile gönder

      let values: number[] = Object.values(data);

      let maxValue = Math.max(...values);

      console.log(maxValue);

      this.updateAgeGraph(data, maxValue + 10);
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
    // Burada startDate ve endDate kullanarak API'den veri alabilir ve grafikleri güncelle.

    this.fetchData();

}


}




