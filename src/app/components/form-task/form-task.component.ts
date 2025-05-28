import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Task } from '../../core/input/Task.interface';
import { StatusTask } from '../../core/enum/status-task';

@Component({
  selector: 'app-form-task',
  imports: [ReactiveFormsModule, AngularSvgIconModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css'
})
export class FormTaskComponent implements OnInit{
  taskForm:FormGroup
  @Output() closeModal = new EventEmitter<boolean>();
   @Output() sendTask = new EventEmitter<Task>();
   @Input({ required: false }) task!: Task;

  constructor(
    private fb: FormBuilder) {
      this.taskForm = this.fb.group({
        idUser: ['', []],
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(3)]], 
        status: ['', []]     
      });
  }
  ngOnInit(): void {
    if(this.task === undefined) return
    console.log(this.task);
    this.taskForm.addControl('id', this.fb.control(''));
    this.taskForm.addControl('createdAt', this.fb.control(''));
    this.taskForm.addControl('updatedAt', this.fb.control(''));
    this.taskForm.addControl('active', this.fb.control(''));
    this.taskForm.setValue(this.task);
    console.log(this.task);
  }
  viewModalTask(){
    this.closeModal.emit(false);
  }

  onSubmit() {
    if (this.taskForm.invalid) return;
    if(this.task === undefined){
      this.taskForm.value.idUser = localStorage.getItem('idUser');
      this.taskForm.value.status = StatusTask.TO_DO;
    }
    
    this.sendTask.emit(this.taskForm.value);
  }	
}
