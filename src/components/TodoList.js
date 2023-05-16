/* eslint-disable react/prop-types */
import TodoItem from './TodoItem.js';

// eslint-disable-next-line react/prop-types
const TodoList = ({ todos, setTodos }) => {
  // eslint-disable-next-line react/prop-types
  return todos.length ? (
    // eslint-disable-next-line react/jsx-filename-extension
    <div className="todo-list">
      <ul>
        {todos.map(({ id, title }) => (
          <TodoItem key={id} id={id} title={title} setTodos={setTodos} />
        ))}
      </ul>
    </div>
  ) : (
    <div className="empty-list">...</div>
  );
};
export default TodoList;
