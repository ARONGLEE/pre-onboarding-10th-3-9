import { useEffect, useState } from 'react';

import Header from '../components/Header.js';

import TodoList from '../components/TodoList.js';
import { getTodoList } from '../api/todoApi.js';
import InputTodo from '../components/InputTodo.js';

const Main = () => {
  const [todoListData, setTodoListData] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getTodoList();
      setTodoListData(data || []);
    })();
  }, []);

  return (
    <div className="container">
      <div className="inner">
        <Header />
        <InputTodo setTodos={setTodoListData} />
        <TodoList todos={todoListData} setTodos={setTodoListData} />
      </div>
    </div>
  );
};

export default Main;
