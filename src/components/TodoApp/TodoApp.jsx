import React, { Component } from 'react';

import './TodoApp.css';

import NewTaskForm from '../NewTaskForm';
import TaskList from '../TaskList';
import Footer from '../Footer';

export default class TodoApp extends Component {
  maxId = 100;

  timers = {};

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee', 0, 0),
      this.createTodoItem('Go to job', 0, 0),
      this.createTodoItem('Have a lunch', 0, 0),
    ],
    filter: 'all',
  };

  componentWillUnmount() {
    Object.values(this.timers).forEach((timer) => clearInterval(timer));
  }

  deleteItem = (id) => {
    clearInterval(this.timers[id]);
    this.setState(({ todoData }) => ({
      todoData: todoData.filter((el) => el.id !== id),
    }));
  };

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec);
    this.setState(
      ({ todoData }) => ({ todoData: [...todoData, newItem] }),
      () => {
        if (newItem.timeLeft > 0) this.startTimer(newItem.id);
      }
    );
  };

  startTimer = (id) => {
    if (this.timers[id]) return;

    this.timers[id] = setInterval(() => {
      this.setState(({ todoData }) => ({
        todoData: todoData.map((task) => {
          if (task.id === id) {
            if (task.timeLeft > 0) {
              return { ...task, timeLeft: task.timeLeft - 1 };
            } else {
              clearInterval(this.timers[id]);
              delete this.timers[id];
              return { ...task, completed: true, timeLeft: 0 };
            }
          }
          return task;
        }),
      }));
    }, 1000);
  };

  stopTimer = (id) => {
    clearInterval(this.timers[id]);
    delete this.timers[id];
  };

  onFilterChange = (filter) => this.setState({ filter });

  resumeTimer = (id) => {
    if (!this.timers[id]) {
      this.startTimer(id);
    }
  };

  createTodoItem(text, min, sec) {
    let timeCreate = new Date().getTime();
    return {
      text,
      id: this.maxId++,
      completed: false,
      edit: false,
      time: timeCreate,
      timeLeft: min * 60 + sec,
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

  onToggleDone = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'completed').map((task) =>
        task.id === id && task.completed ? { ...task, timeLeft: 0 } : task
      ),
    }));
    this.stopTimer(id);
  };

  onEdit = (id) => {
    let arr = this.state.todoData;
    const idx = arr.findIndex((el) => el.id === id);
    if (!arr[idx].completed) {
      this.setState(({ todoData }) => {
        const newTodoData = this.toggleProperty(todoData, id, 'edit');
        return {
          todoData: newTodoData,
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
            stopTimer={this.stopTimer}
            resumeTimer={this.resumeTimer}
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
