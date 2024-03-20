import './TaskForm.css';
import { useState } from 'react';

const TaskForm = (props)=>{

    const [task,setTaskInput] = useState({
        newTask:'',
        priority:''
    });

    const handleChange =(e)=>{

        setTaskInput({...task, [e.target.name]:e.target.value});
    }
    
    const handleClick =(e)=>{

        if(task.newTask.length>0 && task.priority.length>0){

            setTaskInput({
                newTask:'',
                priority:''
            })
            return props.getTask(task);
        }
    }

    return(
        <div className="form">
            <input className="form-input" type={'text'} placeholder="Enter task" onChange={handleChange} value={task.newTask} 
            name='newTask'></input>

            <select className="form-select" onChange={handleChange} value={task.priority} name='priority'>
                <option value={''} disabled>Select Priority</option>
                <option value={'Low'}>Low</option>
                <option value={'Medium'}>Medium</option>
                <option value={'High'}>High</option>
            </select>
            <button className='form-button' onClick={handleClick}>Add</button>
        </div>
    )
}

export default TaskForm;