import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
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
  selector: 'app-driver-report',
  templateUrl: './driver-report.page.html',
  styleUrls: ['./driver-report.page.scss'],
})
export class DriverReportPage implements OnInit, AfterViewInit {
  @ViewChild('doughNutChart') private doughNutChart: ElementRef
  @ViewChild('lineChart') private lineChart: ElementRef
  @ViewChild('popover') popover;
  isOpen = false
  //static controls
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  monthNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  dayNames = ["01", "02", "03" , "04" , "05", "06" , "07" , "08" , "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  yearNames = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]
  hourNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ,19, 20, 21, 22, 23]
  colors = ['#001844','#005F8F','#004e95',]
  //Booking info to use and refactor
  driverReportList
  refactorReportList = []
  driverList = []
  datesOfBookings = []
  distanceReportData = []
  dataForTable = []

  dayToCheck = 0
  yearToCheck = 0
  monthToCheck = 0

  monthsOfBookings = []
  daysOfBookings = []
  //LineChartSets
  lineChartLabels = []
  lineChartDatasets = []
  baseDoughnutChart: any
  baseLineChart: any
  //for Table
  totalDistanceDriven = 0
  totalTrips = 0
  averageDistanceDriven = 0
  driverNames = ['All Drivers']
  //DoughnutChartSets
  totalDistanceList = []


  distancePerDay = []
  distancesPerMonth = []
  individualDistanceList = []


  searchTerm
  counter = 0
  //For Filters
  yearSelected: boolean = false
  monthSelected: boolean = false
  daySelected: boolean = false
  selectedYear = 2022
  selectedMonth
  selectedDay

  type = "tables"
  activateTab = "tables"
  pdfTab = ""

  constructor(
    private router: Router,
    private reportService: ReportService,
    private userService: UserService,
    private popoverController: PopoverController) { }

  pdf(){
    var pdfBlock = document.getElementById("driverPDF")
    this.reportService.createPDF(pdfBlock, "DriverReport")
  }
  back(){
    this.router.navigateByUrl("report")
  }

  tabChange(e){
    this.activateTab = e.target.value;
    if(this.activateTab == "graphs"){
      this.createBarChart()
      this.createLineChart()
    }
  }


