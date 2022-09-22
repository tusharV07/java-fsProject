import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table';
import {CplayerServiceService} from 'src/app/services/cplayer-service.service';
import {Router} from '@angular/router';
import { PlayerDetailsComponent } from 'src/app/Player/player-details/player-details.component';
import { MatDialog } from '@angular/material/dialog';
import { CricPlayer } from 'src/app/cric-player';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-playerlist',
  templateUrl: './playerlist.component.html',
  styleUrls: ['./playerlist.component.css']
})
export class PlayerlistComponent implements OnInit {
 
  columnsToDisplay:string[] = ['name','country','actions'];
  
  public CPlayersList:any=[]
  public cplayer: CricPlayer={} as CricPlayer;
  message:string="hellolo"
  dataSource:any;
   showSpinner:boolean=true;
   public check: String='1';
   public id:any;
   statusCode!: number;
   errorStatus: string="";
   public CricketPlayers:string[] = ["b58ee4c9-8260-4013-af8d-26b67ef713c3",
   "b8de1138-caff-4621-95b9-3bdeffa6fc7e",
   "546acd20-8197-40dc-b895-89eb3c5cdf94",
   "00c5c881-c31d-4b1a-953c-2f941d54848e",
   "34802a7c-5b74-46e4-adbd-472238275b94",
   "27415ccd-8cab-401b-9383-b3d2b85240f9",
   "c6c92ab4-043d-46d7-9625-0c969ba5dfd6","851d416f-f7e0-439d-8f76-e0af3f8ade05",
   "90bf31a8-01e3-4cc2-89f6-87eafe7b409a","9f5571ad-e75d-48bc-945c-d49577316372",
   "1aa70d36-0d67-4dd3-8319-b8882dc1a9e5","ad68e46b-fb14-432e-b2d9-9acecb84c4d6",
   "228d880f-303b-44a7-9cdd-89db04bca8f5","fae967d9-f1a4-4784-83dc-f48ba4d4db18",
   "e9f47702-80c0-4a8f-91ff-61d391624ae6","92cfec44-044e-4cf3-a432-cefde13adb08",
   "d52b5bc6-aa3a-49f5-9984-02905957603d","a8894c4f-cd36-447b-9702-c80123cbb571",
   "52d67052-f416-43c1-adcf-c7ae87d9af56","9889239a-33ed-4bd7-97c5-c1c6ea32f4e6",
   "dbcda444-730f-4cee-8b75-509e41c906c8","00a6f5eb-8db8-4ad1-b43a-7c7b0bb66b0a",
   "4a6c1e84-60c3-41c2-bf37-1b734763a558","d55fba67-a80c-4db9-b66c-9e8a552a2201",
   "d8ccbab6-457f-42e3-b2ce-5ab7ea903a4b"
   ];
  
   @ViewChild(MatPaginator) paginator: MatPaginator |undefined;
   @ViewChild(MatSort) sort: MatSort |undefined;
   constructor(private CPlayerListService: CplayerServiceService,private router:Router,public dialog: MatDialog,private snackbar:MatSnackBar) { }
 
   ngOnInit(): void {
     for(let i=0;i<25;i++)
     {
      
     this.CPlayerListService. getAllPlayerList(this.CricketPlayers[i]).subscribe(data=>
       {
         if(i<24)
         {
          // console.log(data)
       this.CPlayersList.push(data.data);
      // console.log(i);
       //console.log(this.CPlayersList)
         }
       else
       {
        this.CPlayersList.push(data.data);
       this.getList();
       }
    
   });
  
  }
}
getList()
{
  this.showSpinner=false;
  this.check='0';
  //console.log("the total players list is")
   //  console.log(this.CPlayersList.length);
     this.dataSource=new MatTableDataSource<any>(this.CPlayersList);
     this.dataSource.paginator=this.paginator;
     this.dataSource.sort=this.sort;
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