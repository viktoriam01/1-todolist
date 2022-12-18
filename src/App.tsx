import React, {useEffect, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
// для фильтрации тасков и кнопки
export type FilterValuesType = "all" | "active" | "completed"

function App() {
    const title = 'What to learn'
    // const title2 = 'December'

    // создание useState c initial array  внутри. useState - функция,в которой первый элемент -массив данных,
    // а второй эл - функция. которая их изменяет
    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ])
// const tasks2 = [
    //     { id: 1, title: 'Hello world', isDone: true},
    //     { id: 2, title: 'I am happy', isDone: false},
    //     { id: 3, title: 'Yo', isDone: false}

    // удаление таски
    const removeTask = (taskId: number) => {
        //setTasks работает асинхронно
        setTasks(tasks.filter(t => t.id !== taskId))
        console.log(tasks)
    }
    // для борьбы с асинхронностью, чтобы дождаться выполнения setTask
    // useEffect(() => {
    //     console.log(tasks)
    // }, [tasks])

    //кнопки фильтрации
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }

    // фильтрация тасков
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const getFilteredTasksForRender = () => {
        switch(filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }

    const filteredTasksForRender: Array<TaskType> = getFilteredTasksForRender()

    return (
        <div className="App">
            <Todolist
                removeTask={removeTask}
                changeFilter = {changeFilter}
                title={title}
                tasks={filteredTasksForRender}/>
            {/*<Todolist title={title2} tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