  ngOnInit() {
    this.driverList = []
    this.reportService.GetDriverReport().subscribe(
      (res) => {
        this.driverReportList = res
        this.load()
        this.loadDataForTable()
      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          console.log("Hit DistanceReport err 200")
        }
      })
  }

  loadDataForTable(){
    var tempDates = [], tempPredDistance = 0, tempActualDistance = 0, tempDriver
    this.driverReportList.map(({date}) => {
      tempDates.push(date)
    })
    tempDates = tempDates.filter((item, i, ar) => ar.indexOf(item) === i).sort((n1, n2) => n1 - n2)
    console.log(tempDates)

    for(let i = 0; i < tempDates.length; i++){
      for(let j = 0; j < this.driverReportList.length; j++){
        if(tempDates[i] == this.driverReportList[j].date){
          tempPredDistance += this.driverReportList[j].distance
          tempActualDistance = this.driverReportList[j].actualDistance
          tempDriver = this.driverReportList[j].driver
        }
      }
      var tempItem = {
        driver : tempDriver,
        date : new Date(tempDates[i]).toLocaleDateString('en-GB', { timeZone: 'UTC'}),
        actualDistance: JSON.stringify(Math.round(tempActualDistance * 100) / 100) + " Km",
        distance: JSON.stringify(Math.round(tempPredDistance * 100) / 100) + " Km"
      }
      tempPredDistance = 0
      console.log(tempItem)
      this.dataForTable.push(tempItem)

    }

    // this.driverReportList.map(({distance, actualDistance, driver, date}) => {
    //   this.totalDistanceDriven += distance
    //   this.totalTrips++
    //   var tempItem = {
    //     driver : driver,
    //     date : new Date(date).toLocaleDateString('en-GB', { timeZone: 'UTC'}),
    //     actualDistance: JSON.stringify(actualDistance) + " Km",
    //     distance: JSON.stringify(distance) + " Km"
    //   }
    //   this.dataForTable.push(tempItem)
    // })
    this.averageDistanceDriven = Math.round((this.totalDistanceDriven / this.totalTrips) * 100) / 100
    this.totalDistanceDriven = Math.round(this.totalDistanceDriven * 100) / 100
  }


  load(){
    var month, index, day
    this.driverReportList.map(({driver, date, distance}) => {
      this.totalTrips++
      this.totalDistanceDriven += distance
      month = new Date(date)
      this.monthsOfBookings.push(month.getMonth())
      index = date.indexOf("T")
      day = date.slice(index - 2, index)

      this.daysOfBookings.push(day)
      this.driverList.push(driver)
    })
    this.averageDistanceDriven = this.totalDistanceDriven / this.totalTrips
    this.daysOfBookings = this.daysOfBookings.filter((item, i, ar) => ar.indexOf(item) === i).sort((n1, n2) => n1 - n2)
    this.driverList = this.driverList.filter((item, i, ar) => ar.indexOf(item) === i)
    this.driverList.forEach(driver => {
      this.driverNames.push(driver)
    })
    for(let j = 0; j < this.driverList.length; j++){
      var distancePerDriver : any[] = []
      this.counter = 0
      for(let i = 0; i < this.driverReportList.length; i++){
        if(this.driverReportList[i].driver == this.driverList[j]){
          this.counter += this.driverReportList[i].distance
          distancePerDriver.push(this.driverReportList[i].distance)
        }
      }
      this.totalDistanceList.push(this.counter)
      this.individualDistanceList.push(distancePerDriver)
    }
    this.lineChartLabels = this.driverList
    this.createBarChart()
  }

  pickedDriver(driverToCheck){
    this.searchTerm = driverToCheck
    if(driverToCheck == 'All Drivers') {
      this.searchTerm = ''
    }
    this.totalDistanceDriven = 0
    this.totalTrips = 0
    if(driverToCheck != "All Drivers"){
      this.driverReportList.map(({distance, driver}) => {
        if(driver == driverToCheck){
          this.totalTrips++
          this.totalDistanceDriven += distance
        }
      })
      this.averageDistanceDriven = Math.round((this.totalDistanceDriven / this.totalTrips) * 100) / 100
      this.totalDistanceDriven = Math.round(this.totalDistanceDriven * 100) / 100
    } else{
      this.driverReportList.map(({distance}) => {
        this.totalTrips++
        this.totalDistanceDriven += distance
      })
      this.averageDistanceDriven = Math.round((this.totalDistanceDriven / this.totalTrips) * 100) / 100
      this.totalDistanceDriven = Math.round(this.totalDistanceDriven * 100) / 100
    }
  }


  pickedYear(yearToCheck){
    this.distancesPerMonth = []
    var monthsToCheck = [], tempList = [], distanceSum, year, month
    this.yearSelected = true
    this.yearToCheck = yearToCheck
    this.driverReportList.map(({date, distance, driver}) => {
      console.log(date)
      year = new Date(date).getFullYear()
      if(year == this.yearToCheck){
        month = new Date(date).getMonth()
        monthsToCheck.push(month)
        tempList.push({month, distance, driver})
      }
    })
    monthsToCheck = monthsToCheck.filter((item, i, ar) => ar.indexOf(item) === i)
    for(let z = 0; z < this.driverList.length; z++){
      var driverMonthDistances = []
      for(let i = 0; i < this.monthNumbers.length; i++){
        if(monthsToCheck.indexOf(this.monthNumbers[i]) != -1){
          for(let j = 0; j < tempList.length; j++){
            if(this.driverList[z] == tempList[j].driver && this.monthNumbers[i] == tempList[j].month){
              distanceSum += tempList[j].distance
            }
          }
        }else{
          distanceSum = 0
        }
        driverMonthDistances.push(distanceSum)
        distanceSum = 0
      }
      this.distancesPerMonth.push(driverMonthDistances)
    }

    this.generateLineDataSets(this.distancesPerMonth, "Distances per Month", "Months")
    this.lineChartLabels = this.monthNames
    this.createLineChart()
  }

  pickedMonth(monthToCheck){
    var tempList = [],
    distanceSum = 0,
    daysOfBookings = [],
    distancePerDay = [],
    index, day, month, year

    this.monthSelected = true
    this.monthToCheck = monthToCheck
    this.driverReportList.map(({date, distance, driver}) => {
      year = new Date(date).getFullYear()
      if(year == this.yearToCheck){
        month = new Date(date).getMonth()
        if(month == this.monthToCheck){
          index = date.indexOf("T")
          day = date.slice(index - 2, index)
          tempList.push({day, distance, driver})
          daysOfBookings.push(day)
        }
      }

    })
    daysOfBookings = daysOfBookings.filter((item, i, ar) => ar.indexOf(item) === i).sort((n1, n2) => n1 - n2)
    for(let z = 0; z < this.driverList.length; z++){
      var driverDayDistances = []
      for(let i = 0; i < this.dayNames.length; i++){
        if(daysOfBookings.indexOf(this.dayNames[i]) != -1){
          for(let j = 0; j < tempList.length; j++){
            if(this.driverList[z] == tempList[j].driver && this.dayNames[i] == tempList[j].day){
              distanceSum += tempList[j].distance
            }
          }
        } else {
          distanceSum = 0
        }

        driverDayDistances.push(distanceSum)
        distanceSum = 0
      }
      distancePerDay.push(driverDayDistances)
    }
    this.generateLineDataSets(distancePerDay, "Distance per Day", "Days")
    this.lineChartLabels = this.dayNames
    this.createLineChart()
  }


  // pickedDay(dayToCheck){
  //   var hoursToCheck = [], tempList = [], distanceSum = 0, distancesPerHour = [], year, index, day, month, time
  //   this.dayToCheck = dayToCheck
  //   this.driverReportList.map(({date, distance, driver}) => {
  //     year = new Date(date).getFullYear()
  //     console.log("hi")
  //     if(year == this.yearToCheck){
  //       console.log("year")
  //       month = new Date(date).getMonth()
  //       if(month == this.monthToCheck){
  //         console.log("month")
  //         index = date.indexOf("T")
  //         day = date.slice(index - 2, index)
  //         if(day == this.dayToCheck){
  //           console.log("day")
  //           time = new Date(date).getHours()
  //           hoursToCheck.push(time)
  //           tempList.push({time, distance, driver})
  //         }
  //       }
  //     }

  //   })
  //   console.log(tempList)
  //   for(let z = 0; z < this.driverList.length; z++){
  //     var driverHourDistances = []
  //     for(let i = 0; i < this.hourNames.length; i++) {
  //       if(hoursToCheck.indexOf(this.hourNames[i]) != -1) {
  //         for(let j = 0; j < tempList.length; j++){
  //           if(this.driverList[z] == tempList[j].driver && this.hourNames[i] == tempList[j].time){
  //             console.log('hi')
  //             distanceSum += tempList[j].distance
  //           }
  //         }
  //       } else {
  //         distanceSum = 0
  //       }

  //       driverHourDistances.push(distanceSum)
  //       distanceSum = 0
  //     }
  //     distancesPerHour.push(driverHourDistances)
  //   }
  //   this.generateLineDataSets(distancesPerHour, "Distance per Hour", "Hours")
  //   this.lineChartLabels = this.hourNames
  //   this.createLineChart()
  // }


  generateLineDataSets(arr, title, type){
    if(this.lineChartDatasets.length > 0){
      this.lineChartDatasets.splice(0, this.lineChartDatasets.length)
    }
    for(let i = 0; i < arr.length; i++){
      this.lineChartDatasets.push({
        label: this.driverList[i],
        data: arr[i],
        fill: true,
        borderColor: this.colors[i],
        backgroundColor: this.colors[i],
        tension: 0.1,
        pointBorderColor: 'rgb(224, 224, 224)',
        pointBackgroundColor: 'rgb(224, 224, 224)',
      })
    }
    this.createLineChart()
  }

  ngAfterViewInit(): void {
    this.baseDoughnutChart = new Chart<'bar', number[] | string | string[]>(this.doughNutChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.driverList,
        datasets: [{
          label: 'Total Distance Driven Per Driver',
          data: this.totalDistanceList,
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
            ticks: {
              precision: 0,
              callback(tickValue) {
                return tickValue + ' Km'
              }
            },
            grid : {
              display : false
            },
            title: {
              display: true,
              text: 'Distance in Km ',
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
              text: 'Drivers',
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
            text : 'Total Distance by Driver',
            position : 'top'
          },
          legend : {
            display : false
          }
        }
      }
    })

    this.baseLineChart = new Chart<'line', number[] | string | string[]>(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: this.lineChartDatasets
      },
      plugins : [chartAreaBorder],
      options: {
        scales:{
          y: {
            ticks: {
              precision: 0,
              callback(tickValue) {
                return tickValue + ' Km'
              }
            },
            grid : {
              display : false
            },
            title: {
              display: true,
              text: 'Distance in Km ',
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
            text : 'Distances by date',
            position : 'top'
          },
          legend : {
            display : false
          }
        }
      }
    })



    var length = this.driverList.length, tempList = []
    for(let x = 0; x < length; x++){
      tempList.push({driverUserId: this.driverList[x], driverName: this.driverList[x]})
    }
  }

  createBarChart(){
    this.baseDoughnutChart.destroy()
    this.baseDoughnutChart = new Chart<'bar', number[] | string | string[]>(this.doughNutChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.driverList,
        datasets: [{
          label: 'Total Distance Driven by Driver',
          data: this.totalDistanceList,
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
            ticks: {
              precision: 0,
              callback(tickValue) {
                return tickValue + ' Km'
              }
            },
            grid : {
              display : false
            },
            title: {
              display: true,
              text: 'Distance in Km ',
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
              text: 'Drivers',
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
            text : 'Total Distance by Driver',
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
        labels: this.lineChartLabels,
        datasets: this.lineChartDatasets
      },
      plugins : [chartAreaBorder],
      options: {
        scales:{
          y: {
            ticks: {
              precision: 0,
              callback(tickValue) {
                return tickValue + ' Km'
              }
            },
            grid : {
              display : false
            },
            title: {
              display: true,
              text: 'Distance in Km ',
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
            text : 'Distances by date',
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
