import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from 'src/app/services/report/report.service';
import { LoadingService } from 'src/app/services/system/loading.service';

@Component({
  selector: 'app-audit-log-report',
  templateUrl: './audit-log-report.page.html',
  styleUrls: ['./audit-log-report.page.scss'],
})
export class AuditLogReportPage implements OnInit {
  @ViewChild('popover') popover;
  isOpen = false
  //static lists
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  monthNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  dayNames = [1, 2, 3 ,4 , 5, ,6 ,7 ,8 , 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  yearNames = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029]

  AuditLogReportList
  searchTerm: any

  constructor(private reportService: ReportService, private router: Router, private loader : LoadingService) { }

  ngOnInit() {
    this.reportService.GetAuditLogReport().subscribe(
      (res) => {
        this.AuditLogReportList = res
      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          console.log("Err 200 hit AuditLogReport")
        }
        else{
          alert("no data to be displayed")
        }
      }
    )
  }

  pdf(){
    var pdfBlock = document.getElementById("forPDF")
    this.reportService.createPDF(pdfBlock, "AuditLogReport")
  }

  excel(){
    this.reportService.exportToExcel(this.AuditLogReportList, "AuditLogReport")
  }
  back(){
    this.router.navigateByUrl('report')
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
