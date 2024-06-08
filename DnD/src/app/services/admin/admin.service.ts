import { APP_ID, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {}

  backupDatabase() {
    return this.http.get(environment.apiUrl + 'Database/DatabaseBackup')
  }

  restoreDatabase(fileName) {
    return this.http.post(environment.apiUrl + 'Database/DatabaseRestore?databaseBak=' + fileName, fileName)
  }

  UpdateLogoutTimer(seconds){
    return this.http.put(environment.apiUrl + 'Setting/UpdateLogoutTimer?seconds=' + seconds, {response: 'text'})
  }

  GetLogoutTimer(){
    return this.http.get(environment.apiUrl + 'Setting/GetLogoutTimer')
  }

}
