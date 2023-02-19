import React from 'react'
import CrossIcon from './icon/CrossIcon'
import CheckIcon from './icon/CheckIcon'
const TodoItem = React.forwardRef(({todo, removeTodo, updateTodo, ...props}, ref) => {
  const {id, title, completed} = todo;
  return (
    <article  {...props} ref={ref} className="flex gap-4 p-4 border-b-gray-400 border-b ">

          <button className={`rounded-full  h-5 w-5 ${completed ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex justify-center items-center': 'inline-block border-2'}`}
          onClick={() => updateTodo(id)}
          >
            {
              completed && <CheckIcon/>
            }
          </button>
          <p className={`grow dark:text-gray-400 ${completed ?'line-through text-gray-300 dark:text-gray-500': 'text-gray-600' }`}>{title}</p>
          <button onClick={() =>removeTodo(id)}>
            <CrossIcon/>
          </button>
    </article>
  )
})

export default TodoItem