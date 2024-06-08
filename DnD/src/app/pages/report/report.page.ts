import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, ToastController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { ReportService } from 'src/app/services/report/report.service';

const chartAreaBorder = {
  id: 'chartAreaBorder',
  beforeDraw(chart, args, options) {
    const {ctx, chartArea: {left, top, width, height}} = chart;
    ctx.save();
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.setLineDash(options.borderDash || []);
    ctx.strokeRect(left, top, width, height);
    ctx.restore();
  }
};


@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit, AfterViewInit {
  @ViewChild('lineChart') private lineChart: ElementRef
  @ViewChild('popover') popover;
  baseLineChart: any
  //static
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  monthNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  colors = ['#001844', '#001844', '#CBCFFF', '#7177AF', '#555C91']
  isOpen = false
  bookingsCompletedCount
  bookingsInProgressCount
  bookingsCancelledCount
  bookingsPlacedCount
  incidentCount
  refuelCount
  totalFuel = 0
  totalFuelList = []
  avgCostFuel
  fuelData
  totalUsersCount
  maintenanceCount
  constructor(private reportService : ReportService, private toast : ToastController, private route : Router, private popoverController : PopoverController) { }

  ngOnInit() {
    this.reportService.GetBookingsInProgress().subscribe(
    (res) => {
        this.bookingsInProgressCount = res
    })
    this.reportService.GetBookingCompleted().subscribe(
      (res) => {
        this.bookingsCompletedCount = res
    })
    this.reportService.GetBookingsPlaced().subscribe(
      (res) => {
        this.bookingsPlacedCount = res
    })
    this.reportService.GetBookingCancelCount().subscribe(
      (res) => {
        this.bookingsCancelledCount = res
    })
    this.reportService.GetIncidentCount().subscribe(
      (res) => {
        this.incidentCount = res
    })
    this.reportService.GetRefuelCount().subscribe(
      (res) => {
        this.refuelCount = res
    })
    this.reportService.GetTotalUsers().subscribe(
      (res) => {
        this.totalUsersCount = res
    })
    this.reportService.GetMaintenanceCount().subscribe(
      (res) => {
        this.maintenanceCount = res
    })
    this.reportService.GetFuelReport().subscribe(
      (res) => {
        console.log(res)
        this.loadData(res)
    })
    // this.fuelData.map(({litres, price}) => {

    // })
  }

  loadData(res){
    var year, yearNow, month, tempList = [], tempFuel = 0, tempAverage = 0, cost, totalList = [], count = 0
    this.fuelData = res
    this.fuelData.map(({litres, price, date}) => {
      this.totalFuel += price * litres
      year = new Date(date).getFullYear()
      yearNow = new Date().getFullYear()
      if(year == yearNow){
        month = new Date(date).getMonth()
        cost = litres * price
        tempList.push({cost, month})
      }
    })

    for(let i = 0; i < this.monthNumbers.length; i++){
      tempFuel = 0
      count = 0
      console.log(tempFuel)
      for(let j = 0; j < tempList.length; j++){
        if(tempList[j].month == this.monthNumbers[i]){
          tempFuel += Math.round(tempList[j].cost * 100) / 100
          count++
        }
      }
      if(tempFuel == 0){
        totalList.push(tempFuel)
      } else{
        tempAverage = tempFuel / count
        totalList.push(tempAverage)
      }
      console.log(tempFuel)
      // totalList.push(tempAverage)
      console.log(totalList)
    }
    this.totalFuel = Math.round(this.totalFuel * 100) / 100
    this.avgCostFuel = Math.round((this.totalFuel / this.refuelCount) * 100) /100
    console.log(this.avgCostFuel)
    this.totalFuelList = totalList
    this.generateLineDataSets(totalList)
  }

  ngAfterViewInit(): void {
    this.baseLineChart = new Chart<'line', number[] | string | string[]>(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.monthNames,
        datasets: this.totalFuelList
      },
      plugins : [chartAreaBorder],
      options: {
        scales:{
          y: {
            ticks : {
              precision : 0,
              callback(tickValue) {
                return 'R' + tickValue
              }
            },
            grid : {
              display : false
            },
            title: {
              display: true,
              text: 'Cost (Rand)',
              font : {
                lineHeight : 1,
                size : 20
              }
            }
          },
          x: {
            ticks : {
              precision : 0
            },
            grid : {
              display : false
            },
            title: {
              display: true,
              text: 'Date',
              font : {
                lineHeight : 1,
                size : 20
              }
            }
          }
        },
        plugins: {
          title : {
            font : {
              size : 24
            },
            display : true,
            text : 'Average Fuel Expenditure by Date',
            position : 'top'
          },
          legend : {
            display : false
          }
        }
      }
    })
  }

  createLineChart(){

    this.baseLineChart.destroy()
    this.baseLineChart = new Chart<'line', number[] | string | string[]>(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.monthNames,
        datasets: [{
          label: "Avg Refuel Cost",
          data: this.totalFuelList,
          fill: true,
          borderColor: '#001844',
          backgroundColor : '#001844',
          pointBorderColor : 'rgba(224,224,224)',
          pointBackgroundColor: 'rgba(224,224,224)',
          tension: 0.1,
        }]
      },
      plugins : [chartAreaBorder],
      options: {
        scales:{
          y: {
            ticks : {
              precision : 0,
              callback(tickValue) {
                return 'R' + tickValue
              }
            },
            grid : {
              display : false
            },
            title: {
              display: true,
              text: 'Cost in R',
              font : {
                lineHeight : 1,
                size : 20
              }
            }
          },
          x: {
            ticks : {
              precision : 0
            },
            grid : {
              display : false
            },
            title: {
              display: true,
              text: 'Month',
              font : {
                lineHeight : 1,
                size : 20
              }
            }
          }
        },
        plugins: {
          title : {
            font : {
              size : 24
            },
            display : true,
            text : 'Average Fuel Expenditure by Month',
            position : 'top'
          },
          legend : {
            display : false
          }
        }
      }

    })

  }

  generateLineDataSets(arr){


      // this.totalFuelList.push({
      //   // label: "Avg Refuel Cost",
      //   // data: arr,
      //   datasets: [{
      //     label: "Avg Refuel Cost",
      //     data: arr,
      //     fill: false,
      //     borderColor: '#001844',
      //     backgroundColor : '#001844',
      //     tension: 0.1
      //   }]
      //   // borderColor: this.colors[1],
      //   // tension: 0.1
      // })

    this.createLineChart()
  }

  bookingCancel(){
    this.route.navigateByUrl('report/booking-cancel-report')
  }
  vehicleReport(){
    this.route.navigateByUrl('report/vehicle-report')
  }
  maintenance(){
    this.route.navigateByUrl('report/maintenance-report')
  }
  driverReport(){
    this.route.navigateByUrl('report/driver-report')
  }
  basicReport(){
    this.route.navigateByUrl('report/basic-report')
  }
  fuelReport(){
    this.route.navigateByUrl('report/fuel-expenditure-report')
  }
  auditLogReport(){
    this.route.navigateByUrl('report/audit-log-report')
  }

  presentPopover(e) {
    this.popover.event = e;
    this.isOpen = true;
  }
}
