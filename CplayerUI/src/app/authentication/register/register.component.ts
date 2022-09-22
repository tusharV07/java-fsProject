import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { User } from 'src/app/services/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myGroup!:FormGroup
  newUser: User = new User();
  constructor(private loginService:AuthServiceService, private router:Router) { }

  ngOnInit(): void {
    this.myGroup = new FormGroup({
      'firstName':new FormControl(),
      'lastName': new FormControl(),
      'email':new FormControl(),
      'password': new FormControl(),
      'userId':new FormControl()
  
      
    })
  }
 
 
  
  registerUser() {
    console.log("Register User data:", this.newUser);
    this.loginService.registerUser(this.newUser).subscribe(data => {
      console.log("User registered", data);
      this.router.navigate(['/login']);
    },
    error =>{
      alert("User Already exist");
    });
  }

 
 
}
