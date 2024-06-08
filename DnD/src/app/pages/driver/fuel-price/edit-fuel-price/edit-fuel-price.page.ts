import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterPreloader } from '@angular/router';
import { ToastController, AlertController, ViewWillEnter } from '@ionic/angular';
import { FuelService } from 'src/app/services/fuel/fuel.service';

@Component({
  selector: 'app-edit-fuel-price',
  templateUrl: './edit-fuel-price.page.html',
  styleUrls: ['./edit-fuel-price.page.scss'],
})
export class EditFuelPricePage implements OnInit, ViewWillEnter {
  editFuelForm : FormGroup
  newFuel : {}
  fuelList : any[] = []
  fuelPriceList : {}
  FuelSlip
  constructor(private frmBuilder : FormBuilder, private fuelRepos : FuelService ,private toast : ToastController, private route : ActivatedRoute, private routes : Router, private alertController: AlertController) { }

  ngOnInit() {
    this.editFuelForm = this.frmBuilder.group({
          driverId : new FormControl(''),
          date : new FormControl(''),
          price : new FormControl('', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
          liters : new FormControl('', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
    })
  }

  ionViewWillEnter(){
    this.loadData()
  }


  loadData(){

   
    this.fuelRepos.getFuelPrice(this.route.snapshot.params['id']).subscribe(res =>{
      this.fuelPriceList = (res)
      this.FuelSlip = this.fuelPriceList['fuelSlip']
      console.log(this.FuelSlip)
      // const objURL = URL.createObjectURL(convertDataUrlToBlob(this.FuelSlip))
      // document.getElementById('Pic').src = this.FuelSlip
      document.getElementsByTagName('img')['Pic'].src = this.FuelSlip
      console.log(document.getElementsByTagName('img')['Pic'].src)
        this.fuelRepos.getFuelInfo().subscribe(res =>{
          this.fuelList = res

          for(var i = 0; i < this.fuelList.length; i++){
            if(this.fuelList[i].driverId == this.fuelPriceList['driverUserId']){
              var name = this.fuelList[i].firstName + ' ' + this.fuelList[i].lastName
              this.editFuelForm.setValue({
                driverId : name,
                date : this.fuelPriceList['timeStamp'].split('T')[0],
                price : 'R ' + (this.fuelPriceList['price']).toFixed(2),
                liters : this.fuelPriceList['litres'] + 'L',
              })  
            }
          }
        })
        
      })
  }

  async deleteToast() {
    const toast = await this.toast.create({
      header: 'Fuel Price Deleted',
      message: 'The Fuel Price was deleted successfully!',
      position: 'top',
      animated: true,
      color: 'primary',
      duration: 2000,
    });
    toast.present();
  }

  async deleteFuelAlert(){
    const alert = await this.alertController.create({
      header: 'Alert!',
      subHeader : 'Delete Fuel Price',
      message : 'Are you sure you want to delete the Fuel Price',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {  }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {this.deleteFuel()}
        }
      ]
      
    });
    await alert.present();
  
  }

  deleteFuel(){
    this.fuelRepos.deleteFuelPrice(this.fuelPriceList['fuelPriceId']).subscribe(res =>{
      console.log(res)
    },(err : HttpErrorResponse) => {
      if(err.status === 200) {
        this.routes.navigate(['/driver/fuel-price']).then(() => {
          this.deleteToast()
        }) 
      }
      })
   
  }
}

