import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements ViewWillEnter {
  type : string = 'home'
  activeTab : string = 'home'
  pages : any[] = []
  searchArray : any[] = []
  searchTerm : string = ''
  index : number
  links : {} = [
    {link : 'home'},
    {link : 'register'},
    {link : 'passandOTP'},
    {link : 'passandOTP'},
    {link : 'profile'},
    {link : 'editprofile'},
    {link : 'resetpassword'},
    {link : 'booking'},
    {link : 'create-booking'},
    {link : 'bookingview'},
    {link : 'bookinginfo'},
    {link : 'transport-info'},
    {link : 'tracking'},
    {link : 'management'},
    {link : 'reports'},
    {link : 'event'},
    {link : 'add-event'},
    {link : 'delete-event'},
    {link : 'edit-event'},
    {link : 'view-event'},
    {link : 'user-main'},
    {link : 'assign-user-role'},
    {link : 'edit-user-profile'},
    {link : 'employee'},
    {link : 'empclientregister'},
    {link : 'driver'},
    {link : 'schedule'},
    {link : 'schedule'},
    {link : 'post-inspection'},
    {link : 'add-incident'},
    {link : 'fuel-price-main'},
    {link : 'incident-main'},
    {link : 'client-dashboards'},
    {link : 'client-registration'},
    {link : 'vehicle-main'},
    {link : 'add-vehicle'},
    {link : 'edit-vehicle'},
    {link : 'maintenance-main'},
    {link : 'add-maintenance'},
    {link : 'delete-maintenance'},
    {link : 'add-mechanic'},
    {link : 'man-main'},
    {link : 'add-manufacturer'},
    {link : 'edit-manufacturer'},
    {link : 'add-model'},
    {link : 'edit-model'},
    {link : 'vehicle-class-main'},
    {link : 'admin-main'},
    {link : 'add-driver-rating'},
    {link : 'edit-driver-rating'},
    {link : 'add-rating'},
    {link : 'edit-rating'},
    {link : 'lisence'},
    {link : 'add-license-code'},
    {link : 'edit-license-code'},
    {link : 'add-incident-status'},
    {link : 'edit-incident-status'},
    {link : 'configure-parcel-confident'},
    {link : 'configure-parcel-priority'},
    {link : 'configure-parcel-type'},
    {link : 'configure-settings'},
    {link : 'company-main'},
    {link : 'add-company'},
    {link : 'edit-company'},
    {link : 'view-company'},
    {link : 'project-main'},
    {link : 'add-project'},
    {link : 'view-project'}
  ]
  tempArray : any[] = []
  constructor(private route : ActivatedRoute) { }

  ionViewWillEnter() {
    if(this.route.snapshot.params['id'] == 'undefined') {
      this.activeTab = 'home'
    } else {
      this.activeTab = this.route.snapshot.params['id'];
    }
    this.pages = []
    var primary = document.getElementsByTagName('ion-accordion')
    for(var i = 0; i < primary.length; i++) {
      var children = primary[i].childNodes
      for(var x = 1; x < children.length; x++) {
        var subChildren = children[x].childNodes[0].textContent
        this.pages.push(subChildren)
      }
    }
    for(var i = 0; i < this.pages.length; i++) {
      this.tempArray.push({
        name : this.pages[i],
        link : this.links[i]['link']
      })
    }
  }

  navigate(link) {
    this.activeTab = link
  }

  handleChange(event) {
    var result
    this.searchArray = []
    this.searchTerm = event['detail']['value']
    for(var i = 0; i < this.tempArray.length; i++) {
      var singleArr = this.tempArray.map(value => (value.name).toLowerCase())
      result = singleArr.filter(element => element.includes((this.searchTerm).toLowerCase()));
    }
    for(var i = 0; i < result.length; i++) {
      this.searchArray.push(this.tempArray[singleArr.indexOf(result[i])])
    }
    if(this.searchTerm == '') {
      this.index = 0
    }
  }
}
