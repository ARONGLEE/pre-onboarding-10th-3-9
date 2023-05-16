import { FaSpinner, FaTrash } from 'react-icons/fa';
import { useCallback, useEffect, useRef, useState } from 'react';

import { deleteTodo } from '../api/todoApi.js';

// eslint-disable-next-line react/prop-types
const TodoItem = ({ id, title, setTodos }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleRemoveTodo = useCallback(async () => {
    try {
      setIsLoading(true);
      await deleteTodo(id);

      if (isMounted.current) {
        setTodos((prev) => prev.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line no-alert, no-undef
      alert('Something went wrong.');
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }, [id, setTodos]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <li className="item">
      <span>{title}</span>
      <div className="item-option">
        {!isLoading ? (
          // eslint-disable-next-line react/button-has-type
          <button onClick={() => handleRemoveTodo()}>
            <FaTrash className="btn-trash" />
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </div>
    </li>
  );
};

export default TodoItem;
