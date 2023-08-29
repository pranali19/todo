import { useState } from "react";
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox, TextField } from "@mui/material";

const Task =({setTodoList,todoList})=>{
    // ERROR STATE
    const [error,setError] = useState({status:false,statusMessage:""})
    // DUBLICATE CHECKER
    const checkValid=(value)=>{
        return todoList.find(i=>i.todoName === value)?false:true
    }
    // SUBMITS SINGLE TODO (CREATES NEW TODO)
    const onClickHandle=(e)=>{
        e.preventDefault();
        // IF TARGET VALUE IS NOT NULL && TARGET VALUE IS NOT INVALID SUBMIT
       if(e.target[0].value && checkValid(e.target[0].value)){
            setTodoList(state=>
                [...state,{
                todoName:e.target[0].value,
                status:false,
                key:String(uuidv4()),
                }
                ])
            e.target[0].value=''
            setError({status:false,statusMessage:""})
       }
       else{
        setError({status:true,statusMessage:"Duplicate Entry or Null Entry is not Allowed"})
       }
        
    }
    return(
        <div className="todo-list-form ">
            <form onSubmit={(e)=>onClickHandle(e)} className="form magicpattern">
                <TextField error={error.status} helperText={error.statusMessage} fullWidth className="form-inp" label="Task" id="fullWidth" type='text' name='todoName' />
                <Button variant="contained" type='submit' className="btn">Add Task</Button>
            </form>
        </div>
    )
}

export default Task