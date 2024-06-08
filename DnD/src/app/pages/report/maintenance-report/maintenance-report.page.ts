import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';


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
  selector: 'app-maintenance-report',
  templateUrl: './maintenance-report.page.html',
  styleUrls: ['./maintenance-report.page.scss'],
})
export class MaintenanceReportPage implements OnInit, AfterViewInit {
  @ViewChild('doughNutChart') private doughNutChart: ElementRef
  @ViewChild('popover') popover;
  isOpen = false
  baseDoughnutChart
  //static controls
  searchTerm
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  monthNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  dayNames = ["01", "02", "03" , "04" , "05", "06" , "07" , "08" , "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  yearNames = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]
  hourNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ,19, 20, 21, 22, 23]
  colors = ['#001844', '#CBCFFF', '#7177AF', '#555C91']
  //Filters
  yearSelected: boolean = false
  monthSelected: boolean = false
  monthsOfMaintenance = []
  yearsToCheck = []
  monthsToCheck = []
  daysOfMaintenance = []

  //For Table
  dataForTable = []
  //for Graph
  barChartData = []
  barChartLabels = []
  //load
  totalMaintenanceCount = []
  maintenanceReportList
  mechanicList = []



  type = "tables"
  activateTab = "tables"

  constructor(private router: Router,
    private reportService: ReportService) { }

  pdf(){
    var pdfBlock = document.getElementById('mainPDF')
    this.reportService.createPDF(pdfBlock, "MaintenanceReport")
  }

  back(){
    this.router.navigateByUrl("report")
  }

