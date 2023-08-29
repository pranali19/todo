import {  Button, Switch, TextField, Tooltip } from "@mui/material"
import  Box from "@mui/material/Box"
import { useState } from "react"


const SingleTodoItem =({todo,setTodoList,index})=>{
    // MANAGE AND STORE EDITED STATE
    const [isEditState,setIsEditState] = useState(false)
    const [currentEditValue,setCurrentEditValue] = useState(todo.todoName)
    // BOX STYLE FOR MAIN CONTAINER SINGLE TODO LIST
    const boxSxMain={
        height:"auto",
        width:"100%", 
        backgroundColor:'#636a7357',
        padding:'10px',
        borderRadius:'10px',
        marginTop:"10px",
        display:"flex",
        justifyContent:"space-between"
        }
    // SWITCHES STATUS OF TODO (RUNS UPDATE ON TODOLIST)
    const handleSwitch=()=>{
       
        const newState = {...todo,status:!todo.status}
        setTodoList(state=>[...state.slice(0,index),newState,...state.slice(index+1,)])
    }
    // DELETES SINGLE TODO FROM LIST
    const deleteTodo=()=>{
        setTodoList(state=>state.filter(i=>i.key !== todo.key))
    }
    // TOGGLES EDIT STATE (SHOWS INPUT FIELD AND SUBMIT BUTTON FOR EDIT)
    const editTodo=()=>{
        setIsEditState(true)  
    }
    // EDITS SINGLE TODO FROM LIST  (RUNS UPDATE ON TODOLIST)
    const submitEdit=()=>{
        const newState = {...todo,todoName:currentEditValue}
        setTodoList(state=>[...state.slice(0,index),newState,...state.slice(index+1,)])
        setIsEditState(false) 
    }
    const onChangeEditFeild=(e)=>{
        setCurrentEditValue(e.target.value)

    }
    return(
        <Box sx={boxSxMain}>
        {
        /* TERINARY OPERATION: shows input feild or todo name based on isEdit state value */
            isEditState?
            <TextField label={'Edit Todo'} onChange={(e)=>onChangeEditFeild(e)} defaultValue={todo.todoName} />:
            <p style={{textDecoration:todo.status?'line-through':'none'}}>{todo.todoName}</p>
        }
            <Box sx={{display:'flex',justifyContent: 'space-between',alignItems: 'center'}}>
            
            <Tooltip title="Change Status">
                <Switch value={todo.status} onChange={()=>handleSwitch()} />
            </Tooltip>
                <Button onClick={deleteTodo}>Delete</Button>
                {
                /* TERINARY OPERATION: shows edit or submit btn based on isEdit state value */

                    isEditState?
                    <Button onClick={submitEdit}>submit</Button>:
                    <Button onClick={editTodo}>Edit</Button>
                }
            </Box>

    </Box>
    )
}

const TaskList =({todoList,setTodoList})=>{
    return(
       <div className="todo-list">

       <Box sx={{
            height:"auto",
            justifyContent:'center',
            padding:"20px"
            }}
            className='mainContainerList'
        >
        {
            /* renders list of todos */
            todoList.map((todo,index)=> 
                <SingleTodoItem key={index} todo={todo} setTodoList={setTodoList} index={index} />
                )
        }

       </Box>

       </div>
    )
}

export default TaskList