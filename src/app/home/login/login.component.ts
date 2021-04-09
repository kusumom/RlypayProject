import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResp, OtpVerifyResp } from 'src/app/Model/LoginResp';
import { LoginService } from 'src/app/service/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Our Form Group
Form:FormGroup;


  constructor( public login:LoginService,public router:Router) { }

  ngOnInit() {

    //Declare Form Controls
    this.Form = new FormGroup({
      userid: new FormControl(null,{validators:[Validators.required]}),
      pwd: new FormControl(null,{validators:[Validators.required]})
    })
  }
  save(){
    //Declare Form Data Object
    var FormD=new FormData();
    FormD.append('username',this.Form.get('userid').value)
    FormD.append('password',this.Form.get('pwd').value)
    FormD.append('token',environment.LOGIN_TOKEN)

   this.login.LoginAuth(environment.LOGIN_API,FormD).subscribe((Response:LoginResp) =>{
     if(Response.status)
     {
      
       var promtBox = prompt(Response.message,environment.OTP)
       console.log(promtBox)
       if(promtBox != null || promtBox != undefined || promtBox !='')
       {
        var FormDataOtp = new FormData();
        FormDataOtp.append('otp',promtBox);
        FormDataOtp.append('authToken',Response.authToken);
        FormDataOtp.append('token',environment.LOGIN_TOKEN);
        this.login.LoginAuth(environment.OTP_VERIFY,FormDataOtp).subscribe((Res:OtpVerifyResp) =>{
          if(Res.status)
          {
          this.router.navigateByUrl('/main')
          }
          else
          {
           alert(Res.message);
           this.Form.reset();
          }
        })
       }
       else{
          alert('Invalid Otp');


       }
    

     }
     else{
       alert(Response.message);
       this.Form.reset();
     }

   })
  }
}
