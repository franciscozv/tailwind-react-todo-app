import React from 'react'

const TodoFilter = ({changeFilter, filter}) => {
  return (
    <section className="container mx-auto mt-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-md flex justify-center gap-4 transition-all duration-1000">
            <button className={`hover:text-blue-600 ${filter === 'all'? 'text-blue-600': 'dark:text-gray-500'}`}
            onClick={() => changeFilter('all')}
            >All</button>
            <button className={`hover:text-blue-600 ${filter === 'active'? 'text-blue-600': 'dark:text-gray-500'}`}
            onClick={() => changeFilter('active')}
            >Active</button>
            <button className={`hover:text-blue-600 ${filter === 'completed'? 'text-blue-600': 'dark:text-gray-500'}`}
            onClick={() => changeFilter('completed')}
            >Completed</button>
          </div>
    </section>
  )
}

export default TodoFilter