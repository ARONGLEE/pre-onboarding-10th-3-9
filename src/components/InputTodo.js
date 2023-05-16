import { FaSpinner } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { useCallback, useEffect, useState } from 'react';

import { createTodo } from '../api/todoApi.js';
import useFocus from '../hooks/useFocus';
import Dropdown from './Dropdown';
import { getSearchData } from '../api/searchApi.js';
import useDebounce from '../hooks/useDebounce';

// eslint-disable-next-line react/prop-types
const InputTodo = ({ setTodos }) => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { ref, setFocus } = useFocus();
  const debounveValue = useDebounce(inputText);
  console.log(debounveValue);
  const [searchResult, setSearchResult] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    setFocus();
  }, [setFocus]);

  useEffect(() => {
    if (debounveValue !== '') {
      setIsDropdownVisible(true);
      getSearchData(debounveValue)
        .then((searchData) => {
          setSearchResult(searchData);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setIsDropdownVisible(false);
    }
  }, [debounveValue]);

  // eslint-disable-next-line consistent-return
  const createTodoItem = async (title) => {
    try {
      setIsLoading(true);

      const trimmed = title.trim();
      if (!trimmed) {
        // eslint-disable-next-line no-alert, no-undef
        return alert('Please write something');
      }

      const newItem = { title: trimmed };
      const { data } = await createTodo(newItem);

      if (data) {
        setTodos((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line no-alert, no-undef
      alert('Something went wrong.');
    } finally {
      setInputText('');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputText(value);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      createTodoItem(inputText);
    },
    [inputText],
  );

  const handleSelectItem = async (selectedItem) => {
    setInputText(selectedItem);
    createTodoItem(selectedItem);
  };

  // const handleSelectItem = async selectedItem => {
  //   setInputText(selectedItem)
  //   try {
  //     setIsLoading(true)

  //     const trimmed = selectedItem.trim()
  //     if (!trimmed) {
  //       return alert('Please write something')
  //     }

  //     const newItem = { title: trimmed }
  //     const { data } = await createTodo(newItem)

  //     if (data) {
  //       setTodos(prev => [...prev, data])
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     alert('Something went wrong.')
  //   } finally {
  //     setInputText('')
  //     setIsLoading(false)
  //   }
  // }

  // const handleSubmit = useCallback(
  //   async e => {
  //     try {
  //       e.preventDefault()
  //       setIsLoading(true)

  //       const trimmed = inputText.trim()
  //       if (!trimmed) {
  //         return alert('Please write something')
  //       }

  //       const newItem = { title: trimmed }
  //       const { data } = await createTodo(newItem)

  //       if (data) {
  //         return setTodos(prev => [...prev, data])
  //       }
  //     } catch (error) {
  //       console.error(error)
  //       alert('Something went wrong.')
  //     } finally {
  //       setInputText('')
  //       setIsLoading(false)
  //     }
  //   },
  //   [inputText, setTodos]
  // )

  return (
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-container">
          <CiSearch className="search" />
          <input
            className="input-text"
            placeholder="Add new todo..."
            ref={ref}
            value={inputText}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>
        {!isLoading ? (
          <button className="input-submit" type="submit">
            {/* <FaPlusCircle className="btn-plus" /> */}
          </button>
        ) : (
          <FaSpinner className="spinner" />
        )}
      </form>
      {isDropdownVisible && (
        <Dropdown searchData={searchResult} inputText={inputText} onSelect={handleSelectItem} />
      )}
    </>
  );
};

export default InputTodo;
