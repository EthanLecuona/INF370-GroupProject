import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ResolveEnd, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { jsPDF } from 'jspdf';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from 'ngx-qrcode2';
import { interval, Observable } from 'rxjs';
import { CompanyServiceService } from 'src/app/services/admin/company/company.service';
import { BookingService } from 'src/app/services/system/booking.service';
import { BookinginfoService } from 'src/app/services/system/bookinginfo.service';
import { LoadingService } from 'src/app/services/system/loading.service';
import { Comment } from 'src/app/shared/interfaces/comment';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { NotificationService } from 'src/app/services/system/notification.service';



@Component({
  selector: 'app-bookinginfo',
  templateUrl: './bookinginfo.page.html',
  styleUrls: ['./bookinginfo.page.scss'],
})
export class BookinginfoPage implements OnInit {
  refresher
  currentDate = new Date().toISOString()
  date = new Date()
  userLoggedIn = JSON.parse(localStorage.getItem('user'))
  userId = this.userLoggedIn['id']
  activeTab : string = 'info'
  type : string
  status : string = ''
  companyName : ''
  senderName : ''
  senderPhone : ''
  receiverName : ''
  receiverPhone : ''
  driverName : ''
  driverPhone : ''
  startLocation : ''
  endLocation : ''

  bookingDetails : {}
  senderDetails : {}
  receiverDetails : {}
  driverDetails : {}
  user : {}
  ClientEmployeeConnectionClientId : {}
  ClientEmployeeConnection : any[] = []
  ClientCompany : {}

  bookingStatus : any[] = []
  EmployeeClientCompanies : any[] = []

  fined : boolean = false
  qrButton : boolean = true
  senderLoggedIn : boolean = false
  bookingId : 0
  boookingStatusId : 0
  cecId : 0
  bookingDate : ''
  elementType = null
  correctionLevel = null
  value = null
  myQR = null


  comment = ''
  arrComments: Comment[]

  data = null
  constructor(
    private alertController: AlertController,
    private barcodeScanner: BarcodeScanner,
    private companyService : CompanyServiceService,
    private router: Router,
    private route : ActivatedRoute,
    private bookingservice : BookingService,
    private bookingInfoService: BookinginfoService,
    private toast : ToastController,
    private routes: Router,
    private loader: LoadingService,
    private notification : NotificationService

    ) { }

