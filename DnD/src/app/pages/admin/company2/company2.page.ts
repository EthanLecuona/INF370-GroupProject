import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { CompanyServiceService } from 'src/app/services/admin/company/company.service';
import { LoadingService } from 'src/app/services/system/loading.service';
import { Company } from 'src/app/shared/interfaces/company';

@Component({
  selector: 'app-company2',
  templateUrl: './company2.page.html',
  styleUrls: ['./company2.page.scss'],
})
export class Company2Page implements ViewWillEnter {

  searchTerm : string
  companyList : any[] = []

  constructor(
    private companyRepos : CompanyServiceService, 
    private frmBuilder : FormBuilder, 
    private route : Router,
    private loader : LoadingService
    ) { }

  ionViewWillEnter(): void {
    this.loader.simpleLoader()
    this.companyList = []
    this.companyRepos.getAllCompanies().subscribe(res => {
      for(var i = 0; i < res.length; i++) {
        if(res[i]['activated'] == true) {
          this.companyList.push(res[i])
          this.loader.dismissLoader()
        }
      }
    })
  }
}
