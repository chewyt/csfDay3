import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workshop3-new';
  form:FormGroup;
  tomorrow=new Date();

  taskFormControl  =new FormControl('',[Validators.required]);
  priorityFormControl  =new FormControl('',[Validators.required]);
  dueDateFormControl  =new FormControl('',[Validators.required]);

  constructor(private fb: FormBuilder){
    this.tomorrow.setDate(this.tomorrow.getDate()+1)
    this.form = this.fb.group({
      task: this.taskFormControl,
      priority: this.priorityFormControl,
      dueDate: this.dueDateFormControl
    })
  }
  addToDo(){

  }
}
