import './TaskItem.css';

const TaskItem = (props) => {

    const { task, priority ,innerRef} = props;


    // setting color to priority using class attribute
    const getPriorityStyle=()=>{
        
        
        if(priority === 'Low'){

            return 'priority-low';
        }
        else if(priority === 'Medium'){

            return 'priority-medium';
        }
        else if(priority === 'High'){

            return 'priority-high';
        }
    }
    
    return (

        <div  {...props} ref={innerRef} className="task-item">
            <h4>{task}</h4>
            <p>Priority: <strong className={getPriorityStyle()}>{priority}</strong></p>
        </div>
    )
}

export default TaskItem;