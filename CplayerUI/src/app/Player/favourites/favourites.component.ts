import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CricPlayer } from 'src/app/cric-player';
import { CplayerServiceService } from 'src/app/services/cplayer-service.service';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table';
import { PlayerlistComponent } from '../playerlist/playerlist.component';
import { PlayerDetailsComponent } from '../player-details/player-details.component';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})

export class FavouritesComponent implements OnInit {
  columnsToDisplay:string[] = ['name','country','actions'];
  cplayers: Array<CricPlayer>=[];
  dataSource:any;
  statusCode!: number;
  errorStatus: string="";
   showSpinner:boolean=true;
   public check: String='1';
   public id:any;
   public cplayer: CricPlayer={} as CricPlayer;
  @ViewChild(MatPaginator) paginator: MatPaginator |undefined;
  @ViewChild(MatSort) sort: MatSort |undefined;

 constructor(private cplayerService: CplayerServiceService ,private router:Router,public dialog: MatDialog,public location:Location) { }
 

  ngOnInit(): void {
    this.cplayerService.getFavoriteList().subscribe(data => {
      this.cplayers = data;
      console.log(this.cplayers)
      
      this.showSpinner=false;
  this.check='0';
  //console.log("the total players list is")
   //  console.log(this.CPlayersList.length);
     this.dataSource=new MatTableDataSource<any>(this.cplayers);
     this.dataSource.paginator=this.paginator;
     this.dataSource.sort=this.sort;
      
    },
    error => {
       console.log("emtered")
      this.errorStatus = `${error.status}`;
      const errorMsg = `${error.error.message}`;
      this.statusCode = parseInt(this.errorStatus, 10);
      console.log(this.errorStatus)
      console.log(errorMsg)
      console.log( this.statusCode)
      // alert(errorMsg)
      this.router.navigate(['/']);

    });
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
  RemoveFromFavorites(element:any)
  {
    this.cplayer.pid=element.pid;
 this.cplayer.name=element.name;
 this.cplayer.country=element.country;
 console.log(this.cplayer)
     this.cplayerService.deleteFromFavoriteList(this.cplayer).subscribe(data => {
     console.log(data)
     alert("Removed From Favourites")

    window.location.reload();
     
  })
}
 

}
