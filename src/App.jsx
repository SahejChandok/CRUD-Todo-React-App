import { useState } from "react";
import { useEffect } from "react";
import TodoCard from "./components/TodoCard"
import TodoInput from "./components/Todoinput"
import TodoList from "./components/TodoList"

function App() {
  //let todos = ["Apply jobs", "Do leetcode question", 'sleep'];

  const [todos, setTodos] = useState([]);
  const [todoValue, setTodoValue] = useState('')

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo){
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList)
    setTodos(newTodoList);
  }

  function handleDeleteTodo(index){
    const newTodoList = todos.filter((todo, todoIndex)=>{
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  useEffect(()=>{
    if(!localStorage){
      return
    }
    let localTodos = localStorage.getItem('todos')
    if(!localTodos){
      return 
    }
    localTodos = JSON.parse(localTodos).todos

    setTodos(localTodos)
    
  }, [])
  return (
    <>
      <TodoInput todoValue = {todoValue} setTodoValue = {setTodoValue} handleAddTodos = {handleAddTodos}/>
      <TodoList handleEditTodo= {handleEditTodo} handleDeleteTodo={handleDeleteTodo} todos = {todos} />
    </>
  )
}

export default App
