import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProjectService } from 'src/app/services/project/project.service';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { Router } from '@angular/router';
import { Project } from 'src/app/shared/project';
import { LoadingService } from 'src/app/services/system/loading.service';
@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
})
export class ProjectPage implements OnInit, ViewWillEnter {

  searchTerm : string;
  searchResults = []
  constructor(private projectRepos : ProjectService, private frmBuilder : FormBuilder, private toast: ToastController, private router: Router, private loadingService : LoadingService ) { }
  projectList : Project[] = []
  myForm: FormGroup
  
  ngOnInit() {
    this.myForm = this.frmBuilder.group({
      projectName : new FormControl(''),
      description : new FormControl('')
    })
    
  }

  ionViewWillEnter(){
    this.getProjects()
  }

  getProjects(){

    this.loadingService.simpleLoader()
       this.projectRepos.fetchProjects().subscribe(res =>{
         console.log(res)
        if(res){
          this.projectList = res;
          this.loadingService.dismissLoader()
        }
      }) 
    }

    
}
