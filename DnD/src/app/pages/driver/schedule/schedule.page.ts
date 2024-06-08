import {Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit,} from '@angular/core';
import {startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours,} from 'date-fns';
import { scheduled, Subject } from 'rxjs';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, collapseAnimation,} from 'angular-calendar';
import { BookingService } from 'src/app/services/system/booking.service';
import {parseISO, format} from "date-fns";
import { UserService } from 'src/app/services/user/user.service';
import { DriverService } from 'src/app/services/driver/driver.service';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
  animations: [collapseAnimation]
})

export class SchedulePage implements OnInit {
  Schedule : any[] =[]
  allDriverSchedule : any[] = []
  driverSchedule : any[] =[]
  changeDriverSchedule : any[] =[]
  driverList : any[] =[]
  scheduleTime : {}
  scheduleDate : {}
  driver
  driverId

  change : boolean = false
  user = JSON.parse(localStorage.getItem("userDetails"))
  id = this.user.id
  userDetails = JSON.parse(localStorage.getItem("user"))

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

 
  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    
  ];

  activeDayIsOpen: boolean = false;

  constructor( 
    private bookingRepos : BookingService, 
    private userService : UserService, 
    private driverService: DriverService,
    private alertController : AlertController,
    private routes: Router,
    private platfrm : Platform,
    private toast : ToastController
    ) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        console.log('Cell Click')
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    console.log("Clicked Font text Event")
    this.generateMapsAlert()
  }

  addEvent(): void {
  
    
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  loadData(){
    this.driverService.GetAllDrivers().subscribe(res =>{
      this.driverList = res
    }) 

      this.bookingRepos.getScheduleDetails().subscribe(res =>{
        this.Schedule = res
        console.log(this.Schedule)
        this.bookingRepos.getDriverScheduleDetails(this.id).subscribe(res =>{
          this.driverSchedule = res
          var role = this.userDetails['role']
          if( role == "driver"){
           
            for(var i = 0; i < this.driverSchedule.length ; i++){
              var date = format(parseISO(this.driverSchedule[i].date), "dd MMMM yyyy HH:mm:ss")
              this.events = [
               
                ...this.events,
                {
                  title: this.driverSchedule[i].firstname + ' ' + this.driverSchedule[i].lastname + ' has a delivery with vehicle Registration Number: ' + this.driverSchedule[i].regNum ,
                  start: startOfDay(parseISO(this.driverSchedule[i].date)),
                  color: colors.red,
                  draggable: false,
                  allDay: true,
                  resizable: {
                    beforeStart: true,
                    afterEnd: true,
                  },
                },
              ];
            }
          }
          else if(role != 'driver'){
            for(var i = 0; i < this.Schedule.length ; i++){
             
             var date = format(parseISO(this.Schedule[i].date), "dd MMMM yyyy")
              this.events = [
               
                ...this.events,
                {
                  title: this.Schedule[i].firstname + ' ' + this.Schedule[i].lastname + ' has a delivery with vehicle RegistrationNumber: ' + this.Schedule[i].regNum ,
                  start: startOfDay(parseISO(this.Schedule[i].date)),
                  end: endOfDay(parseISO(this.Schedule[i].date)),
                  color: colors.red,
                  draggable: false,
                  
                  resizable: {
                    beforeStart: true,
                    afterEnd: true,
                  },
                },
              ];
            }
          }
      
     
      })
    })
  }

  

  ngOnInit() {
    this.loadData()
    this.addEvent()
  }

  async generateMapsAlert(){
    const alert = await this.alertController.create({
      subHeader : 'Generate Map Directions',
      message : 'Are you sure you want to generate the map directions for the deliveries on the selected day?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.generateMaps()}
        }
      ] 
    });
    await alert.present();
  }

  generateMaps() {
    this.viewDate.getDate()
    var onlyDay = this.viewDate.getDate()
    var onlyMonth = this.viewDate.getMonth() + 1
    console.log(onlyMonth)
    var onlyYear = this.viewDate.getFullYear()
    if(onlyMonth < 10) {
      onlyMonth.toString()
      var fullDate = onlyYear + '-0' + onlyMonth + '-0' + onlyDay
    } else {
      var fullDate = onlyYear + '-' + onlyMonth + '-' + onlyDay
    }
    var currentDate = new Date().toISOString().split('T')[0]
    console.log(fullDate)
    console.log(currentDate)
    if(fullDate > currentDate) {
      alert('Cannot generate maps before delivery date!')
    } else if(this.platfrm.is('desktop')) {
      this.generateMapsError()
    } else {
      this.routes.navigate(['driver/schedule-maps',fullDate])
    }
  }

  async generateMapsError() {
    const toast = await this.toast.create({
      header: 'Not Allowed',
      message: 'As a driver you can only generate maps for your deliveries on your mobile device!',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 4000,
    });
    toast.present();
  }
}
