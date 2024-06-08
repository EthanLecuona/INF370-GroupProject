import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ReportService } from 'src/app/services/report/report.service';
import { LoadingService } from 'src/app/services/system/loading.service';

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
  selector: 'app-booking-cancel-report',
  templateUrl: './booking-cancel-report.page.html',
  styleUrls: ['./booking-cancel-report.page.scss'],
})

export class BookingCancelReportPage implements OnInit, AfterViewInit {
  @ViewChild('baseChart') private baseCanvas: ElementRef
  @ViewChild('popover') popover;
  isOpen = false
  type = "tables"
  activateTab = "tables"
  searchTerm
  cancelledReportList
  tableData = []
  totalFined = 0
  totalCancelled
  baseChart: any
  chartData = []
  chartLabels = []
  userNames = ["All Users"]

  constructor(private router: Router, private reportService: ReportService, private loadingService: LoadingService, private route : Router) { }

  ngOnInit() {
    this.reportService.GetBookingCancelledReport().subscribe(
      (res) => {
        console.log(res)
        this.setCancelledBookings(res)

      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          console.log("Cancel booking err 200 hit")
        }
      })
  }

  pickedUser(pickedUser){
    this.totalCancelled = 0
    this.totalFined = 0
    console.log(this.cancelledReportList)
    if(pickedUser != "All Users"){
      this.searchTerm = pickedUser
      this.cancelledReportList.map(({user, fined}) => {
        console.log(user)
        console.log(pickedUser)
        if(user == pickedUser){
          if(fined == true){
            this.totalFined = this.totalFined + 100
          }
          this.totalCancelled++
        }
      })
    } else{
      this.searchTerm = ''
      this.cancelledReportList.map(({fined, user}) => {
        console.log(user)
        this.totalCancelled++
        console.log(fined)
        if(fined == true){
          this.totalFined = this.totalFined + 100
        }
      })
      console.log(this.totalCancelled)
      console.log(this.totalFined)
    }
  }
  //{"bookingId":42,"cancelled":true,"fined":false,"user":"Rudolph Richter","description":"Items not ready for delivery.","date":"2022-10-03T15:05:14.81"}
  setCancelledBookings(res){
    var tempList = [], userCount, tempUser
    this.cancelledReportList = res
    this.cancelledReportList.map(({user, fined, bookingId, description, date}) => {
      tempList.push(user)
      if(fined != true){
        tempUser = {
          bookingId : bookingId,
          user : user,
          description : description,
          date : date,
          fined : 0
        }
        this.tableData.push(tempUser)
      } else{
        tempUser = {
          bookingId : bookingId,
          user : user,
          description : description,
          date : date,
          fined : 100
        }
        this.totalFined = this.totalFined + 100
        this.tableData.push(tempUser)
      }
    })

    tempList = tempList.filter((item, i, ar) => ar.indexOf(item) === i)
    tempList.forEach(userName => {
      this.chartLabels.push(userName)
      this.userNames.push(userName)
    })
    console.log(this.userNames)
    for(let i = 0; i < this.chartLabels.length; i++){
      userCount = 0
      for(let j = 0; j < this.cancelledReportList.length; j++){
        if(this.chartLabels[i] == this.cancelledReportList[j].user){
          userCount++
        }
      }
      this.chartData.push(userCount)
    }
    this.totalCancelled = this.cancelledReportList.length
  }

  tabChange(e){
    this.activateTab = e.target.value;
    if(this.activateTab == "graphs"){
      this.createBarChart()
    }
  }

  pdf(){
    var pdfBlock = document.getElementById("bookingPDF")
    this.reportService.createPDF(pdfBlock, "BookingCancelReport")
  }

  back(){
    this.router.navigateByUrl("report")
  }

  ngAfterViewInit(): void {
    console.log(this.chartData)
    console.log(this.chartLabels)
    this.baseChart = new Chart<'bar', number[] | string | string[]>(this.baseCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Bookings Cancelled Per User',
          data: this.chartData,
          backgroundColor: [
            '#001844',
            '#005F8F',
            '#00ACBE',
            '#6CFACE'
          ],
          borderColor: [
            '#001844',
            '#005F8F',
            '#00ACBE',
            '#6CFACE'
          ],

          borderWidth: 1
        }]
      },
      options: {
        scales:{
          y: {
            ticks: {
              precision: 0
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      }
    })

  }

  createBarChart(){
    this.baseChart.destroy()
    this.baseChart = new Chart<'bar', number[] | string | string[]>(this.baseCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: [{
          data: this.chartData,
          backgroundColor: [
            '#001844',
            '#005F8F',
            '#004e95',
          ],
          borderColor: [
            '#001844',
            '#005F8F',
            '#004e95',
          ],
          hoverBackgroundColor : [
            '#001844',
            '#005F8F',
            '#004e95',
          ],
          hoverBorderColor :[
            '#001844',
            '#005F8F',
            '#004e95',
          ],
          borderWidth: 1,
        }]
      },
      plugins : [chartAreaBorder],
      options: {
        scales:{
          y: {
            ticks : {
              precision : 0
            },
            grid : {
              display : false
            },
            title: {
              display: true,
              text: 'Cancelled Bookings',
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
              text: 'Users',
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
            text : 'Total Bookings Cancelled',
            position : 'top'
          },
          legend : {
            display : false
          }
        }
      }
    })
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
