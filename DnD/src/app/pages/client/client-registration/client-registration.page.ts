import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CompanyServiceService } from 'src/app/services/admin/company/company.service';
import { LoadingService } from 'src/app/services/system/loading.service';
import { LoginService } from 'src/app/services/system/login.service'

@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.page.html',
  styleUrls: ['./client-registration.page.scss'],
})
export class ClientRegistrationPage implements OnInit {

  clientRegister : FormGroup
  companies : any[] = []
  titles : any[] = []
  activeCompanies : any[] = []
  clientUserId : {} = {}
  employeeUserId : {}
  clientEmail : string
  CompanyIndex : number

  constructor(
    private router: Router, 
    private frmBuilder : FormBuilder, 
    private loginservice : LoginService, 
    private companyRepos : CompanyServiceService, 
    private route: ActivatedRoute,
    private toast : ToastController,
    private loader : LoadingService
    ) { }

  ngOnInit() {
    this.employeeUserId = this.route.snapshot.params['id']
    this.clientEmail = this.route.snapshot.params['email']
    this.CompanyIndex = this.route.snapshot.params['company']

    this.companyRepos.getAllCompanies().subscribe((res : []) => {
      this.companies = res
      for(var i = 0 ; i < res.length; i++) {
        if(this.companies[i]['activated'] == true) {
          this.activeCompanies.push(this.companies[i])
          console.log(this.activeCompanies)
        }
      }
      this.clientRegister.controls['company'].setValue(this.activeCompanies[this.CompanyIndex]['companyName'])

    })

    this.loginservice.getAllTitles().subscribe(res => {
      this.titles = res
    })

    this.clientRegister = this.frmBuilder.group({
      title : new FormControl('', Validators.required),
      firstname : new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      lastname : new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
      phoneNumber : new FormControl('', [Validators.required, Validators.pattern('^\\+?[0-9][0-9]{9}$')]),
      email : new FormControl('', [Validators.required, Validators.email]),
      password : new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      passwordRepeat : new FormControl('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      company : new FormControl('', Validators.required)
    })
    this.clientRegister.controls['email'].setValue(this.clientEmail)
  }

  addClient() {
    this.loader.simpleLoader()
    var newClient = {
      userPassword : this.clientRegister.controls['password'].value,
      userEmail : this.clientRegister.controls['email'].value,
      phoneNumber : this.clientRegister.controls['phoneNumber'].value,
      firstname : this.clientRegister.controls['firstname'].value,
      lastname : this.clientRegister.controls['lastname'].value
    }

    if(this.clientRegister.controls['password'].value == this.clientRegister.controls['passwordRepeat'].value) {
      this.loginservice.clientRegister(newClient).subscribe(res => {
        this.clientUserId = res
        this.addClientInformation()
      }, (err : HttpErrorResponse) => {
        if(err.status === 500) {
          this.RegisterFail()
        } else if(err.status === 403) {
          this.RegisterExists().then(() => {
            this.loader.dismissLoader()
          })
        }
      })
    } else {
      alert('The entered passwords do not match!')
    }
  }

  addClientInformation() {
    var clientInfo = {
      clientUser_ID : this.clientUserId['id'],
      title_ID : JSON.parse((this.clientRegister.controls['title'].value).split(",",1)[0]),
      company_ID : this.companies[this.CompanyIndex]['companyId']
    }
    console.log(clientInfo)
    this.loginservice.addClientInformation(clientInfo).subscribe(res => {
      console.log(res)
      this.addCEC()
    }, (err : HttpErrorResponse) => {
      if(err.status === 400) {
        this.RegisterFail()
        this.loader.dismissLoader()
      } else if(err.status === 200) {
        this.addCEC()
      }
    })
  }

  addCEC() {
    var CEC = {
      User_ID : this.employeeUserId,
      ClientUser_ID : this.clientUserId['id']
    }
    this.loginservice.addClientEmployeeConnection(CEC).subscribe(res => {
      console.log(res)
    }, (err : HttpErrorResponse) => {
      if(err.status === 400) {
        this.RegisterFail()
      } else if(err.status === 200) { 
        this.loader.dismissLoader()
        this.RegisterSuccess().then(() => {
          this.router.navigateByUrl('home/login')
        })
      }
    }) 
  }

  async RegisterSuccess() {
    const toast = await this.toast.create({
      header: 'Registration Successful',
      message: 'You have successfully registered!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 3000,
    });
    toast.present();
  }

  async RegisterFail() {
    const toast = await this.toast.create({
      header: 'Registration not complete',
      message: 'Registration could not be completed!',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }

  async RegisterExists() {
    const toast = await this.toast.create({
      header: 'Registration not complete',
      message: 'It Looks like the account you are trying to register already exists!',
      position: 'top',
      animated: true,
      color: 'danger',
      duration: 3000,
    });
    toast.present();
  }
}
