import React, { Component } from 'react';
import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {
      console.log('check');
    },
  };

  state = {
    label: '',
    min: '',
    sec: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onMinChange = (e) => {
    let value = e.target.value;
    if (value === '') {
      this.setState({ min: '' });
      return;
    }
    value = parseInt(value, 10);
    if (isNaN(value) || value < 0) {
      alert('Minutes must be a positive number');
      return;
    }
    if (value > 60) {
      alert('Minutes cannot be more than 60');
      return;
    }
    this.setState({ min: value });
  };

  onSecChange = (e) => {
    let value = e.target.value;
    if (value === '') {
      this.setState({ sec: '' });
      return;
    }
    value = parseInt(value, 10);
    if (isNaN(value) || value < 0) {
      alert('Seconds must be a positive number');
      return;
    }
    if (value > 60) {
      alert('Seconds cannot be more than 60');
      return;
    }
    this.setState({ sec: value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.label.trim()) {
      alert('Please enter a task!');
      return;
    }
    this.props.onItemAdded(this.state.label, this.state.min, this.state.sec);
    this.setState({ label: '', min: '', sec: '' });
  };

  onKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);
    }
  };

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          name="search-task"
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={this.state.label}
          onChange={this.onLabelChange}
          onKeyDown={this.onKeyDown}
        />
        <input
          name="search-min"
          className="new-todo-form__timer"
          placeholder="Min"
          type="text"
          value={this.state.min}
          onChange={this.onMinChange}
          min={0}
          max={60}
          onKeyDown={this.onKeyDown}
        />
        <input
          name="search-sec"
          className="new-todo-form__timer"
          placeholder="Sec"
          type="text"
          value={this.state.sec}
          onChange={this.onSecChange}
          min={0}
          max={60}
          onKeyDown={this.onKeyDown}
        />
      </form>
    );
  }
}
