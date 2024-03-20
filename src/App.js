import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskItem from "./components/TaskItem/TaskItem";

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightslategrey",
  padding: '8px',
  width: "250px",
  borderRadius: '12px'
});

const App = () => {

  const [task, setTask] = useState(null);
  const [addedTask, setAddedTask] = useState([]);
  const [startedTask, setStartedTask] = useState([]);
  const [completedTask, setCompletedTask] = useState([]);

  useEffect(() => {

    if (task) {
      
      const {newTask, priority} = task;
      const taskObj = { id: `${addedTask.length}`, task: newTask , priority};
      setAddedTask([...addedTask, taskObj]);
    }
  }, [task]);

  const onDragEnd = (result) => {

    if (!result.destination) {
      return;
    }
    
    const source = result.source;

    //------- Drop logic if dropped to Started Stage ------
    if (result.destination.droppableId === 'Started') {

      if (source.droppableId === 'Added') {

        const movedTask = addedTask.splice(source.index, 1);
        setAddedTask(addedTask);
        const [mtask] = movedTask;
        setStartedTask([...startedTask, mtask]);
      }
      else if (source.droppableId === 'Completed') {

        const movedTask = completedTask.splice(source.index, 1);
        setCompletedTask(completedTask);
        const [mtask] = movedTask;
        setStartedTask([...startedTask, mtask]);
      }
    }
    //------- Drop logic if dropped to Added Stage ------
    else if (result.destination.droppableId === 'Added') {

      if (source.droppableId === 'Started') {

        const movedTask = startedTask.splice(source.index, 1);
        setStartedTask(startedTask);
        const [mtask] = movedTask;
        setAddedTask([...addedTask, mtask]);
      }
      else if (source.droppableId === 'Completed') {

        const movedTask = completedTask.splice(source.index, 1);
        setCompletedTask(completedTask);
        const [mtask] = movedTask;
        setAddedTask([...addedTask, mtask]);
      }
    }
    //------- Drop logic if dropped to Completed Stage ------
    else if (result.destination.droppableId === 'Completed') {

      if (source.droppableId === 'Started') {

        const movedTask = startedTask.splice(source.index, 1);
        setStartedTask(startedTask);
        const [mtask] = movedTask;
        setCompletedTask([...completedTask, mtask]);
      }
      else if (source.droppableId === 'Added') {

        const movedTask = addedTask.splice(source.index, 1);
        setAddedTask(addedTask);
        const [mtask] = movedTask;
        setCompletedTask([...completedTask, mtask]);
      }
    }
  };
  
  return (
    <div className="main">

      <TaskForm getTask={setTask} />

      <div className="task-labels">
        <div>
          <h3>Added</h3>
        </div>
        <div>
          <h3>Started</h3>
        </div>
        <div>
          <h3>Completed</h3>
        </div>
      </div>

      <div className="task-container">

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="Added">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {addedTask.length > 0 && addedTask.map((item, index) => (
                  <Draggable key={index} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <TaskItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps} task={item.task} priority={item.priority} innerRef={provided.innerRef}/>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Started">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {
                  startedTask.length > 0 && startedTask.map((item, index) => (
                  <Draggable key={index} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (

                      <TaskItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}  task={item.task} priority={item.priority} innerRef={provided.innerRef}  />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Completed">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {
                 completedTask.length > 0 && completedTask.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <TaskItem
                        {...provided.draggableProps}
                        {...provided.dragHandleProps} task={item.task} priority={item.priority} innerRef={provided.innerRef} />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

      </div>
    </div>
  );
};

export default App;