  tabChange(e){
    this.activateTab = e.target.value;
    if(this.activateTab == "graphs"){
      this.createBarChart()
    }
  }
  ngOnInit() {
   this.reportService.GetMaintenanceReport().subscribe(
      (res) => {
        this.maintenanceReportList = res
        console.log(res)
        this.load()
        this.loadDataForTable()
      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          console.log("Hit DistanceReport err 200")
        }
      })
  }
  load() {
    var tempList = []
    this.maintenanceReportList.map(({mechanicName}) => {
      tempList.push(mechanicName)
    })
    tempList = tempList.filter((item, i, ar) => ar.indexOf(item) === i).sort((n1, n2) => n1 - n2)
    tempList.forEach(driver => {
      this.mechanicList.push(driver)
    });
  }

  loadDataForTable() {
    this.maintenanceReportList.map(({mechanicName, mechanicEmail, serviceDate, registrationNum, vehicleManufacturer, vehicleModel}) => {
      var tempItem = {
        mechanicName : mechanicName,
        mechanicEmail : mechanicEmail,
        serviceDate: serviceDate,
        registrationNum: registrationNum,
        vehicleManufacturer: vehicleManufacturer,
        vehicleModel: vehicleModel
      }
      this.dataForTable.push(tempItem)
    })
  }

  pickedYear(yearToSelect){
    this.totalMaintenanceCount = []
    var monthsToCheck = [], tempList = [], countSum, year, month
    this.yearSelected = true
    this.yearsToCheck = yearToSelect

    this.maintenanceReportList.map(({serviceDate, mechanicName}) => {
      year = new Date(serviceDate).getFullYear()
      if(year == this.yearsToCheck){
        month = new Date(serviceDate).getMonth()
        monthsToCheck.push(month)
        tempList.push({month, mechanicName})
      }
    })
    monthsToCheck = monthsToCheck.filter((item, i, ar) => ar.indexOf(item) === i)
    monthsToCheck.forEach(month => {
      this.monthsToCheck.push(month)
    })
    console.log(this.mechanicList)
    for(let z = 0; z < this.mechanicList.length; z++){
      countSum = 0
      console.log("driver")
      for(let i = 0; i < monthsToCheck.length; i++){
        console.log(monthsToCheck[i])
        for(let j = 0; j < tempList.length; j++){
          if(this.mechanicList[z] == tempList[j].mechanicName && monthsToCheck[i] == tempList[j].month){
            countSum++
            console.log("hi")
          }
        }
      }

      this.totalMaintenanceCount.push(countSum)
    }
    console.log(this.totalMaintenanceCount)
    this.generateBarDataset(this.totalMaintenanceCount, "Distances per Month", "Months")
    this.barChartLabels = this.monthNames
    this.createBarChart()
  }

  // pickedMonth(monthToSelect){
  //   this.totalMaintenanceCount = []
  //   var tempList = [],
  //   countSum = 0,
  //   daysOfMaintenance = [],
  //   index, day, month, year

  //   this.monthSelected = true
  //   this.monthsToCheck = monthToSelect
  //   this.totalMaintenanceCount.map(({serviceDate, mechanicName}) => {
  //     year = new Date(serviceDate).getFullYear()
  //     if(year == this.yearsToCheck){
  //       month = new Date(serviceDate).getMonth()
  //       if(month == this.monthsToCheck){
  //         index = serviceDate.indexOf("T")
  //         day = serviceDate.slice(index - 2, index)
  //         tempList.push({day, mechanicName})
  //         daysOfMaintenance.push(day)
  //       }
  //     }

  //   })
  //   daysOfMaintenance = daysOfMaintenance.filter((item, i, ar) => ar.indexOf(item) === i).sort((n1, n2) => n1 - n2)

  //   console.log(daysOfMaintenance)
  //   console.log(this.mechanicList)
  //   daysOfMaintenance.forEach(day => {
  //     this.daysOfMaintenance.push(day)
  //   })
  //   for(let z = 0; z < this.mechanicList.length; z++){
  //     countSum = 0
  //     for(let i = 0; i < daysOfMaintenance.length; i++){
  //       for(let j = 0; j < tempList.length; j++){
  //         if(this.mechanicList[z] == tempList[j].mechanicName && daysOfMaintenance[i] == tempList[j].day){
  //           countSum += tempList[j].total
  //         }
  //       }
  //     }
  //     this.totalMaintenanceCount.push(countSum)
  //   }
  //   console.log(this.totalMaintenanceCount)
  //   this.generateBarDataset(this.totalMaintenanceCount, "Distance per Day", "Days")
  //   this.barChartLabels = this.mechanicList
  //   this.createBarChart()
  // }

  ngAfterViewInit(): void {
    this.baseDoughnutChart = new Chart<'bar', number[] | string | string[]>(this.doughNutChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.mechanicList,
        datasets: [{
          label: 'Maintenance Count',
          data: this.totalMaintenanceCount,
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
              text: 'Maintenance Count',
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
              text: 'Mechanics',
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
            text : 'Total Maintenances Booked by Mechanic',
            position : 'top'
          },
          legend : {
            display : false
          }
        }
      }
    })
  }

  generateBarDataset(arr, title, type){
    if(this.barChartData.length > 0){
      this.barChartData.splice(0, this.barChartData.length)
    }
    for(let i = 0; i < arr.length; i++){
      this.barChartData.push({
        label: this.mechanicList[i],
        data: arr[i],
        borderColor: this.colors[i],
        tension: 0.1
      })
    }
    this.createBarChart()
  }

  createBarChart(){
    this.baseDoughnutChart.destroy()
    this.baseDoughnutChart = new Chart<'bar', number[] | string | string[]>(this.doughNutChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.mechanicList,
        datasets: [{
          label: 'Maintenance Count',
          data: this.totalMaintenanceCount,
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
          borderWidth: 1
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
              text: 'Maintenance Count',
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
              text: 'Mechanics',
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
            text : 'Total Maintenances Booked by Mechanic',
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
    this.router.navigateByUrl('report/booking-cancel-report')
  }
  vehicleReport(){
    this.router.navigateByUrl('report/vehicle-report')
  }
  maintenance(){
    this.router.navigateByUrl('report/maintenance-report')
  }
  driverReport(){
    this.router.navigateByUrl('report/driver-report')
  }
  basicReport(){
    this.router.navigateByUrl('report/basic-report')
  }
  fuelReport(){
    this.router.navigateByUrl('report/fuel-expenditure-report')
  }
  auditLogReport(){
    this.router.navigateByUrl('report/audit-log-report')
  }

  presentPopover(e) {
    this.popover.event = e;
    this.isOpen = true;
  }
}
