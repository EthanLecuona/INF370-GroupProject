import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js'
import { ReportService } from 'src/app/services/report/report.service';
import { UserService } from 'src/app/services/user/user.service';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { environment } from 'src/environments/environment';
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
  selector: 'app-vehicle-report',
  templateUrl: './vehicle-report.page.html',
  styleUrls: ['./vehicle-report.page.scss'],
})


export class VehicleReportPage implements OnInit, AfterViewInit {
  @ViewChild('pieChart') private pieChart: ElementRef
  @ViewChild('lineChart') private lineChart: ElementRef
  @ViewChild('popover') popover;
  isOpen = false
  //For Filters
  yearSelected: boolean = false
  monthSelected: boolean = false
  daySelected: boolean = false

  yearToCheck = 0
  monthToCheck = 0
  //static lists
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  monthNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  dayNames = ["01", "02", "03" , "04" , "05", "06" , "07" , "08" , "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  yearNames = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]
  hourNames = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ,19, 20, 21, 22, 23]
  colors = ['#001844', '#001844', '#CBCFFF', '#7177AF', '#555C91']
  //Graphs
  //for data store
  pieChartData = []
  pieChartLabels = []
  lineChartData = []
  lineChartLabels = []
  I = []
  //For Remember
  monthsOfIncidents = []
  daysOfIncidents = []
  //charts
  basePieChart: any
  baseLineChart: any



  locationList = []
  incidentReportList
  incidentDriverName = []
  searchTerm
  counter = 0
  type = "tables"
  activateTab = "tables"
  constructor(private router: Router, private reportService: ReportService, private userService: UserService, private route : Router) { }




  ngOnInit() {
    this.reportService.GetVehicleReport().subscribe(
      (res) => {
        this.loadData(res)
        console.log(res)

      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          console.log("Incident Err 200 hit")
        }
      })

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

    pdf(){
      var pdfBlock = document.getElementById('vehiclePDF')
      this.reportService.createPDF(pdfBlock, "VehicleReport")
    }

    loadData(res){
      var driverList = [], month, day, index, monthList = [], dayList = []
      this.incidentReportList = res
      console.log(this.incidentReportList)
      for(var i = 0; i < this.incidentReportList.length; i++) {
        this.reportService.getLocationAddress(this.incidentReportList[i]['incidentLocation']).subscribe((res : []) => {
          this.locationList.push(res['results'][i]['formatted_address'])
        })
      }

      this.incidentReportList.map(({driver, date}) => {
        month = new Date(date)
        monthList.push(month.getMonth())
        index = date.indexOf("T")
        day = date.slice(index - 2, index)
        dayList.push(day)
        driverList.push(driver)
      })
      driverList = driverList.filter((item, i, ar) => ar.indexOf(item) === i)
      monthList = monthList.filter((item, i, ar) => ar.indexOf(item) === i)
      dayList = dayList.filter((item, i, ar) => ar.indexOf(item) === i)

      driverList.forEach(driver => {
        this.incidentDriverName.push(driver)
      });
      monthList.forEach(driver => {
        this.monthsOfIncidents.push(driver)
      });
      dayList.forEach(driver => {
        this.daysOfIncidents.push(driver)
      });


      for(let i = 0; i < this.incidentDriverName.length; i++){
        this.counter = 0
        for(let j = 0; j < this.incidentReportList.length; j++){
          if(this.incidentDriverName[i] == this.incidentReportList[j].driver){
            this.counter++
          }
        }
        this.pieChartData.push(this.counter)
      }

      this.createBarChart()
      // this.pickedYear(new Date().getFullYear())
    }


  ngAfterViewInit(): void {

    this.basePieChart = new Chart<'pie', number[] | string | string[]>(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: this.pieChartLabels,
        datasets: [{
          label: 'Bookings Cancelled Pie chart',
          data: this.pieChartData,
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
              precision : 0,
              display: false
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
          legend : {
            display : true
          },
          title : {
            font : {
              size : 24
            },
            display : true,
            text : 'Total Bookings Cancelled',
            position : 'top'
          },

        }
      }
    })

