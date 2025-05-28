import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IResponse } from '../../models/response.interfaces';
import { environment } from '../../../environments/environment';
import { LoginDTO } from '../../core/output/auth/login.dto';
import { CreateUserDTO } from '../../core/output/user/createUser.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {

  ev = environment; 
  private http = inject(HttpClient);

   login(payload: LoginDTO ) {
    return  this.http.post<IResponse>(`${this.ev.url_api}auth/login`,payload)
  }

  logout(payload:any) {
    return this.http.post<IResponse>(`${this.ev.url_api}auth/logout`, payload)
  }

  register(payload:CreateUserDTO) {
    return this.http.post<IResponse>(`${this.ev.url_api}users`, payload)
  }

  getToken() {
    return this.http.get<IResponse>(`${this.ev.url_api}auth/token`)
  }

  
}
