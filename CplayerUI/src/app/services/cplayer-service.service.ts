import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { CricPlayer } from '../cric-player';
export const USER_NAME = "username";


@Injectable({
  providedIn: 'root'
})
export class CplayerServiceService {

  cplayerApi: String;
  apiKey: String;
  playerInfo:string;
  favouritEndPoint: string;
  searchInfo:string; 
  recommendEndPoint: string;
  username: string="";


  constructor(private http: HttpClient) {
    this.cplayerApi = 'https://api.cricapi.com/v1/players?';
  this.apiKey = 'apikey=bb1861a3-6be3-4894-b8ac-b83b9183899c';
    this.playerInfo='https://api.cricapi.com/v1/players_info?';
     this.searchInfo = "https://api.cricapi.com/v1/players?apikey=bb1861a3-6be3-4894-b8ac-b83b9183899c&offset=0&search=";
    this.favouritEndPoint= 'http://localhost:8083/api/v1/favoriteservice';
    this.recommendEndPoint= 'http://localhost:8082/api/v1/player/recommend/8';
}
getAllPlayerList(pid:String): Observable<any> {
    
  this.apiKey = 'apikey=bb1861a3-6be3-4894-b8ac-b83b9183899c&id='+pid;

  // 80d32d2e-7744-4c46-b869-cf961874bada
  // 7bbe5e7b-1d77-4a37-8b21-1572fb2e4307
  // dafb1959-a56f-4fe2-bb9c-b5d4202d3d13
  const url = `${this.playerInfo}${this.apiKey}`;
  return this.http.get(url);
}

getPlayerDetails(pid:String):Observable<any> 
{
 
  this.apiKey = 'apikey=bb1861a3-6be3-4894-b8ac-b83b9183899c&id='+pid;
  const url = `${this.playerInfo}${this.apiKey}`;
  return this.http.get(url);
}
addPlayerToFavoriteList(cPlayer:CricPlayer) 
{
  console.log("caled");
  this.username =  sessionStorage.getItem(USER_NAME) || '{}';
 const url = this.favouritEndPoint + "/user/" + this.username + "/player";
 console.log("sent.........")
 console.log(url);
 console.log(cPlayer)
 console.log(cPlayer.pid)
return this.http.post(url, cPlayer)
}
getFavoriteList(): Observable<CricPlayer[]> {
this.username = sessionStorage.getItem(USER_NAME) || '{}';
const url = this.favouritEndPoint + "/user/" + this.username + "/getplayerList";
return this.http.get<CricPlayer[]>(url);

} 
deleteFromFavoriteList(cPlayer:CricPlayer)
{
this.username = sessionStorage.getItem(USER_NAME) || '{}';
const url = this.favouritEndPoint + "/user/" + this.username + "/Deleteplayer/"+cPlayer.pid;
return this.http.delete(url);
}

  getSearchPlayer(searchKey:any){
  const url = `${this.searchInfo}${searchKey}`;
  return this.http.get(url);
  }

  getRecommendPlayerList(){
    const headerDict = {
      'Accept': 'application/json, text/plain, */*',
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json',
    }
    const headers = new HttpHeaders(headerDict);
    return this.http.get(`${this.recommendEndPoint}`, {headers});
  }



}
