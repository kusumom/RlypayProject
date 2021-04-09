export interface LoginResp {
    status: boolean;
    response: number;
    message: string;
    twostep: number;
    authToken: string;
  }


 export interface OtpVerifyResp {
    status: boolean;
    response: number;
    message: string;
    userid: number;
    username: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    usertype: string;
    validToken: number;
  }

  export interface UserDetails{
      name:string,
      password:string,
      email:string,
      mobile:number,
      date:string,
      role:string
  }

  export class TempValues{
    TempName:string[]=[]
    TempEmail:string[]=[];
    TempMobile:number[]=[];
     TempRole:string[]=[];
     TemmpPass:string[]=[];
     TempDate:string[]=[];

  }

  export interface FinalSaveResp {
    status: boolean;
    response: number;
    data: FinalSaveArray[];
    message: string;
  }
  
  interface FinalSaveArray {
    name: string;
    email: string;
    mobile: string;
    date: string;
    password: string;
    role: string;
  }