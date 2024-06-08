import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { ReportService } from 'src/app/services/report/report.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


pdfMake.vfs = pdfFonts.pdfMake.vfs;
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
  selector: 'app-fuel-expenditure-report',
  templateUrl: './fuel-expenditure-report.page.html',
  styleUrls: ['./fuel-expenditure-report.page.scss'],
})

export class FuelExpenditureReportPage implements OnInit, AfterViewInit {
  @ViewChild('driverBarChart') private driverBarChart: ElementRef
  @ViewChild('totalBarChart') private totalBarChart: ElementRef
  @ViewChild('popover') popover;
  isOpen = false
  //static controls
  searchTerm
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  monthNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  dayNames = ["01", "02", "03" , "04" , "05", "06" , "07" , "08" , "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  yearNames = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]
  hourNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ,19, 20, 21, 22, 23]
  colors = [
    '#001844',
    '#005F8F',
    '#00ACBE',
    '#6CFACE',
    '#FFBA49',
    '#20A39E',
    '#61C9A8',
    '#A53860',
    '#FA7921',
    '#9D8DF1',
    '#1CFEBA',
    '#B8CDF8'
  ]
  //for Filters
  yearSelected: boolean = false
  monthSelected: boolean = false
  monthsOfRefuel = []
  //for Table
  dataForTable = []
  //for Graph
  barChartData = []
  barChartLabels = []
  //Load
  totalDriverRefuelList = []
  totalRefuelList = []
  refuelReportList
  //To Remember
  dayToCheck
  monthToCheck
  yearToCheck
  //For table
  totalFuelCost = 0
  totalLitres = 0
  averageCost = 0
  basedriverBarChart
  basetotalBarChart
  driverList = []

  type = "tables"
  activateTab = "tables"

  pdfOBkect
 pdfmake = require('pdfmake');
  constructor(private router: Router, private reportService: ReportService) { }

  tabChange(e){
    this.activateTab = e.target.value;
    if(this.activateTab == "graphs"){
      this.createDriverBarChart()
    }
  }
  back(){
    this.router.navigateByUrl("report")
  }

  pdf(){
    var pdfBlock = document.getElementById('fuelPDF')
    this.reportService.createPDF(pdfBlock, "FuelExpenditureReport")
  }

