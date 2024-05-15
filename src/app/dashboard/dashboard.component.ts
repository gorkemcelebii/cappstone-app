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

    // Yatay bar grafiği için veri ve seçenekler
    const dataHorizontalBarChart: any = {
      labels: ['A', 'B', 'C', 'D', 'E'],
      series: [
        [100, 200, 300, 400, 500]
      ]
    };

    const optionsHorizontalBarChart: any = {
      seriesBarDistance: 10,
      horizontalBars: true,
      axisY: {
        offset: 70
      }
    };

    var horizontalBarChart = new Chartist.Bar('#horizontalBarChart', dataHorizontalBarChart, optionsHorizontalBarChart);

    this.startAnimationForBarChart(horizontalBarChart);
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

    this.fetchData();
  }

  updateGenderGraph(data: Map<string, number>, maxValue: any) {
    var updatedValues = {
      labels: Object.keys(data),
      series: [Object.values(data)]
    };

    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: maxValue,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
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

    this.startAnimationForBarChart(websiteViewsChart);
  }

  updateAgeGraph(data: Map<string, number>, maxValue: any) {
    var updatedValues = {
      labels: Object.keys(data),
      series: [Object.values(data)]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: maxValue,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    var dailySalesChart = new Chartist.Bar('#dailySalesChart', updatedValues, optionsDailySalesChart);

    this.startAnimationForBarChart(dailySalesChart);
  }

}
