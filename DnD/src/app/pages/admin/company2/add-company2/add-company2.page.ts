import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CompanyServiceService } from 'src/app/services/admin/company/company.service';
import { Company } from 'src/app/shared/interfaces/company';

@Component({
  selector: 'app-add-company2',
  templateUrl: './add-company2.page.html',
  styleUrls: ['./add-company2.page.scss'],
})
export class AddCompany2Page implements OnInit {

  addCompanyForm : FormGroup

  constructor(private router: Router, private companyRepos : CompanyServiceService , private frmBuilder: FormBuilder, private toast : ToastController, private alertController : AlertController) { }

  ngOnInit() {
    this.addCompanyForm = this.frmBuilder.group({
      companyName : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      streetName : new FormControl('', [Validators.required, Validators.minLength(4) , Validators.pattern('^[a-zA-Z _]*$')]),
      streetNumber : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(8) , Validators.pattern('[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]')]),
      suburb : new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$')]),
      postalCode : new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9]')]),
      city : new FormControl('', [Validators.required, Validators.minLength(4), Validators.pattern('^[a-zA-Z\s]*$')]),
    })
  }

  addComp(){
    this.companyRepos.addCompany(this.addCompanyForm.value).subscribe(res => {
      if (res == null)
      {
        this.companyAddSuccess().then(() => {
          this.router.navigateByUrl('admin/company')
        })
      }
    }, (err : HttpErrorResponse) => {
      if (err.status === 400)
      {
        this.companyAddFail()
      }else if (err.status === 403)
      {
        alert('Company already exists')
      }
    })
  }

  async presentAddCompanyAlert(){
    const confirmReset = await this.alertController.create({
      header: 'Confirm Company Details',
      message: 'Are you sure that the provided company details are correct?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.addComp()}
        }
      ]
    })
    await confirmReset.present()
  }

  async companyAddSuccess() {
    const toast = await this.toast.create({
      header: 'Company Added',
      message: 'Company profile successfully added.',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 3000,
    });
    toast.present();
  }

  async companyAddFail() {
    const toast = await this.toast.create({
      header: 'Company Add Failed',
      message: 'There was an error adding the new company profile!',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }
}
