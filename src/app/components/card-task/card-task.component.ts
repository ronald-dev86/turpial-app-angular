import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../core/input/Task.interface';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DatePipe, NgClass } from '@angular/common';
import { StatusTask } from '../../core/enum/status-task';

@Component({
  selector: 'app-card-task',
  imports: [ AngularSvgIconModule, NgClass, DatePipe,],
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.css'
})
export class CardTaskComponent  implements OnInit{
  

  @Input({ required: true }) task!: Task;
  status = StatusTask
  moreInfo = false

  @Output() updateTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();
  @Output() sendInfoTaskUpdate = new EventEmitter<Task>();


  ngOnInit(): void {
    if(this.task.description.length > 50){
      this.moreInfo = true
    }
  }
  

  updateStatus(){
    
    if(this.task.status === this.status.IN_PROGRESS){
      this.task.status =  this.status.DONE
    };

    if(this.task.status === this.status.TO_DO){
      this.task.status =  this.status.IN_PROGRESS
    };

    this.updateTask.emit(this.task);
  }

  removeTask(){
    this.deleteTask.emit(this.task);
  }

  openModal(){
    this.sendInfoTaskUpdate.emit(this.task);
  }

}
