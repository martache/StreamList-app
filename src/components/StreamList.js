
import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import '@fontsource/roboto';

function StreamList() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState('');
  const editInputRef = useRef(null);

  useEffect(() => {
    const storedItems = localStorage.getItem('streamItems');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('streamItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (editIndex !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editIndex]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    setItems([...items, { text: inputValue.trim(), completed: false }]);
    setInputValue('');
  };

  const handleDelete = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleComplete = (index) => {
    const newItems = [...items];
    newItems[index].completed = !newItems[index].completed;
    setItems(newItems);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(items[index].text);
  };

  const handleEditChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditSubmit = (index) => {
    if (!editValue.trim()) return;
    const newItems = [...items];
    newItems[index].text = editValue.trim();
    setItems(newItems);
    setEditIndex(null);
    setEditValue('');
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditValue('');
  };

  return (
    <div className="page-container">
      <h1>Stream List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Add new item"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {items.map((item, index) => (
          <li key={index} className={item.completed ? 'completed' : ''}>
            {editIndex === index ? (
              <>
                <input
                  ref={editInputRef}
                  value={editValue}
                  onChange={handleEditChange}
                />
                <button onClick={() => handleEditSubmit(index)}><FaCheck /></button>
                <button onClick={handleCancelEdit}><FaTimes /></button>
              </>
            ) : (
              <>
                <span>{item.text}</span>
                <button onClick={() => handleComplete(index)}><FaCheck /></button>
                <button onClick={() => handleEdit(index)}><FaEdit /></button>
                <button onClick={() => handleDelete(index)}><FaTrash /></button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamList;