import { DragDropContext } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import TodoComputed from './components/TodoComputed'
import TodoCreate from './components/TodoCreate'
import TodoFilter from './components/TodoFilter'
import TodoList from './components/TodoList'

const initialState = JSON.parse(localStorage.getItem('todos')) || [];
const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

const App = () => {
const [todos, setTodos] = useState(initialState);

useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos))
}, [todos])

const createTodo = (title) => {
  const newTodo = {
    id: Date.now(),
    title,
    completed:false,
  }
  setTodos([...todos, newTodo]);
}
const removeTodo = (id) => {
 setTodos(todos.filter(todo => todo.id !== id));
}
const updateTodo = (id) => {
  setTodos(todos.map(todo => todo.id === id ? {...todo, completed : !todo.completed}: todo))
}
const clearCompleted = () => {
  setTodos(todos.filter((todo) => todo.completed === false))
}
const computedItemsLeft = todos.filter((todo) => todo.completed === false).length;

  const [filter, setFilter] = useState('all');

  const filteredTodos = () =>{
    switch(filter) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter((todo) => !todo.completed)
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }
  const changeFilter = (filter) => setFilter(filter);
  const handleDragEnd = result => {
    const { destination, source } = result;
    if(!destination) return;
    if(
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
    return;
    setTodos((prevTasks) =>
      reorder(prevTasks, source.index, destination.index)
    )
  }
  return (
    <div className="min-h-screen bg-[url('../public/images/bg-mobile-light.jpg')]  dark:bg-[url('../public/images/bg-mobile-dark.jpg')] bg-no-repeat bg-contain bg-gray-300 dark:bg-gray-900 transition-all duration-1000 md:bg-[url('../public/images/bg-desktop-light.jpg')] md:dark:bg-[url('../public/images/bg-desktop-dark.jpg')] ">
      <Header/>
      <main className="container mx-auto px-4 mt-8 md:max-w-xl">
        <TodoCreate createTodo={createTodo}/>

        <DragDropContext onDragEnd={handleDragEnd}>
          <TodoList
            todos={filteredTodos()}
            removeTodo={removeTodo}
            updateTodo={updateTodo} />
        </DragDropContext>

        <TodoComputed computedItemsLeft= {computedItemsLeft} clearCompleted={clearCompleted}/>
        <TodoFilter changeFilter={changeFilter} filter={filter}/>
      </main>
      <footer className='mt-8 text-center text-gray-400 dark:text-gray-500'>Drag and drop to reorder list</footer>
    </div>
  )
}

export default App
