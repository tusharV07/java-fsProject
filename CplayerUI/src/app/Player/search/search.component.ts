import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  ActivatedRoute, Router } from '@angular/router';
import { CricPlayer } from 'src/app/cric-player';
import { CplayerServiceService } from 'src/app/services/cplayer-service.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { PlayerDetailsComponent } from '../player-details/player-details.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class SearchComponent implements OnInit {
  searchKey:any=[];
  PlayersDetails:any=[];
  Detailes:any=[];
  DetailsData:any=[];
  searchName!:string
  id:String=""
   statusCode!: number;
  errorStatus: string="";
  public cplayer: CricPlayer={} as CricPlayer;
  constructor(public dialog: MatDialog,private PlayerService:CplayerServiceService,private router:Router,private route: ActivatedRoute,private snackbar:MatSnackBar,private CPlayerListService: CplayerServiceService,private navbarComponent:NavbarComponent) {
    
   }

  ngOnInit(): void {
    
 
  console.log("called")
   this.Detailes=this.navbarComponent.DetailsData;
     console.log(this.Detailes)
 
  }
  getDetails(index:String)
  { 

    console.log("index is "+index);
      this.id=index;
 
  const dialogRef = this.dialog.open(PlayerDetailsComponent, {
   height: '75vh',
   width: '60vw',
    disableClose:true,
   data:this.id
   
  })

  }




  onSearching(){
    this.PlayerService.getSearchPlayer(this.searchName).subscribe((data:any)=>{
      console.log(data)
      this.Detailes = data.data;
    })
  }
  addToFavorite(element:any)
  {

 this.cplayer.pid=element.id;
 this.cplayer.name=element.name;
 this.cplayer.country=element.country;
 console.log("---------------------------------------")
 console.log( this.cplayer)
 this.CPlayerListService. addPlayerToFavoriteList(this.cplayer).subscribe(
   data => {

     console.log("data is ",data);
     this.snackbar.open("Added to Favorites",'',{
       duration:4000,
       verticalPosition:'top'
     })
     }, error => {

      this.errorStatus = `${error.status}`;
      const errorMsg = `${error.error.message}`;
      this.statusCode = parseInt(this.errorStatus, 10);
      console.log("error messages are")
      console.log(this.errorStatus)
      console.log(errorMsg)
      console.log( this.statusCode)
      alert(errorMsg)
    })
 
  
 }

}