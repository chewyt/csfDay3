import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators,ValidatorFn,AbstractControl,ValidationErrors } from '@angular/forms';
import { Todo } from './todo';
import { v4 as uuidv4 } from 'uuid';

// const minChars = (ctrl:AbstractControl) =>{
//   if (ctrl.value.trim().length>8)
//   {return (null)
//   }
//   return {minChars:true}as ValidationErrors
// }

// taskFormControl  =new FormControl('',[Validators.required,Validators.minChars]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'workshop3-new';
  form:FormGroup;
  tomorrow=new Date();
  todosValues: Todo[]= [];
  priorities=["low","medium","high"];
  buttonToggle: boolean = true; //true for Add and false for Update
  tempTaskId: string ='';
  showAll: boolean = true;
  colorEye: string ='';



  emailFormControl  =new FormControl('',[Validators.required,Validators.email]);
  taskFormControl  =new FormControl('',[Validators.required,Validators.minLength(8)]);
  priorityFormControl  =new FormControl('',[Validators.required]);
  dueDateFormControl  =new FormControl('',[Validators.required]);

  constructor(private fb: FormBuilder){
    this.tomorrow.setDate(this.tomorrow.getDate()+1)
    this.form = this.fb.group({
      email: this.emailFormControl,
      task: this.taskFormControl,
      priority: this.priorityFormControl,
      dueDate: this.dueDateFormControl
    })
  }

  
  ngOnInit(): void {
    for (let index = 0; index < localStorage.length; index++) {
      
      let key = localStorage.key(index)!;
      this.todosValues.push(JSON.parse(localStorage.getItem(key)||''))
      
      
    }
  }


  updateArrayFromLS(){
   
  }


  addToDo(){
    console.log("Add todo")
    let taskId = uuidv4();
    let singleTodo = new Todo(
      this.form.value.email,
      this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate,
      taskId,
      this.form.value.status
    )
    this.todosValues.push(singleTodo);
    this.taskFormControl.reset('');
    this.priorityFormControl.reset('');
    this.dueDateFormControl.reset('');
    this.emailFormControl.reset('');
    this.form.reset();
    localStorage.setItem(taskId,JSON.stringify(singleTodo))

  }

  deleteTask(t: Todo){ 

    let i: number  = this.todosValues.indexOf(t)
    this.todosValues.splice(i,1)
    // difference between these two
    localStorage.removeItem(localStorage.key(i)!)
    // localStorage.removeItem(localStorage.key(i)||'')

    
  }

  editTask(t:Todo){

    this.taskFormControl.setValue(t.task);
    this.priorityFormControl.setValue(t.priority);
    this.dueDateFormControl.setValue(t.dueDate);
    this.emailFormControl.setValue(t.email);
    this.tempTaskId= t.taskId;
    this.buttonToggle=false;
    this.toggle(t);
    

  }

  updateTask(){

    this.buttonToggle=true;
    // alert("Update")

    
    // let taskId = uuidv4();
    let singleTodo = new Todo(
      this.form.value.email,
      this.form.value.task,
      this.form.value.priority,
      this.form.value.dueDate,
      this.tempTaskId
    )
    this.todosValues[this.todosValues.findIndex(t => t.taskId === this.tempTaskId)] = singleTodo;
    this.taskFormControl.reset('');
    this.priorityFormControl.reset('');
    this.dueDateFormControl.reset('');
    this.emailFormControl.reset('');
    this.form.reset();
    localStorage.setItem(singleTodo.taskId,JSON.stringify(singleTodo))




  }


  onSubmit() {
    if (this.form.valid) {
      console.log("Form Submitted!");
      this.addToDo();
    }
    else{
      console.log("Form Not Submitted!");
    }
  }

  getColor(priorityLevel: string){

    switch (priorityLevel) {
      case 'low':
        return 'grey'
        break;
      case 'medium':
        return 'orange'
        break;
      case 'high':
        return 'red'
        break;
      default:
        return 'black'
        break;
    }

  }

  toggle(t: Todo){
    t.status=!t.status;
    localStorage.setItem(t.taskId,JSON.stringify(t))
  }

  strikethrough(t: Todo){
    return {'text-decoration': t.status ? 'line-through' : 'none',
            'color': t.status ? 'silver' : 'black'
  }
  }

  showUncompleted(){
    this.showAll=!this.showAll;
    if (this.showAll){
      
      this.colorEye = 'grey';
    }else{
      this.colorEye = 'black';

    }

  }
}
