import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CompanyServiceService } from 'src/app/services/admin/company/company.service';
import { ProjectService } from 'src/app/services/project/project.service';
import { Project } from 'src/app/shared/project';


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.page.html',
  styleUrls: ['./view-project.page.scss'],
})
export class ViewProjectPage implements OnInit {

  viewProject : any[] = []
  companyNames : any[] = []
  constructor( private route : ActivatedRoute ,private router: Router ,private projectRepos : ProjectService, 
     private companyRepos : CompanyServiceService, private alertController: AlertController,
     private toast : ToastController) { }

  ngOnInit() {
    this.onLoadProject()
    
    
  }

  onLoadProject(){
    this.projectRepos.getProject(this.route.snapshot.params['id']).subscribe(res =>{
      this.viewProject.push(res)
      var compID = this.viewProject[0]['companyId']
      console.log(this.viewProject)
      this.companyRepos.getCompany(compID).subscribe(res =>{
        this.companyNames.push(res)
        console.log(this.companyNames)
      })
    })

  }

  async presentAlertComplete(id){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Complete Project',
      message : 'Are you sure you want to Complete the Project.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {this.delProject(id)}
        }
      ]
      
    });
    await alert.present();
  }

  delProject(id){
    this.projectRepos.deleteProject(id).subscribe()
     this.router.navigate(['/admin/project']).then(() => {
      this.presentToast()
    })
  }

  async presentToast() {
    const toast = await this.toast.create({
      header: 'Project Completed',
      message: 'Project completed successfully!',
      position: 'top',
      animated: true,
      color: 'success',
      duration: 2000,
    });
    toast.present();
  }
 
}