    this.baseLineChart = new Chart<'line', number[] | string | string[]>(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: this.lineChartLabels,
        datasets: this.lineChartData,


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
              text: 'Incident Count',
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
            text : 'Total Incidents by Date',
            position : 'top'
          },
          legend : {
            display : false
          }
        }
      }
    })
  }

  pickedYear(yearToCheck){
    var monthsToCheck = [], tempList = [], incidentCount, year, month, incidentsPerMonth = []
    this.yearSelected = true
    this.yearToCheck = yearToCheck
    this.incidentReportList.map(({date, driver}) => {
      year = new Date(date).getFullYear()
      if(year == yearToCheck){
        month = new Date(date).getMonth()
        monthsToCheck.push(month)
        tempList.push({month, driver})
      }
    })
    monthsToCheck = monthsToCheck.filter((item, i, ar) => ar.indexOf(item) === i)
    console.log(monthsToCheck)
    console.log(this.incidentDriverName)
    console.log(this.incidentDriverName.length)
    for(let z = 0; z < this.incidentDriverName.length; z++){
      var driverMonthlyIncidents = []
      for(let i = 0; i < this.monthNumbers.length; i++){
        if(monthsToCheck.indexOf(this.monthNumbers[i]) != -1){
          for(let j = 0; j < tempList.length; j++){
            if(this.incidentDriverName[z] == tempList[j].driver && this.monthNumbers[i] == tempList[j].month){
              incidentCount++
            }
          }
        }else{
          incidentCount = 0
        }
        driverMonthlyIncidents.push(incidentCount)
        incidentCount = 0
      }
      incidentsPerMonth.push(driverMonthlyIncidents)
    }
    console.log(incidentsPerMonth)
    this.generateLineDataSets(incidentsPerMonth, "Incidents per Month", "Months")
    this.lineChartLabels = this.monthNames
    this.createLineChart()
  }

  pickedMonth(monthToCheck){
    var tempList = [], incidentCount = 0, daysToCheck = [], distancePerDay = []
    this.monthSelected = true
    this.monthToCheck = monthToCheck
    this.incidentReportList.map(({date, driver}) => {
      var index, day: string, month, year, tempDate = new Date(date)
      year = tempDate.getFullYear()
      if(year == this.yearToCheck){
        month = tempDate.getMonth()
        if(month == this.monthToCheck){
          index = date.indexOf("T")
          day = date.slice(index - 2, 10)
          tempList.push({day, driver})
          daysToCheck.push(day)
        }
      }

    })
    console.log(tempList)
    daysToCheck = daysToCheck.filter((item, i, ar) => ar.indexOf(item) === i).sort((n1, n2) => n1 - n2)
    for(let z = 0; z < this.incidentDriverName.length; z++){
      var driverDayIncidents = []
      for(let i = 0; i < this.dayNames.length; i++){
        if(daysToCheck.indexOf(this.dayNames[i]) != -1){
          for(let j = 0; j < tempList.length; j++){
            if(this.incidentDriverName[z] == tempList[j].driver && this.dayNames[i] == tempList[j].day){
              console.log("hi")
              incidentCount++
            }
          }
        } else {
          incidentCount = 0
        }

        driverDayIncidents.push(incidentCount)
        incidentCount = 0
      }
      distancePerDay.push(driverDayIncidents)
      this.I = distancePerDay
    }
    this.generateLineDataSets(distancePerDay, "Incidents per Day", "Days")
    this.lineChartLabels = this.dayNames
    this.createLineChart()
  }


  pickedDay(dayToCheck){
    var tempList = [], hoursToCheck = [], incidentCount = 0, distancesPerHour = [], index, year, day, month, time
    this.incidentReportList.map(({date, driver}) => {
      year = new Date(date).getFullYear()
      if(year == this.yearToCheck){
        month = new Date(date).getMonth()
        if(month == this.monthToCheck){
          index = date.indexOf("T")
          day = date.slice(index - 2, 10)
          if(day == dayToCheck){
            time = new Date(date).getHours()
            console.log(time)
            hoursToCheck.push(time)
            tempList.push({time, driver})
          }
        }
      }

    })
    hoursToCheck = hoursToCheck.filter((item, i, ar) => ar.indexOf(item) === i).sort((n1, n2) => n1 - n2)
    console.log(hoursToCheck)
    for(let z = 0; z < this.incidentDriverName.length; z++){
      var driverIncidentTime = []
      for(let i = 0; i < this.hourNames.length; i++){
        if(hoursToCheck.indexOf(this.hourNames[i]) != -1){
          for(let j = 0; j < tempList.length; j++){
            if(this.incidentDriverName[z] == tempList[j].driver && this.hourNames[i] == tempList[j].time){
              incidentCount++
            }
          }
        } else {
          incidentCount = 0
        }

        driverIncidentTime.push(incidentCount)
        incidentCount = 0
      }
      distancesPerHour.push(driverIncidentTime)
    }
    this.generateLineDataSets(distancesPerHour, "Incidents for the day", "Hours")
    this.lineChartLabels = this.hourNames
    this.createLineChart()
  }

  generateLineDataSets(arr, title, type){
    if(this.lineChartData.length > 0){
      this.lineChartData.splice(0, this.lineChartData.length)
    }
    for(let i = 0; i < arr.length; i++){
      this.lineChartData.push({
        label: this.incidentDriverName[i],
        data: arr[i],
        fill: true,
        borderColor: this.colors[i],
        backgroundColor: this.colors[i],
        tension: 0.1,
        pointBorderColor: 'rgb(224, 224, 224)',
        pointBackgroundColor: 'rgb(224, 224, 224)'
      })
    }
    this.createLineChart()
  }

  createBarChart(){
    this.basePieChart.destroy()
    this.basePieChart = new Chart<'pie', number[] | string | string[]>(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: this.incidentDriverName,
        datasets: [{
          label: 'Total Incidents per Driver',
          data: this.pieChartData,
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
              precision : 0,
              display: false
            },
            grid : {
              display : false
            },
            title: {
              display: false,
              font : {
                lineHeight : 1,
                size : 20
              }
            }
          },
          x: {
            ticks : {
              precision : 0,
              display: false
            },
            grid : {
              display : false
            },
            title: {
              display: false,
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
            text : 'Total Incidents by Driver',
            position : 'top'
          },
          legend : {
            display : true
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
        datasets: this.lineChartData
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
              text: 'Incident Count',
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
            text : 'Total Incidents by Date',
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
