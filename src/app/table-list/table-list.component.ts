import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initialGraphicDisplay();
    this.initializeCharts();

  }

  initializeCharts(): void {
    this.initializeLineChart();
    this.initializeCompletedTasksChart();
    this.initializeWebsiteViewsChart();
    this.initializePieChart();
  }

  initializeLineChart(): void {
    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [
        [12, 17, 7, 17, 23, 18, 38]
      ]
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    };

    const dailySalesChart = new Chartist.Line('#firstchartrow #dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
    this.startAnimationForLineChart(dailySalesChart);
  }
  initialGraphicDisplay(): void {
  
    const firstChartRow = document.getElementById('firstchartrow');
    const lineChartRow = document.getElementById('linechartrow');

    const barChartRow = document.getElementById('barchartrow');

    const pieChartRow = document.getElementById('piechartrow');
    // Completed Tasks Chart'ı göster, diğerlerini gizle

    pieChartRow.style.display = 'none';
    firstChartRow.style.display = 'none';
    lineChartRow.style.display = 'none';
    barChartRow.style.display = 'none';
  }
    
  showLineChartRow(): void {
    const firstChartRow = document.getElementById('firstchartrow');
    const lineChartRow = document.getElementById('linechartrow');
    const barChartRow = document.getElementById('barchartrow');
    const pieChartRow = document.getElementById('piechartrow');
    // Completed Tasks Chart'ı göster, diğerlerini gizle

    pieChartRow.style.display = 'none';
    firstChartRow.style.display = 'none';
    lineChartRow.style.display = 'block';
    barChartRow.style.display = 'none';
  }
    
  showBarChartRow(): void {
    const firstChartRow = document.getElementById('firstchartrow');
    const lineChartRow = document.getElementById('linechartrow');

    const barChartRow = document.getElementById('barchartrow');

    const pieChartRow = document.getElementById('piechartrow');
    // Completed Tasks Chart'ı göster, diğerlerini gizle

    pieChartRow.style.display = 'none';
    firstChartRow.style.display = 'none';
    lineChartRow.style.display = 'none';
    barChartRow.style.display = 'block';
  }
  
  showFirstChartRow(): void {
    const firstChartRow = document.getElementById('firstchartrow');
    const lineChartRow = document.getElementById('linechartrow');
    const barChartRow = document.getElementById('barchartrow');
    const pieChartRow = document.getElementById('piechartrow');
    // Completed Tasks Chart'ı göster, diğerlerini gizle
    pieChartRow.style.display = 'none';
    firstChartRow.style.display = 'block';
    lineChartRow.style.display = 'none';
    barChartRow.style.display = 'none';
  }
  
  showPieChartRow(): void {
    const firstChartRow = document.getElementById('firstchartrow');
    const lineChartRow = document.getElementById('linechartrow');
    const barChartRow = document.getElementById('barchartrow');
    const pieChartRow = document.getElementById('piechartrow');
    // Completed Tasks Chart'ı göster, diğerlerini gizle

    pieChartRow.style.display = 'block';
    firstChartRow.style.display = 'none';
    lineChartRow.style.display = 'none';
    barChartRow.style.display = 'none';
  }
  initializeCompletedTasksChart(): void {
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
    };

    const completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
    this.startAnimationForLineChart(completedTasksChart);
  }

  initializeWebsiteViewsChart(): void {
    const datawebsiteViewsChart = {
      labels: ['Jan.', 'Febr.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
      ]
    };

    const optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };

    const responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];

    const websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);
    this.startAnimationForBarChart(websiteViewsChart);
  }

  initializePieChart(): void {
    const dataPieChart = {
      series: [20, 50, 30]
    };

    const optionsPieChart = {
      total: 100,
      showLabel: true
    };

    const pieChart = new Chartist.Pie('#pieChart', dataPieChart, optionsPieChart);
    this.startAnimationForPieChart(pieChart);
  }

  startAnimationForLineChart(chart): void {
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
  }

 startAnimationForBarChart(chart): void {
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
  } 

  startAnimationForPieChart(chart): void {
    chart.on('draw', function(data) {
      if (data.type === 'slice') {
        const pathLength = data.element._node.getTotalLength();
        data.element.attr({
          'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
        });

        const animationDefinition = {
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
  }

}