  scanQr() {
    this.data = null;
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      this.data = barcodeData;
      this.notification.updateBookingStatusReceiver(this.bookingId).subscribe(res => {
        this.notification.sendNotification(this.ClientEmployeeConnection[0]['clientUserId'],this.ClientEmployeeConnection[0]['userId'],'Parcel successfully delivered!')
        this.scanSuccess()
      }, (err : HttpErrorResponse) => {
        if(err.status === 400) {
          this.scanFail()
        }
      })
      }).catch(err => {
        console.log('Error', err);
    });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.loader.simpleLoader()
    this.type = 'info'
    this.cecId = this.route.snapshot.params['cecid']
    this.bookingId = this.route.snapshot.params['bookid']
    this.boookingStatusId = this.route.snapshot.params['statusid']
    this.bookingDate = this.route.snapshot.params['Date']
    this.getComments()
    this.elementType = NgxQrcodeElementTypes.IMG
    this.correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH
    this.senderLoggedIn = false
    this.user = {}
    this.getLocalVariables()
    this.bookingservice.getBookingById(this.bookingId).subscribe(res => {
      this.bookingDetails = res
      if(this.bookingDetails[0]['senderUserId'] == this.user['id']) {
        this.senderLoggedIn = true
      }
    })
    if(this.user['role'] == 'client') {
      console.log('client')
      this.bookingservice.getClientCompanyByClientId(this.user['id']).subscribe(res => {
        this.ClientCompany = res
          this.companyService.getCompany(res[0]['companyID']).subscribe(res => {
            this.companyName = res['companyName']
            this.bookingservice.getClientEmployeeConnection(this.cecId).subscribe(res => {
              this.ClientEmployeeConnection.push(res)
              this.value = this.bookingId + ',' + this.ClientEmployeeConnection[0]['clientUserId'] + ',' + this.ClientEmployeeConnection[0]['userId']
              this.bookingservice.getUserDetails(res['userId']).subscribe(res => {
                if(this.senderLoggedIn == false) {
                  this.receiverName = res['firstname']
                  this.receiverName += ' '
                  this.receiverName += res['lastname']
                  this.receiverPhone = res['phoneNumber']
                  this.senderDetails = JSON.parse(localStorage.getItem('userDetails'))
                  this.senderName = this.senderDetails['firstname']
                  this.senderName += ' '
                  this.senderName += this.senderDetails['lastname']
                  this.senderPhone = this.senderDetails['phoneNumber']
                } if(this.senderLoggedIn == true) {
                  this.receiverName = res['firstname']
                  this.receiverName += ' '
                  this.receiverName += res['lastname']
                  this.receiverPhone = res['phoneNumber']
                  this.senderDetails = JSON.parse(localStorage.getItem('userDetails'))
                  this.senderName = this.senderDetails['firstname']
                  this.senderName += ' '
                  this.senderName += this.senderDetails['lastname']
                  this.senderPhone = this.senderDetails['phoneNumber']
                  this.qrButton = false
                }
                this.bookingservice.getDriverBookingDetails(this.bookingId).subscribe(res => {
                  this.bookingservice.getUserDetails(res[0]['driverUserId']).subscribe(res => {
                    this.driverDetails = {
                      firstname : res['firstname'],
                      lastname : res['lastname'],
                      phoneNumber : res['phoneNumber']
                    }
                    this.driverName = this.driverDetails['lastname']
                    this.driverName += ' '
                    this.driverName += this.driverDetails['firstname']
                    this.driverPhone = this.driverDetails['phoneNumber']
                  })
                })
                this.loader.dismissLoader()
              })
            })
          })
      })
    } else {
      this.bookingservice.getEmployeeClientCompanies(this.user['id']).subscribe(res => {
        this.EmployeeClientCompanies.push(res)
          this.bookingservice.getClientEmployeeConnection(this.cecId).subscribe(res => {
            this.ClientEmployeeConnection.push(res)
              this.value = this.bookingId + ',' + this.ClientEmployeeConnection[0]['clientUserId'] + ',' + this.ClientEmployeeConnection[0]['userId']
              this.ClientEmployeeConnectionClientId = this.ClientEmployeeConnection[0]
                this.bookingservice.getClientCompany(this.ClientEmployeeConnection[0]['clientUserId']).subscribe(res => {
                  this.companyService.getCompany(res[0]['companyId']).subscribe(res => {
                    this.companyName = res['companyName']
                      this.receiverDetails = {
                          clientUserId : this.ClientEmployeeConnectionClientId['clientUserId']
                          }
                          this.bookingservice.getUserDetails(this.receiverDetails['clientUserId']).subscribe(res => {
                            if(this.senderLoggedIn == false) {
                              this.receiverName = res['firstname']
                              this.receiverName += ' '
                              this.receiverName += res['lastname']
                              this.receiverPhone = res['phoneNumber']
                              this.senderDetails = JSON.parse(localStorage.getItem('userDetails'))
                              this.senderName = this.senderDetails['firstname']
                              this.senderName += ' '
                              this.senderName += this.senderDetails['lastname']
                              this.senderPhone = this.senderDetails['phoneNumber']
                            } if(this.senderLoggedIn == true) {
                              this.receiverName = res['firstname']
                              this.receiverName += ' '
                              this.receiverName += res['lastname']
                              this.receiverPhone = res['phoneNumber']
                              this.senderDetails = JSON.parse(localStorage.getItem('userDetails'))
                              this.senderName = this.senderDetails['firstname']
                              this.senderName += ' '
                              this.senderName += this.senderDetails['lastname']
                              this.senderPhone = this.senderDetails['phoneNumber']
                              this.qrButton = false
                            }
                              this.bookingservice.getDriverBookingDetails(this.bookingId).subscribe(res => {
                                this.bookingservice.getUserDetails(res[0]['driverUserId']).subscribe(res => {
                                  this.driverDetails = {
                                    firstname : res['firstname'],
                                    lastname : res['lastname'],
                                    phoneNumber : res['phoneNumber']
                                  }
                                  this.driverName = this.driverDetails['lastname']
                                  this.driverName += ' '
                                  this.driverName += this.driverDetails['firstname']
                                  this.driverPhone = this.driverDetails['phoneNumber']
                                })
                              })
                          })
                          this.loader.dismissLoader()
                  })
                })
          })
      })
    }

    this.bookingservice.getStatusbyId(this.boookingStatusId).subscribe(res => {
      this.bookingStatus.push(res)
      this.status = this.bookingStatus[0]['status']
      console.log(this.status)
      this.bookingservice.getTrackingByBookingId(this.bookingId).subscribe(res => {
        this.startLocation = res[0]['startLocation']
        this.endLocation = res[0]['endLocation']
      })
    })
  }

  getLocalVariables() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.cecId = this.route.snapshot.params['cecid']
    this.bookingId = this.route.snapshot.params['bookid']
    this.boookingStatusId = this.route.snapshot.params['statusid']
  }

  downloadQR() {
    var qrDate = this.date.toISOString()
    var newdate = qrDate.split('T')[0]
    this.myQR = document.getElementById('parent').childNodes[0].childNodes[0]['currentSrc']
    console.log(this.myQR)
    var doc = new jsPDF()
    doc.setFontSize(24)
    doc.text('Booking: #' + this.bookingId , 20, 10)
    doc.setFontSize(22)
    doc.text('Print out and place on the Parcel', 20, 20);
    doc.setFontSize(18)
    doc.text('Recipient Details:',20,30);
    doc.setFontSize(16)
    doc.text('Name: ' + this.receiverName  ,20,40);
    doc.text('Address: ' + this.endLocation ,20,50);
    doc.text('Delivery Date: ' + newdate ,20,60);
    doc.addImage(this.myQR, 'png', 43, 70, 120, 120);
    doc.save('Booking#' + this.bookingId.toString() + '_QR.pdf')
  }

  cancelBookingFineCheck() {
    this.date.setDate(this.date.getDate() + 1)
    this.currentDate = this.date.toISOString()
    this.bookingInfoService.getCanceledDate(this.bookingId).subscribe(res => {
      var bookedDate = res[0]
      if(this.currentDate.split('T')[0] < bookedDate['scheduledDate'].split('T')[0]){
        this.fined = false
        this.CancelBookingAlert()
      } else if (this.currentDate.split('T')[0] === bookedDate['scheduledDate'].split('T')[0] || this.currentDate.split('T')[0] > bookedDate['scheduledDate'].split('T')[0]) {
        this.fined = true
        this.CancelBookingFinedAlert()
      }
    })
  }

  cancelBooking(reason : string) {
    this.bookingservice.deleteBooking(this.bookingId, this.fined).subscribe(res => {
      if(res == null) {
        var myModal = document.getElementById('cancel-modal')
        myModal.setAttribute('is-open','false')
        var date = new Date()
        this.bookingservice.addBookingCancellation(this.bookingId, date, reason).subscribe(res => {
          console.log(res)
          this.routes.navigateByUrl('bookingview').then(() => {
            this.presentToastCancel()
          })
        })
      } else {
        this.BookingCancelFail()
      }
    })
  }

  async presentToastCancel() {
    const toast = await this.toast.create({
      header: 'Booking Cancelled Successfully',
      message: 'The Booking was Successfully cancelled',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }

  async CancelBookingAlert(){
    const alert = await this.alertController.create({
      subHeader : 'Cancel Booking',
      message : 'Are you sure you want to cancel the following booking?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {OpenModal()}
        }
      ]
    });
    await alert.present();
  }

  async CancelBookingFinedAlert(){
    const alert = await this.alertController.create({
      subHeader : 'Cancel Booking',
      message : 'The following booking is within 24 Hours of it' + `'s ` + 'intended delivery. A fine of a R100 will be applied to your account, Are you sure you still want to cancel? ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {OpenModal()}
        }
      ]
    });
    await alert.present();
  }

  tabChange(event){
    this.activeTab = event.target.value
    console.log(event.target.value)
    if(event.target.value == 'info') {
      var tabcom = document.getElementById('comment-tab')
      var tabinfo = document.getElementById('info-tab')
      tabinfo.style.color = 'White'
      tabcom.style.color = 'rgb(102,102,102)'
    } else {
      var tabcom = document.getElementById('comment-tab')
      var tabinfo = document.getElementById('info-tab')
      tabcom.style.color = 'White'
      tabinfo.style.color = 'rgb(102,102,102)'
    }
  }
  back(){
    this.router.navigateByUrl("bookingview")
  }

  fetchComments(res){
    this.arrComments = res
  }

  getComments(){
    this.bookingInfoService.getComments(this.bookingId).subscribe(
      (res) => {
        this.fetchComments(res)

      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          console.log("Get Comment err 200")
        }
    })

  }


  addComment(){
    if(this.comment == '' || this.comment == null || this.comment == ' '){
      alert("Please make sure you have a comment to send!")
    }
    else{
      var date = new Date()
      console.log(this.bookingId)
      var temp = this.bookingId.toString()

      var sendComment = {
        comment: this.comment,
        date: date,
        sender_Id: this.userId,
        booking_Id: parseInt(temp)
      }
      console.log(sendComment)
      this.bookingInfoService.addComments(sendComment).subscribe(
        (res) => {
          console.log(res)
        },
        (err: HttpErrorResponse) => {
          if(err.status === 200){
            this.getComments()
            this.activeTab = "comments"
            console.log("Add Comment Err 200")
            this.comment = ''
          }
      })
    }
  }

  deleteComment(comment){
    this.bookingInfoService.deleteComment(comment.commentId).subscribe(
      (res) => {
        console.log(res)
      },
      (err: HttpErrorResponse) => {
        if(err.status === 200){
          console.log("hit 200 delete")
        }
    })
    sleep(1000).then(() => {
      this.getComments()
    })
  }

  async presentAlert(comment){
    const confirmReset = await this.alertController.create({
      header: 'Delete Comment?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.deleteComment(comment)
          }
        }
      ]
    })
    await confirmReset.present()
  }

  async scanSuccess() {
    const toast = await this.toast.create({
      header: 'Parcel Scan Complete',
      message: 'Parcel successfully scanned and received!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 3000,
    });
    toast.present();
  }

  async scanFail() {
    const toast = await this.toast.create({
      header: 'Parcel Scan Failed',
      message: 'Parcel scan failed please try again!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 3000,
    });
    toast.present();
  }

  async BookingCancelFail() {
    const toast = await this.toast.create({
      header: 'Booking Cancellation Fail',
      message: 'Booking cancellation failed please try again!',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }

}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve,ms))
}

function OpenModal() {
  console.log('open')
  var myModal = document.getElementById('cancel-modal')
  myModal.setAttribute('is-open', 'false')
  myModal.setAttribute('is-open','true')
}