  ngOnInit() {
    this.reportService.GetFuelReport().subscribe(
      (res) => {
        this.refuelReportList = res
        this.load()
        this.loadDataForTable()
      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          console.log("Hit DistanceReport err 200")
        }
      })
  }

  load(){
    var tempList = []
    console.log(this.refuelReportList)
    this.refuelReportList.map(({driver}) => {
      tempList.push(driver)
    })
    tempList = tempList.filter((item, i, ar) => ar.indexOf(item) === i).sort((n1, n2) => n1 - n2)
    tempList.forEach(driver => {
      this.driverList.push(driver)
    });
  }

  loadDataForTable(){
    this.refuelReportList.map(({driver, date, litres, price, total}) => {
      this.totalFuelCost += total
      this.totalLitres += litres
      var tempItem = {
        driver : driver,
        date : new Date(date).toLocaleDateString('en-GB', { timeZone: 'UTC'}),
        litres: Math.round(litres * 100) / 100,
        price: Math.round(price * 100) / 100,
        total: Math.round(total * 100)/100
      }
      this.dataForTable.push(tempItem)
    })
    this.totalFuelCost = Math.round(this.totalFuelCost * 100) / 100
    this.totalLitres = Math.round(this.totalLitres * 100) / 100
    this.averageCost = Math.round((this.totalFuelCost / this.totalLitres) * 100) / 100
    console.log(this.totalFuelCost)
    console.log(this.totalLitres)
  }

  ngAfterViewInit(): void {
      this.basedriverBarChart = new Chart<'bar', number[] | string | string[]>(this.driverBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.driverList,
        datasets: [{
          label: 'Total Fuel Expenditure Per Driver',
          data: this.totalDriverRefuelList,
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
            ticks: {
              precision: 0,
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
            text : 'Total Fuel Expenditure by Driver',
            position : 'top'
          },
          legend : {
            display : false
          }
        }
      }
    })
    this.basetotalBarChart = new Chart<'bar', number[] | string | string[]>(this.totalBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.monthNames,
        datasets: [{
          label: 'Total Fuel Expenditure',
          data: this.totalDriverRefuelList,
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
            ticks: {
              precision: 0,
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
              text: 'Months',
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
            text : 'Total Fuel Expenditure by Date',
            position : 'top'
          },
          legend : {
            display : false
          }
        }
      }
    })
  }

  pickedYearTotal(yearToCheck){
    this.totalRefuelList = []
    var monthsToCheck = [], tempList = [], tempMonth = [], totalSum, year, month
    this.yearSelected = true
    this.yearToCheck = yearToCheck

    this.refuelReportList.map(({date, total}) => {
      year = new Date(date).getFullYear()
      if(year == this.yearToCheck){
        month = new Date(date).getMonth()
        tempMonth.push(month)
        tempList.push({month, total})
      }
    })
    tempMonth = tempMonth.filter((item, i, ar) => ar.indexOf(item) === i)
    tempMonth.forEach(month => {
      monthsToCheck.push(month)
    })
    for(let z = 0; z < this.monthNumbers.length; z++){
      totalSum = 0
      for(let i = 0; i < monthsToCheck.length; i++){
        console.log(monthsToCheck[i])
        console.log(this.monthNumbers[z])
        for(let j = 0; j < tempList.length; j++){
          if(this.monthNumbers[z] == monthsToCheck[i] && monthsToCheck[i] == tempList[j].month){
            totalSum += Math.round((tempList[j].total) * 100) / 100
            console.log("hi")
          }
        }
      }
      this.totalRefuelList.push(totalSum)
    }


    console.log(this.totalRefuelList)
    this.generateTotalBarDataset(this.totalRefuelList, "Distances per Month", "Months")
    this.barChartLabels = this.monthNames
    this.createTotalBarChart()
  }

  pickedYear(yearToCheck){
    var monthsToCheck = [], tempList = [], totalSum, year, month, totalDriverRefuelList
    this.yearSelected = true
    this.yearToCheck = yearToCheck

    this.refuelReportList.map(({date, total, driver}) => {
      year = new Date(date).getFullYear()
      if(year == this.yearToCheck){
        month = new Date(date).getMonth()
        monthsToCheck.push(month)
        tempList.push({month, total, driver})
      }
    })
    monthsToCheck = monthsToCheck.filter((item, i, ar) => ar.indexOf(item) === i)
    monthsToCheck.forEach(month => {
      this.monthsOfRefuel.push(month)
    })
    console.log(this.driverList)
    for(let z = 0; z < this.driverList.length; z++){
      totalSum = 0
      console.log("driver")
      for(let i = 0; i < monthsToCheck.length; i++){
        console.log(monthsToCheck[i])
        for(let j = 0; j < tempList.length; j++){
          if(this.driverList[z] == tempList[j].driver && monthsToCheck[i] == tempList[j].month){
            totalSum += Math.round((tempList[j].total) * 100) / 100
            console.log("hi")
          }
        }
      }

      this.totalDriverRefuelList.push(totalSum)
    }
    console.log(this.totalDriverRefuelList)
    this.generateDriverBarDataset(this.totalDriverRefuelList, "Distances per Month", "Months")
    this.barChartLabels = this.monthNames
    this.createDriverBarChart()
  }

  pickedMonth(monthToCheck){
    this.totalDriverRefuelList = []
    var tempList = [],
    totalSum = 0,
    daysOfRefuel = [],
    index, day, month, year

    this.monthSelected = true
    this.monthToCheck = monthToCheck
    console.log(this.monthToCheck)
    console.log(monthToCheck)
    this.refuelReportList.map(({date, total, driver}) => {
      year = new Date(date).getFullYear()
      if(year == this.yearToCheck){
        month = new Date(date).getMonth()
        if(month == this.monthToCheck){
          index = date.indexOf("T")
          day = date.slice(index - 2, index)
          tempList.push({day, total, driver})
          daysOfRefuel.push(day)
        }
      }

    })
    daysOfRefuel = daysOfRefuel.filter((item, i, ar) => ar.indexOf(item) === i).sort((n1, n2) => n1 - n2)
    console.log(daysOfRefuel)
    console.log(this.driverList)
    console.log(daysOfRefuel)
    for(let z = 0; z < this.driverList.length; z++){
      totalSum = 0
      for(let i = 0; i < daysOfRefuel.length; i++){
        for(let j = 0; j < tempList.length; j++){
          if(this.driverList[z] == tempList[j].driver && daysOfRefuel[i] == tempList[j].day){
            totalSum += Math.round((tempList[j].total) * 100) / 100
          }
        }
      }
      this.totalDriverRefuelList.push(totalSum)
    }
    console.log(this.totalDriverRefuelList)
    this.generateDriverBarDataset(this.totalDriverRefuelList, "Distance per Day", "Days")
    this.barChartLabels = this.driverList
    this.createDriverBarChart()
  }

  generateDriverBarDataset(arr, title, type){
    if(this.barChartData.length > 0){
      this.barChartData.splice(0, this.barChartData.length)
    }
    for(let i = 0; i < arr.length; i++){
      this.barChartData.push({
        label: this.driverList[i],
        data: arr[i],
        borderColor: this.colors[i],
        tension: 0.1
      })
    }
    this.createDriverBarChart()
  }

  generateTotalBarDataset(arr, title, type){
    if(this.barChartData.length > 0){
      this.barChartData.splice(0, this.barChartData.length)
    }
    for(let i = 0; i < arr.length; i++){
      this.barChartData.push({
        label: this.monthNames[i],
        data: arr[i],
        borderColor: this.colors[i],
        tension: 0.1
      })
    }
    this.createTotalBarChart()
  }
  createTotalBarChart(){
    this.basetotalBarChart.destroy()
    this.basetotalBarChart = new Chart<'bar', number[] | string | string[]>(this.totalBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.monthNames,
        datasets: [{
          label: 'Total Fuel Expenditure',
          data: this.totalRefuelList,
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
            text : 'Total Fuel Expenditure by Date',
            position : 'top'
          },
          legend : {
            display : false
          }
        }
      }
    })
  }

  createDriverBarChart(){
    this.basedriverBarChart.destroy()
    this.basedriverBarChart = new Chart<'bar', number[] | string | string[]>(this.driverBarChart.nativeElement, {
      type: 'bar',
      data: {
        labels: this.driverList,
        datasets: [{
          label: 'Total Fuel Expenditure by Driver',
          data: this.totalDriverRefuelList,
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
          hoverBackgroundColor : [
            '#001844',
            '#005F8F',
            '#00ACBE',
            '#6CFACE'
          ],
          hoverBorderColor :[
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
            ticks: {
              precision: 0,
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
              text: 'Months',
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
            text : 'Total Fuel Expenditure by Driver',
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
