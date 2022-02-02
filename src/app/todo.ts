export class Todo {

    constructor(
        
        public email: string,
        public task: string,
        public priority: string,
        public dueDate:Date,
        public taskId: string,
        public status?:boolean,
        public hover?:boolean
    ){

    }

}
