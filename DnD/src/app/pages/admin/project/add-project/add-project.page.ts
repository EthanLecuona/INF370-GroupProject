import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/shared/project';
import { ProjectService } from 'src/app/services/project/project.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'; 
import { AlertController, ToastController, ViewWillEnter } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/shared/interfaces/company';
import { CompanyServiceService } from 'src/app/services/admin/company/company.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.page.html',
  styleUrls: ['./add-project.page.scss'],
})
export class AddProjectPage implements OnInit, ViewWillEnter {
  addProjectForm: FormGroup
  addProjectList : Project[] = []
  companyNames  : Company[] = []
  compNames : any[] = []
  //compID = ""
  addProject : {}
  compID : any[] = []
  activeCompanies : any[] = []
  constructor(
    private projectRepos : ProjectService, 
    private companyRepos: CompanyServiceService,
     private frmBuilder : FormBuilder, 
     private toast: ToastController, 
     private router: ActivatedRoute,
     private alertController: AlertController, 
     private route : Router
     ) { }

  ngOnInit() {
    this.addProjectForm = this.frmBuilder.group({
     
      description : new FormControl('',[Validators.required, Validators.maxLength(50)]),
      companyId : new FormControl('',Validators.required),
      projectName : new FormControl('', Validators.required)
    })
  }

  ionViewWillEnter() {
    this.getCompanyNames()
  }

  addProj(){

      this.addProject = {
      ProjectName : this.addProjectForm.controls['projectName'].value,
      Description : this.addProjectForm.controls['description'].value,
      CompanyId   : this.addProjectForm.controls['companyId'].value
    }
   
    this.projectRepos.sendProject(this.addProject).subscribe(res => {

    }, (err : HttpErrorResponse) => {
      if(err.status === 200) {
        this.route.navigate(['/admin/project']).then(() => {
          this.presentToast()
        })
      } else if (err.status === 400) {
        alert('Could not add the project!')
      } else if (err.status === 403){
        alert('Project already exists')
      }
    })

  }

  getCompanyNames(){
    return this.companyRepos.getAllCompanies().subscribe(res =>{
        this.companyNames = res
        console.log(this.companyNames)
        for( var i = 0; i < this.companyNames.length; i++) {
          if(this.companyNames[i]['activated'] == true) {
            this.activeCompanies.push(this.companyNames[i])
            console.log(this.activeCompanies)
          }
        }
    })
  }

  async presentAlertAdd(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Complete Project',
      message : 'Are you sure you want to add the Project.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.addProj()}
        }
      ]
      
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Project Added',
      message: 'Project completed successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
}
