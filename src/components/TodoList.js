import React, { useState } from 'react'
import Todo from './Todo'
import TodoForm from './TodoForm'
import {Button, Modal } from 'react-bootstrap'

function TodoList(props) {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState({});

    const onYesClicked = (todo) => {
        removeTodo(todo);
        setModalIsOpen(false);
    }

    const setSelectedTodoItem = (todo) => {
        setSelectedTodo(todo);
        setModalIsOpen(true);
    }

    const [todos,setTodos] =  useState([])

    const addTodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)) {
            return
        }

        const newTodos = [todo,...todos]

        setTodos(newTodos)
        console.log(todo,...todos)
    }

    const updateTodo = (todoId,newValue) => {
        if(!newValue.text || /^\s*$/.test(newValue.text)) {
            return
        }

        setTodos(prev=>prev.map(item => (item.id === todoId ? newValue : item)));
    }

    const removeTodo= id => {
        const removeArr = [...todos].filter(todo=>todo.id !== id);

        setTodos(removeArr);
    }

    const completeTodo = id => {
        let updatedTodos = todos.map(todo=>{
            if(todo.id === id) {
                todo.isComplete = !todo.isComplete;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    return (
        <div>
            <h1>Todo List</h1>
            <TodoForm onSubmit={addTodo} />
            <Todo todos={todos} 
            completeTodo={completeTodo} 
            removeTodo={setSelectedTodoItem} 
            updateTodo={updateTodo}
            setModalIsOpen={setModalIsOpen} 
            />
            <div>
            <Modal show={modalIsOpen} onHide={() => setModalIsOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you wish to delete this record?</Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={() => setModalIsOpen(false)}>
                        Close
                </Button>
                    <Button variant="danger" onClick={() => onYesClicked(selectedTodo)}>
                        Delete
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
        </div>
    )
}

export default TodoList
