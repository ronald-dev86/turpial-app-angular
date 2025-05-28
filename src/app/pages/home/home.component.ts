import {Component, OnInit} from '@angular/core';
import { TaskService } from '../../services/task/task.service';
import { Observable } from 'rxjs';
import { Task } from '../../core/input/Task.interface';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { HeaderAppComponent } from '../../components/header-app/header-app.component';
import { FormTaskComponent } from '../../components/form-task/form-task.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { StatusTask } from '../../core/enum/status-task';
import { CardTaskComponent } from '../../components/card-task/card-task.component';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, HeaderAppComponent, FormTaskComponent, CardTaskComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  tasks$:Observable<Task[]> =  new Observable<Task[]>
  showFormTask:boolean = false
  status = StatusTask
  task:any = undefined

  constructor(
    public taskService: TaskService,
    private authService:AuthService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.taskService.getAllTasksByIdUser()
    this.tasks$ = this.taskService.tasks$
  } 

  viewModalTask(e:boolean){
    this.showFormTask = e;
  }

  async logout(e:boolean){
    try {
      await this.authService.logout({idUser:localStorage.getItem('idUser')}).toPromise() 
      this.taskService.resetTasks()
    } catch (error) {
      console.error(error);
    }
    finally{
      localStorage.clear()
      this.router.navigateByUrl('/login')
      
    } 
    
  }

  async processTask(e:Task){
    try {
      if(e.id){
        this.task = undefined
        await this.taskService.updateTask(e).toPromise()
        return
      }
      await this.taskService.addTask(e).toPromise()
    } catch (error) {
      console.log(error);
    }finally{
      this.viewModalTask(false)
      this.taskService.getAllTasksByIdUser()
    }
    
  }
  async updateTask(e:Task){
    console.log(e);
    try {
      await this.taskService.updateTask(e).toPromise()
    } catch (error) {
      console.error(error);
    }finally{
      this.taskService.getAllTasksByIdUser()
    }
  }

  async deleteTask(e:Task){
    try {
      await this.taskService.deleteTask(e).toPromise()
    } catch (error) {
      console.error(error);
    }finally{
      this.taskService.getAllTasksByIdUser()
    }
  }

  sendInfoTaskUpdate(e:Task){
    this.task = e
    this.viewModalTask(true)
    
    
  }
  

}
