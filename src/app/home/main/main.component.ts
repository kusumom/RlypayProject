import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Console } from 'console';
import { FinalSaveResp, TempValues, UserDetails } from 'src/app/Model/LoginResp';
import { LoginService } from 'src/app/service/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  //Table Array
  tableArray:Array<UserDetails>
//Create Form Group
Form:FormGroup;

TempValuesData:TempValues;
  constructor( public DataSaved:LoginService) { }

  ngOnInit() {
this.tableArray = new Array<UserDetails>();
this.TempValuesData = new TempValues();
    //Form Control Declare
    this.Form = new FormGroup({
      name:new FormControl(null,{validators:[Validators.required]}),
      pwd:new FormControl(null,{validators:[Validators.required]}),
      email:new FormControl(null,{validators:[Validators.required,Validators.email]}),
      mobile:new FormControl(null,{validators:[Validators.required]}),
      date:new FormControl(null,{validators:[Validators.required]}),
      role:new FormControl(null,{validators:[Validators.required]})
    })
  }

  //Add Data
  Add()
  {
   this.tableArray.push({
     name:this.Form.get('name').value,
     password:this.Form.get('pwd').value,
     email:this.Form.get('email').value,
     mobile:this.Form.get('mobile').value,
      date:this.Form.get('date').value,
      role:this.Form.get('role').value
   })
this.Form.reset();;
  // console.log(this.tableArray)

  }

  //Final Submit
  FinalSubmit()
  {
    this.TempValuesData = new TempValues();

    if(this.tableArray.length ===0)
    {
alert('Please Add Row First')
    }
    else{
       this.tableArray.forEach(Element =>{
         this.TempValuesData.TempName.push(Element.name);
         this.TempValuesData.TempEmail.push(Element.email);
         this.TempValuesData.TempMobile.push(Element.mobile);
         this.TempValuesData.TempRole.push(Element.role);
         this.TempValuesData.TemmpPass.push(Element.password);
         this.TempValuesData.TempDate.push(Element.date);
      })

var FormD= new FormData();
FormD.append('token',environment.LOGIN_TOKEN);
FormD.append('name[]', this.TempValuesData.TempName.toString())
FormD.append('email[]', this.TempValuesData.TempEmail.toString())
FormD.append('mobile[]', this.TempValuesData.TempMobile.toString())
FormD.append('role[]', this.TempValuesData.TempRole.toString())
FormD.append('password[]', this.TempValuesData.TemmpPass.toString())
FormD.append('date[]', this.TempValuesData.TempDate.toString())
FormD.append('validToken',environment.VALID_TOKEN)
this.DataSaved.LoginAuth(environment.ADD_DATA,FormD).subscribe((Response:FinalSaveResp) =>{
  if(Response.status)
  {
    alert(Response.message);
    this.Reset()
  }
  else
  {
    alert(Response.message)
  }
})
    }

  }

  Reset()
  {
    this.Form.reset();
    this.tableArray = new Array<UserDetails>();
this.TempValuesData = new TempValues();
  }

}
