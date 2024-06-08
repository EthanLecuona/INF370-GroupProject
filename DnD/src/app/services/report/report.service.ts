import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jsPDF from 'jspdf';
import DomToImage from 'dom-to-image';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File, IWriteOptions } from '@ionic-native/file/ngx'
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private httpClient: HttpClient, private file: File, private fileOpener: FileOpener) { }

  GetVehicleReport(){
    return this.httpClient.get(environment.apiUrl + "Report/GetVehicleReport")
  }
  GetDriverReport(){
    return this.httpClient.get(environment.apiUrl + "Report/GetDriverReport")
  }
  GetBookingCancelledReport(){
    return this.httpClient.get(environment.apiUrl + "Report/GetBookingCancelledReport")
  }
  GetMaintenanceReport(){
    return this.httpClient.get(environment.apiUrl + "Report/GetMaintenanceReport")
  }
  GetAuditLogReport(){
    return this.httpClient.get(environment.apiUrl + "Report/GetAuditLogReport")
  }
  GetFuelReport(){
    return this.httpClient.get(environment.apiUrl + "Report/GetFuelReport")
  }
  GetBookingCount() : Observable<any>{
    return this.httpClient.get(environment.apiUrl + "Report/GetBookingCount")
  }
  GetBookingsInProgress(){
    return this.httpClient.get(environment.apiUrl + "Report/GetBookingsInProgress")
  }
  GetBookingCompleted(){
    return this.httpClient.get(environment.apiUrl + "Report/GetBookingCompleted")
  }
  GetBookingsPlaced(){
    return this.httpClient.get(environment.apiUrl + "Report/GetBookingsPlaced")
  }
  GetBookingCancelCount(){
    return this.httpClient.get(environment.apiUrl + "Report/GetBookingCancelCount")
  }
  GetIncidentCount(){
    return this.httpClient.get(environment.apiUrl + "Report/GetIncidentCount")
  }
  GetRefuelCount(){
    return this.httpClient.get(environment.apiUrl + "Report/GetRefuelCount")
  }
  GetTotalUsers(){
    return this.httpClient.get(environment.apiUrl + "Report/GetTotalUsers")
  }
  GetMaintenanceCount(){
    return this.httpClient.get(environment.apiUrl + "Report/GetMaintenanceCount")
  }
  getLocationAddress(latlng) {
    return this.httpClient.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ latlng + '&key=' + environment.googleMapsKey)
  }

  createPDF(pdfBlock : any, name: string){
    DomToImage.toPng(pdfBlock).then((fileUrl) => {
      var imgWidth = 200;
      var pageHeight = 297;
      var imgHeight = pdfBlock.clientHeight * imgWidth / pdfBlock.clientWidth;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm', 'A4', true);
      var position = 0;
      doc.addImage(fileUrl, 'PNG', 5, position + 5, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(fileUrl, 'PNG', 5, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save(name+'.pdf');
    })
  }

  async exportToExcel(data, filename) {
      {
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, filename);
        XLSX.writeFile(wb, filename + '.xlsx');
      }
    }

}
