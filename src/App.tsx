import React, {ChangeEvent, useState} from 'react';
import logo from './logo.svg';
import './App.css';

type State = {
  value: string,
  isCompleted: boolean
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<State[]>([
    {
      value: 'Pickup dry cleaning',
      isCompleted: true,
    },
    {
      value: 'Get haircut',
      isCompleted: false,
    },
    {
      value: 'Build a todo app in React',
      isCompleted: false,
    }
  ]);

  function createTodoAtIndex(index: number) {
    const newTodos = [...todos];
    newTodos.splice(index + 1, 0, {
      value: '',
      isCompleted: false,
    });
    setTodos(newTodos);
  }

  function updateTodoAtIndex(value: string, index: number) {
    const newTodos = [...todos];
    newTodos[index].value = value;
    setTodos(newTodos);
  }

  function removeTodoAtIndex(index: number) {
    setTodos(todos => todos.slice(0, index).concat(todos.slice(index + 1, todos.length)));
  }

  function toggleTodoCompleteAtIndex(index: number) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }

  return (
    <div className="app">
      <div className="header">
        <img src={logo} className="logo" alt="logo"/>
      </div>
      <div className="todo-list">
        <button className={`add`} onClick={() => createTodoAtIndex(todos.length)}>追加</button>
        <ul>
          {todos.map((todo, i) => (
            <div key={i} className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
              <div className={'checkbox'} onClick={() => toggleTodoCompleteAtIndex(i)}>
                {todo.isCompleted && (<span>&#x2714;</span>)}
              </div>
              <input
                type="text"
                value={todo.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateTodoAtIndex(e.target.value, i)}
              />
              <button className={`delete`} onClick={() => removeTodoAtIndex(i)}>削除</button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
