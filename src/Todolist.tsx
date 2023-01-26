import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";

export type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>,
    addTask: (title: string) => void,
    removeTask: (taskId: string) => void,
    changeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    //хранилище для инпута
    const [title,  setTitle] = useState<string> ("")

    //условный рендеринг - возвращается тот или иной компонент в зависимости от условия
    const tasksItem = props.tasks.length
    ? props.tasks.map((task: TaskType) => {
        const onClickRemoveTaskHandler = () => props.removeTask(task.id)
        return (
            //key={task.id} - чтобы лишки идентифицировать для разных целей
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickRemoveTaskHandler}>x</button>
            </li>
        )
    })
    : <span>Tasks list empty</span>

    // функция-обработчик для добавления таски по клику на кнопку
    const onClickAddTaskToTodolistHandler = () => {
        props.addTask(title)
        setTitle("")
    }

    //функция-обработчик для добавления значения инпута (названия таски) в локал стейт
    const onChangeSetLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    // функция-обработчик для добавления таски по нажатию клавиши
    // то же самое, что и onKeyDown={(e) => {if(e.key === 'Enter') addTask()}}, только использован синтаксис - логическое И, псевдо Иф
    const onKeyDownAddTaskToTodolistHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTaskToTodolistHandler()

    //функции-обработчики для фильтров
    // const onClickSetAllFilterHandler  = () => props.changeFilter('all')
    // const onClickSetActiveFilterHandler  = () => props.changeFilter('active')
    // const onClickSetCompletedFilterHandler  = () => props.changeFilter('completed')
    // можем в таком виде оставить и вызвать в кнопках-фильтрах, или сделать интереснее - создать функци, которая будет генерить
    //эти функции с нужным фильтром - и уже ее загнать в кнопки-фильтры. (этот вариант и использован ниже)
    const getSetFilterHandler = (filter: FilterValuesType) => () => props.changeFilter(filter)


    //возвращаемый jsx
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value = {title}
                    onChange={onChangeSetLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskToTodolistHandler}
                />
                <button onClick={onClickAddTaskToTodolistHandler}>+</button>
            </div>
            <ul>
                {tasksItem}
            </ul>
            <div>
                <button onClick={getSetFilterHandler("all")}>All</button>
                <button onClick={getSetFilterHandler("active")}>Active</button>
                <button onClick={getSetFilterHandler("completed")}>Completed</button>
            </div>
        </div>
    )
}

