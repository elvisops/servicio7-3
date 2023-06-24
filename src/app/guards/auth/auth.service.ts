import { HttpClient } from '@angular/common/http'; //para utilizar los metodos post y get de las api
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient, 
    private snack:MatSnackBar
  ) { }

  api = environment.api

  encriptar(text:any){
    return CryptoJS.AES.encrypt(text,environment.crypto_key)
  }

  desencriptar(textEncripted:any):any{
    var info = CryptoJS.AES.decrypt(textEncripted,environment.crypto_key)
    var respuesta = info.toString(CryptoJS.enc.Utf8)
    return respuesta
  }

  mkpayload(data:any){
    data = this.encriptar(JSON.stringify(data)).toString()
    return data
  }
}
