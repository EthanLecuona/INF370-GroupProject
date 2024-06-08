import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from 'src/app/shared/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects :  {}
  viewProject : Project[] = []
 
  constructor(public httpClient : HttpClient, private sqlite: SQLite, sqlPort: SQLitePorter) { 
  
  }

  private loadData(res : Response){
    let data = res
    return data || {}
  }
  fetchProjects() : Observable<any>{
    return this.httpClient.get(environment.apiUrl + 'Projects/getProjects').pipe(map(this.loadData))
  }

  sendProject(newProject){
    return this.httpClient.post(environment.apiUrl + 'Projects/createProject',  newProject)
  }
 
  getProject(id){
    return this.httpClient.get(environment.apiUrl + 'Projects/getProjectName?id=' + id).pipe(map(this.loadData));
  }

  deleteProject(id){
     return this.httpClient.delete(environment.apiUrl + 'Projects/deleteProject?id=' + id)
  }
}
