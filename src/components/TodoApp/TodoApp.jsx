import React, { Component } from 'react';

import './TodoApp.css';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class TodoApp extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make Awesome App'),
      this.createTodoItem('Have a lunch'),
    ],
    filter: 'all',
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  createTodoItem(text) {
    let timeCreate = new Date().getTime();
    return {
      text: text,
      id: this.maxId++,
      completed: false,
      edit: false,
      time: timeCreate,
    };
  }

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      };
    });
  };

  onEdit = (id) => {
    let arr = this.state.todoData;
    const idx = arr.findIndex((el) => el.id === id);
    if (!arr[idx].completed) {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'edit'),
        };
      });
    }
  };

  onClearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((el) => !el.completed);
      return {
        todoData: newArray,
      };
    });
  };
  onSubmitCreate = (id, newValue, arr = this.state.todoData, propName = 'edit') => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, text: newValue, [propName]: !oldItem[propName] };
    const newArr = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    this.setState({ todoData: newArr });
  };

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  render() {
    const { todoData, filter } = this.state;

    const visibleItems = this.filter(todoData, filter);
    const completedCount = todoData.filter((el) => el.completed).length;

    const todoCount = todoData.length - completedCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todoData={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEdit={this.onEdit}
            onSubmitCreate={this.onSubmitCreate}
          />
          <Footer
            filter={filter}
            onFilterChange={this.onFilterChange}
            onClearCompleted={this.onClearCompleted}
            todo={todoCount}
          />
        </section>
      </section>
    );
  }
}
