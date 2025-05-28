
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginDTO } from '../../core/output/auth/login.dto';
import { NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { CreateUserDTO } from '../../core/output/user/createUser.dto';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, AngularSvgIconModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup;
  showModal = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  
  ngOnInit(): void {  }

  async onSubmit() {
    if (this.loginForm.invalid) return;
    
    const access = await this.login();
    if (access === 404) this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

 register() {
    try {
      const  payload:CreateUserDTO = { ...this.loginForm.value, name: this.loginForm.value.email , active: true };
       this.authService.register(payload).subscribe(async (response) => {
        if(response.status === 201){
          this.closeModal()
          await this.login()
        }
      }) 
      
    } catch (error) {
      console.error('Error during register:', error);
    }
    
  }

  async login(): Promise<number>{
    try {
      const payload:LoginDTO = { ...this.loginForm.value };
      const response:any = await  this.authService.login(payload).toPromise()
      localStorage.setItem('token', response.token)
      const done: any = await this.authService.getToken().toPromise();
      localStorage.setItem('idUser', done.data[0].idUser);
       this.router.navigateByUrl('/dashboard')
      return Number(response.status)
    } catch (error:any) {
      return Number(error.status)
    }
  }

 

  

}
