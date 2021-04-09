import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class LoginService {

   
    constructor(private http: HttpClient) { }

    //Method For post Request
    LoginAuth(Url,Data) {
    return this.http.post(Url,Data);
    }
  
}