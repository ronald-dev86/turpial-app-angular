import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../core/input/Task.interface';
import { IResponse } from '../../models/response.interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  ev = environment; 
  private http = inject(HttpClient);
  private taksSubject =  new BehaviorSubject<Task[]>([])
  tasks$ = this.taksSubject.asObservable()

  resetTasks() {
    this.taksSubject.next([]);
  }

  getAllTasksByIdUser() {
    try {
        const idUser = localStorage.getItem('idUser');
        this.http.get<IResponse>(`${this.ev.url_api}task/user/${idUser}`).subscribe((response:IResponse) => {
          const task: Task[] = response.data ?? [];
          this.taksSubject.next(task);
        });
    } catch (error) {
      console.error(error);
    }
  }

  addTask(task: Task) {
    return this.http.post(`${this.ev.url_api}task`, task)
  }

  updateTask(task: Task) {
    return this.http.patch(`${this.ev.url_api}task/${task.id}`, task)
  }

  deleteTask(task: Task) {
    return this.http.delete(`${this.ev.url_api}task/${task.id}`)
  }
}
